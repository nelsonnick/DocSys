package com.wts.controller;

import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.tx.Tx;
import com.wts.entity.model.*;
import com.wts.interceptor.LoginInterceptor;
import com.wts.util.IDNumber;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class FlowController extends Controller {
  /**
   * 检测来源
   *@param: direct
   */
  @Before(LoginInterceptor.class)
  public void direct() {
    if (getPara("direct").trim().length()<2) {
      renderText("档案来源必须在两个字符以上!");
    } else {
      renderText("OK");
    }
  }
  /**
   * 检测原因
   *@param: reason
   */
  @Before(LoginInterceptor.class)
  public void reason() {
    if (getPara("reason").trim().length()<2) {
      renderText("流转原因必须在两个字符以上!");
    } else {
      renderText("OK");
    }
  }

  /**
   * 查询流动
   *@param: PageNumber
   *@param: PageSize
   *@param: PersonName
   *@param: PersonNumber
   *@param: FileNumber
   *@param: FileDept
   *@param: FlowFlow
   */
  @Before(LoginInterceptor.class)
  public void query() {
    Page<Flow> flows= Flow.dao.paginate2(getParaToInt("PageNumber"),getParaToInt("PageSize"),getPara("PersonName"),getPara("PersonNumber"),getPara("FileNumber"),getPara("FileDept"),getPara("FlowFlow"));
    renderJson(flows.getList());
  }
  /**
   * 查询档案数量
   *@param: PersonName
   *@param: PersonNumber
   *@param: FileNumber
   *@param: FileDept
   *@param: FlowFlow
   */
  @Before(LoginInterceptor.class)
  public void count() {
    if (getPara("FileDept").equals("")) {
      String count = Db.queryLong("SELECT COUNT(*) FROM (((flow INNER JOIN user ON flow.uid=user.id) INNER JOIN file ON flow.fid=file.id) INNER JOIN person ON flow.pid=person.id) INNER JOIN department ON flow.did=department.id WHERE person.name LIKE '%" + getPara("PersonName") + "%' AND person.number LIKE '%" + getPara("PersonNumber") + "%' AND file.number LIKE '%" + getPara("FileNumber") + "%' AND flow.flow LIKE '%" + getPara("FlowFlow") + "%'").toString();
      System.out.println(count);
      renderText(count);
    } else {
      String count = Db.queryLong("SELECT COUNT(*) FROM (((flow INNER JOIN user ON flow.uid=user.id) INNER JOIN file ON flow.fid=file.id) INNER JOIN person ON flow.pid=person.id) INNER JOIN department ON flow.did=department.id WHERE person.name LIKE '%" + getPara("PersonName") + "%' AND person.number LIKE '%" + getPara("PersonNumber") + "%' AND file.number LIKE '%" + getPara("FileNumber") + "%' AND flow.flow LIKE '%" + getPara("FlowFlow") + "%' AND file.did = " + getPara("FileDept")).toString();
      System.out.println(count);
      renderText(count);
    }
  }
  /**
   * 修改档案
   *@param: lid
   *@param: lreason
   *@param: lremark
   *@param: ltype
   *@param: ldirect

   */
  @Before({Tx.class,LoginInterceptor.class})
  public void edit() {
    Flow flow = Flow.dao.findById(getPara("lid"));
    if (flow == null){
      renderText("要修改的记录不存在，请刷新页面后再试！");
    }else{
      if (flow.get("remark").equals(getPara("lremark").trim())
              && flow.get("reason").equals(getPara("lreason").trim())
              && flow.get("type").equals(getPara("ltype").trim())
              && flow.get("direct").equals(getPara("ldirect").trim())
              ){
        renderText("未找到修改内容，请核实后再修改！");
      } else if (getPara("ldirect").trim().length()<2) {
        renderText("档案流向必须在两个字符以上!");
      } else if (getPara("reason").trim().length()<2) {
        renderText("流转原因必须在两个字符以上!");
      } else {
        Change c = new Change();
        c.set("lid",getPara("lid").trim())
                .set("uid", ((User) getSessionAttr("user")).get("id").toString())
                .set("fid",flow.get("fid").toString().trim())
                .set("did", ((User) getSessionAttr("user")).get("did").toString())
                .set("time", new Date())
                .set("reasonAfter",getPara("lreason").trim())
                .set("remarkAfter",getPara("lremark").trim())
                .set("typeAfter",getPara("ltype").trim())
                .set("directAfter",getPara("ldirect").trim())
                .set("reasonBefore",flow.get("reason").toString().trim())
                .set("remarkBefore",flow.get("remark").toString().trim())
                .set("typeBefore",flow.get("type").toString().trim())
                .set("directBefore",flow.get("direct").toString().trim())
                .save();
        flow.set("reason",getPara("lreason").trim())
                .set("remark",getPara("lremark").trim())
                .set("type",getPara("ltype").trim())
                .set("direct",getPara("ldirect").trim())
                .update();
        renderText("OK");
      }
    }
  }

  /**
   * 检查导出
   *@param: PersonName
   *@param: PersonNumber
   *@param: FileDept
   *@param: FileNumber
   *@param: FlowFlow
   */
  @Before(LoginInterceptor.class)
  public void download() {
    List<Flow> flows;
    String personName,personNumber,fileNumber,flowFlow,fileDept;
    if (getPara("PersonName").equals("") || getPara("PersonName")==null) {
      personName = "";
      setSessionAttr("PersonName1", "");
    }else{
      personName = " person.name like '%"+getPara("PersonName")+"%'";
      setSessionAttr("personName1", getPara("personName"));
    }
    if (getPara("PersonNumber").equals("") || getPara("PersonNumber")==null) {
      personNumber = "";
      setSessionAttr("PersonNumber1", "");
    }else{
      personNumber = " person.number like '%"+getPara("PersonNumber")+"%'";
      setSessionAttr("PersonNumber1", getPara("PersonNumber"));
    }
    if (getPara("FileNumber").equals("") || getPara("FileNumber")==null) {
      fileNumber = "";
      setSessionAttr("FileNumber1", "");
    }else{
      fileNumber = " file.number like '%"+getPara("FileNumber")+"%'";
      setSessionAttr("FileNumber1", getPara("FileNumber"));
    }
    if (getPara("FlowFlow").equals("") || getPara("FlowFlow")==null) {
      flowFlow = "";
      setSessionAttr("FlowFlow", "");
    }else{
      flowFlow = " flow.flow like '%"+getPara("FlowFlow")+"%'";
      setSessionAttr("FlowFlow", getPara("FlowFlow"));
    }
    if (getPara("FileDept").equals("") || getPara("FileDept")==null) {
      fileDept = "";
      setSessionAttr("FileDept1", "");
    }else{
      fileDept = " department.id = "+getPara("FileDept");
      setSessionAttr("FileDept1", getPara("FileDept"));
    }

    String sql="SELECT flow.id AS lid,flow.time AS ltime,flow.remark AS lremark,flow.type AS ltype,flow.direct AS ldirect,flow.reason AS lreason,flow.flow AS lflow,user.id AS uid,user.name AS uname,person.id AS pid,person.name AS pname,person.number AS pnumber,department.name AS dname,file.number AS fnumber,department.id AS did FROM (((flow INNER JOIN user ON flow.uid=user.id) INNER JOIN file ON flow.fid=file.id) INNER JOIN person ON flow.pid=person.id) INNER JOIN department ON flow.did=department.id ";

    if (!(personName.equals("") && personNumber.equals("") && fileNumber.equals("") && flowFlow.equals("") && fileDept.equals(""))){
      sql=sql+" where ";
    }

    if (!personName.equals("")){
      if (sql.substring(sql.length()-6,sql.length()).equals("where ")){
        sql=sql+personName;
      }else{
        sql=sql+"and "+ personName;
      }
    }
    if (!personNumber.equals("")){
      if (sql.substring(sql.length()-6,sql.length()).equals("where ")){
        sql=sql+personNumber;
      }else{
        sql=sql+"and "+ personNumber;
      }
    }
    if (!fileNumber.equals("")){
      if (sql.substring(sql.length()-6,sql.length()).equals("where ")){
        sql=sql+fileNumber;
      }else{
        sql=sql+"and "+ fileNumber;
      }
    }
    if (!flowFlow.equals("")){
      if (sql.substring(sql.length()-6,sql.length()).equals("where ")){
        sql=sql+flowFlow;
      }else{
        sql=sql+"and "+ flowFlow;
      }
    }
    if (!fileDept.equals("")){
      if (sql.substring(sql.length()-6,sql.length()).equals("where ")){
        sql=sql+fileDept;
      }else{
        sql=sql+"and "+ fileDept;
      }
    }
    flows=Flow.dao.find(sql);
    if (flows.size()>100) {
      setSessionAttr("PersonName1", "");
      setSessionAttr("PersonNumber1", "");
      setSessionAttr("FileNumber1", "");
      setSessionAttr("FileDept1", "");
      setSessionAttr("FlowFlow", "");
      renderText("导出数据数量超过上限！");
    }else{
      renderText("OK");
    }
  }

  /**
   * 导出
   */
  @Before(LoginInterceptor.class)
  public void export() throws IOException {
    String[] title={"档案编号","姓名","证件号码","档案位置","流动类型","转递方式","转移备注","档案流向","流转原因","办理时间","经办人员"};
    //创建Excel工作簿
    XSSFWorkbook workbook = new XSSFWorkbook();
    //创建一个工作表
    XSSFSheet sheet = workbook.createSheet();
    //创建第一行
    XSSFRow row =sheet.createRow(0);
    XSSFCell cell=null;
    //插入表头数据
    for(int i=0;i<title.length;i++){
      cell=row.createCell(i);
      cell.setCellValue(title[i]);
    }
    List<Flow> l;
    String sql="SELECT flow.id AS lid,flow.time AS ltime,flow.remark AS lremark,flow.type AS ltype,flow.direct AS ldirect,flow.reason AS lreason,flow.flow AS lflow,user.id AS uid,user.name AS uname,person.id AS pid,person.name AS pname,person.number AS pnumber,department.name AS dname,file.number AS fnumber,department.id AS did FROM (((flow INNER JOIN user ON flow.uid=user.id) INNER JOIN file ON flow.fid=file.id) INNER JOIN person ON flow.pid=person.id) INNER JOIN department ON flow.did=department.id ";

    if (!(getSessionAttr("PersonName1").equals("") && getSessionAttr("PersonNumber1").equals("") && getSessionAttr("FileNumber1").equals("") && getSessionAttr("FlowFlow").equals("") && getSessionAttr("FileDept1").equals(""))){
      sql=sql+" where ";
    }

    if (!getSessionAttr("PersonName1").equals("")){
      if (sql.substring(sql.length()-6,sql.length()).equals("where ")){
        sql=sql+getSessionAttr("PersonName1");
      }else{
        sql=sql+"and "+ getSessionAttr("PersonName1");
      }
    }
    if (!getSessionAttr("PersonNumber1").equals("")){
      if (sql.substring(sql.length()-6,sql.length()).equals("where ")){
        sql=sql+getSessionAttr("PersonNumber1");
      }else{
        sql=sql+"and "+ getSessionAttr("PersonNumber1");
      }
    }
    if (!getSessionAttr("FileNumber1").equals("")){
      if (sql.substring(sql.length()-6,sql.length()).equals("where ")){
        sql=sql+getSessionAttr("FileNumber1");
      }else{
        sql=sql+"and "+ getSessionAttr("FileNumber1");
      }
    }
    if (!getSessionAttr("FlowFlow").equals("")){
      if (sql.substring(sql.length()-6,sql.length()).equals("where ")){
        sql=sql+getSessionAttr("FlowFlow");
      }else{
        sql=sql+"and "+ getSessionAttr("FlowFlow");
      }
    }
    if (!getSessionAttr("FileDept1").equals("")){
      if (sql.substring(sql.length()-6,sql.length()).equals("where ")){
        sql=sql+getSessionAttr("FileDept1");
      }else{
        sql=sql+"and "+ getSessionAttr("FileDept1");
      }
    }
    l=Flow.dao.find(sql);

    for (int i = 0; i < l.size(); i++) {
      XSSFRow nextRow = sheet.createRow(i+1);
      XSSFCell cell2 = nextRow.createCell(0);
      cell2.setCellValue(l.get(i).get("fnumber").toString());
      cell2 = nextRow.createCell(1);
      cell2.setCellValue(l.get(i).get("pname").toString());
      cell2 = nextRow.createCell(2);
      cell2.setCellValue(l.get(i).get("pnumber").toString());
      cell2 = nextRow.createCell(3);
      cell2.setCellValue(l.get(i).get("dname").toString());
      cell2 = nextRow.createCell(4);
      cell2.setCellValue(l.get(i).get("lflow").toString());
      cell2 = nextRow.createCell(5);
      cell2.setCellValue(l.get(i).get("ltype").toString());
      cell2 = nextRow.createCell(6);
      cell2.setCellValue(l.get(i).get("lremark").toString());
      cell2 = nextRow.createCell(7);
      cell2.setCellValue(l.get(i).get("ldirect").toString());
      cell2 = nextRow.createCell(8);
      cell2.setCellValue(l.get(i).get("lreason").toString());
      cell2 = nextRow.createCell(9);
      cell2.setCellValue(l.get(i).get("ltime").toString());
      cell2 = nextRow.createCell(10);
      cell2.setCellValue(l.get(i).get("uname").toString());
    }
    HttpServletResponse response = getResponse();
    response.setContentType("application/octet-stream");
    response.setHeader("Content-Disposition", "attachment;filename=export.xlsx");
    OutputStream out = response.getOutputStream();
    workbook.write(out);
    out.flush();
    out.close();
    workbook.close();
    renderNull() ;
  }


}


