package com.wts.controller;

import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.tx.Tx;
import com.wts.entity.model.*;
import com.wts.entity.model.Department;
import com.wts.entity.model.File;
import com.wts.entity.model.Flow;
import com.wts.entity.model.Person;
import com.wts.entity.model.User;
import com.wts.interceptor.LoginInterceptor;
import com.wts.util.Util;
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
   * direct
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
   * reason
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
   * PageNumber
   * PageSize
   * PersonName
   * PersonNumber
   * FileNumber
   * FileDept
   * FlowFlow
   */
  @Before({Tx.class,LoginInterceptor.class})
  public void query() {
    String sql;
    if (getPara("FileDept").equals("")) {
      sql="SELECT flow.id AS lid,flow.time AS ltime,flow.remark AS lremark,flow.type AS ltype,flow.direct AS ldirect,flow.reason AS lreason,flow.flow AS lflow,user.id AS uid,user.name AS uname,person.id AS pid,person.name AS pname,person.number AS pnumber,department.name AS dname,file.number AS fnumber FROM (((flow INNER JOIN user ON flow.uid=user.id) INNER JOIN file ON flow.fid=file.id) INNER JOIN person ON flow.pid=person.id) INNER JOIN department ON flow.did=department.id WHERE person.name LIKE '%" + getPara("PersonName") + "%' AND person.number LIKE '%" + getPara("PersonNumber") + "%' AND file.number LIKE '%" + getPara("FileNumber") + "%' AND flow.flow LIKE '%" + getPara("FlowFlow") + "%' ORDER BY flow.id DESC";
    } else {
      sql="SELECT flow.id AS lid,flow.time AS ltime,flow.remark AS lremark,flow.type AS ltype,flow.direct AS ldirect,flow.reason AS lreason,flow.flow AS lflow,user.id AS uid,user.name AS uname,person.id AS pid,person.name AS pname,person.number AS pnumber,department.name AS dname,file.number AS fnumber FROM (((flow INNER JOIN user ON flow.uid=user.id) INNER JOIN file ON flow.fid=file.id) INNER JOIN person ON flow.pid=person.id) INNER JOIN department ON flow.did=department.id WHERE person.name LIKE '%" + getPara("PersonName") + "%' AND person.number LIKE '%" + getPara("PersonNumber") + "%' AND file.number LIKE '%" + getPara("FileNumber") + "%' AND flow.flow LIKE '%" + getPara("FlowFlow") + "%' AND file.did = " + getPara("FileDept") + " ORDER BY flow.id DESC";
    }
    Page<Flow> flows= Flow.dao.paginate2(getParaToInt("PageNumber"),getParaToInt("PageSize"),getPara("PersonName"),getPara("PersonNumber"),getPara("FileNumber"),getPara("FileDept"),getPara("FlowFlow"));
    Look o =new Look();
    o.set("uid",((User) getSessionAttr("user")).get("id").toString())
            .set("time", new Date())
            .set("pageNumber",getParaToInt("PageNumber"))
            .set("pageSize",getParaToInt("PageSize"))
            .set("type","业务搜索")
            .set("sql",sql)
            .save();
    renderJson(flows.getList());
  }
  /**
   * 查询档案数量
   * PersonName
   * PersonNumber
   * FileNumber
   * FileDept
   * FlowFlow
   */
  @Before(LoginInterceptor.class)
  public void count() {
    if (getPara("FileDept").equals("")) {
      String count = Db.queryLong("SELECT COUNT(*) FROM (((flow INNER JOIN user ON flow.uid=user.id) INNER JOIN file ON flow.fid=file.id) INNER JOIN person ON flow.pid=person.id) INNER JOIN department ON flow.did=department.id WHERE person.name LIKE '%" + getPara("PersonName") + "%' AND person.number LIKE '%" + getPara("PersonNumber") + "%' AND file.number LIKE '%" + getPara("FileNumber") + "%' AND flow.flow LIKE '%" + getPara("FlowFlow") + "%'").toString();
      renderText(count);
    } else {
      String count = Db.queryLong("SELECT COUNT(*) FROM (((flow INNER JOIN user ON flow.uid=user.id) INNER JOIN file ON flow.fid=file.id) INNER JOIN person ON flow.pid=person.id) INNER JOIN department ON flow.did=department.id WHERE person.name LIKE '%" + getPara("PersonName") + "%' AND person.number LIKE '%" + getPara("PersonNumber") + "%' AND file.number LIKE '%" + getPara("FileNumber") + "%' AND flow.flow LIKE '%" + getPara("FlowFlow") + "%' AND file.did = " + getPara("FileDept")).toString();
      renderText(count);
    }
  }
  /**
   * 修改档案
   * lid
   * lreason
   * lremark
   * ltype
   * ldirect
   */
  @Before({Tx.class,LoginInterceptor.class})
  public void edit() {
    Flow flow = Flow.dao.findById(getPara("lid"));
    if (((User) getSessionAttr("user")).get("did") != flow.getInt("did")) {
      removeSessionAttr("user");
      redirect("/index");
    } else {
      if (flow == null) {
        renderText("要修改的记录不存在，请刷新页面后再试！");
      } else if (Util.CheckNull(flow.getStr("remark")).equals(getPara("lremark").trim())
                && Util.CheckNull(flow.getStr("reason")).equals(getPara("lreason").trim())
                && Util.CheckNull(flow.getStr("type")).equals(getPara("ltype").trim())
                && Util.CheckNull(flow.getStr("direct")).equals(getPara("ldirect").trim())
                ) {
        renderText("未找到修改内容，请核实后再修改！");
      } else if (getPara("ldirect").trim().length() < 2) {
        renderText("档案流向必须在两个字符以上!");
      } else if (getPara("lreason").trim().length() < 2) {
        renderText("流转原因必须在两个字符以上!");
      } else {
        Change c = new Change();
        c.set("lid", getPara("lid").trim())
                .set("uid", ((User) getSessionAttr("user")).get("id").toString())
                .set("fid", Util.CheckNull(flow.get("fid").toString()).trim())
                .set("did", ((User) getSessionAttr("user")).get("did").toString())
                .set("time", new Date())
                .set("reasonAfter", Util.CheckNull(getPara("lreason")).trim())
                .set("remarkAfter", Util.CheckNull(getPara("lremark")).trim())
                .set("directAfter", Util.CheckNull(getPara("ldirect")).trim())
                .set("typeAfter", Util.CheckNull(getPara("ltype")).trim())
                .set("reasonBefore", Util.CheckNull(flow.getStr("reason")).trim())
                .set("remarkBefore", Util.CheckNull(flow.getStr("remark")).trim())
                .set("directBefore", Util.CheckNull(flow.getStr("direct")).trim())
                .set("typeBefore", Util.CheckNull(flow.getStr("type")).trim())
                .save();
        flow.set("reason", Util.CheckNull(getPara("lreason")).trim())
                .set("remark", Util.CheckNull(getPara("lremark").trim()))
                .set("type", Util.CheckNull(getPara("ltype")).trim())
                .set("direct", Util.CheckNull(getPara("ldirect")).trim())
                .update();
        renderText("OK");
      }
    }
  }

  /**
   * 检查导出
   * PersonName
   * PersonNumber
   * FileDept
   * FileNumber
   * FlowFlow
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
    if (flows.size()>100000) {
      setSessionAttr("PersonName1", "");
      setSessionAttr("PersonNumber1", "");
      setSessionAttr("FileNumber1", "");
      setSessionAttr("FileDept1", "");
      setSessionAttr("FlowFlow", "");
      renderText("导出数据数量超过10万，请从后台操作！");
    }else{
      renderText("OK");
    }
  }

  /**
   * 导出
   */
  @Before({Tx.class,LoginInterceptor.class})
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
    if (!((User) getSessionAttr("user")).get("login").toString().equals(Util.ADMIN)) {
      Export e = new Export();
      e.set("uid", ((User) getSessionAttr("user")).get("id").toString())
              .set("time", new Date())
              .set("type", "业务导出")
              .set("sql", sql)
              .save();
    }
    l=Flow.dao.find(sql);

    for (int i = 0; i < l.size(); i++) {
      XSSFRow nextRow = sheet.createRow(i+1);
      XSSFCell cell2 = nextRow.createCell(0);
      if (l.get(i).get("fnumber") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(l.get(i).get("fnumber").toString());
      }
      cell2 = nextRow.createCell(1);
      if (l.get(i).get("pname") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(l.get(i).get("pname").toString());
      }
      cell2 = nextRow.createCell(2);
      if (l.get(i).get("pnumber") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(l.get(i).get("pnumber").toString());
      }
      cell2 = nextRow.createCell(3);
      if (l.get(i).get("dname") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(l.get(i).get("dname").toString());
      }
      cell2 = nextRow.createCell(4);
      if (l.get(i).get("lflow") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(l.get(i).get("lflow").toString());
      }
      cell2 = nextRow.createCell(5);
      if (l.get(i).get("ltype") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(l.get(i).get("ltype").toString());
      }
      cell2 = nextRow.createCell(6);
      if (l.get(i).get("lremark") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(l.get(i).get("lremark").toString());
      }
      cell2 = nextRow.createCell(7);
      if (l.get(i).get("ldirect") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(l.get(i).get("ldirect").toString());
      }
      cell2 = nextRow.createCell(8);
      if (l.get(i).get("lreason") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(l.get(i).get("lreason").toString());
      }
      cell2 = nextRow.createCell(9);
      if (l.get(i).get("ltime") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(l.get(i).get("ltime").toString());
      }
      cell2 = nextRow.createCell(10);
      if (l.get(i).get("uname") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(l.get(i).get("uname").toString());
      }
    }
    HttpServletResponse response = getResponse();
    response.setContentType("application/octet-stream");
    response.setHeader("Content-Disposition", "attachment;filename=FlowExport.xlsx");
    OutputStream out = response.getOutputStream();
    workbook.write(out);
    out.flush();
    out.close();
    workbook.close();
    renderNull() ;
  }
  /**
   * 打印
   * lid
   */
  @Before({Tx.class,LoginInterceptor.class})
  public void printOut() {

    Flow l = Flow.dao.findById(getPara("lid"));
    if (l==null){
      removeSessionAttr("user");
      redirect("/index");
    }else{
      User u = User.dao.findById(l.getInt("uid"));
      File f = File.dao.findById(l.getInt("fid"));
      if (((User) getSessionAttr("user")).get("did") != f.getInt("did")) {
        removeSessionAttr("user");
        redirect("/index");
      } else {
        Print r = new Print();
        r.set("lid", getPara("lid"))
                .set("uid", ((User) getSessionAttr("user")).get("id").toString())
                .set("time", new Date())
                .save();
        Department d = Department.dao.findById(l.getInt("did"));
        Person p = Person.dao.findById(l.getInt("pid"));
        setAttr("fnumber", Util.CheckNull(f.getStr("number")));
        setAttr("uname", Util.CheckNull(u.getStr("name")));
        setAttr("pname", Util.CheckNull(p.getStr("name")));
        setAttr("dname", Util.CheckNull(d.getStr("name")));
        setAttr("dphone", Util.CheckNull(d.getStr("phone")));
        setAttr("dcode", Util.CheckNull(d.getStr("code")));
        setAttr("ldirect", Util.CheckNull(l.getStr("direct")));
        setAttr("daddress", Util.CheckNull(d.getStr("address")));
        SimpleDateFormat yyyy = new SimpleDateFormat("yyyy");
        SimpleDateFormat MM = new SimpleDateFormat("MM");
        SimpleDateFormat dd = new SimpleDateFormat("dd");
        setAttr("yyyy", yyyy.format(l.get("time")));
        setAttr("mm", MM.format(l.get("time")));
        setAttr("dd", dd.format(l.get("time")));
        render("/dist/printOut.html");
      }
    }
  }
  /**
   * 打印
   * lid
   */
  @Before({Tx.class,LoginInterceptor.class})
  public void printIn() {
    Flow l = Flow.dao.findById(getPara("lid"));
    if (l == null) {
      removeSessionAttr("user");
      redirect("/index");
    } else {
      User u = User.dao.findById(l.getInt("uid"));
      File f = File.dao.findById(l.getInt("fid"));
      if (((User) getSessionAttr("user")).get("did") != f.getInt("did")) {
        removeSessionAttr("user");
        redirect("/index");
      } else {
        Print r = new Print();
        r.set("lid", getPara("lid"))
                .set("uid", ((User) getSessionAttr("user")).get("id").toString())
                .set("time", new Date())
                .save();
        Department d = Department.dao.findById(l.getInt("did"));
        Person p = Person.dao.findById(l.getInt("pid"));
        SimpleDateFormat yyyy = new SimpleDateFormat("yyyy");
        SimpleDateFormat MM = new SimpleDateFormat("MM");
        SimpleDateFormat dd = new SimpleDateFormat("dd");
        setAttr("fnumber", Util.CheckNull(f.getStr("number")));
        setAttr("uname", Util.CheckNull(u.getStr("name")));
        setAttr("pname", Util.CheckNull(p.getStr("name")));
        setAttr("dname", Util.CheckNull(d.getStr("name")));
        setAttr("pnumber", Util.CheckNull(p.getStr("number")));
        setAttr("pphone1", Util.CheckNull(p.getStr("phone1")));
        setAttr("pphone2", Util.CheckNull(p.getStr("phone2")));
        setAttr("paddress", Util.CheckNull(p.getStr("address")));
        setAttr("pretire", Util.CheckNull(p.getStr("retire")));
        setAttr("pinfo", Util.CheckNull(p.getStr("info")));
        setAttr("pbirth", yyyy.format(p.get("birth")) + MM.format(p.get("birth")) + dd.format(p.get("birth")));
        setAttr("psex", Util.CheckNull(p.getStr("sex")));
        setAttr("fileAge", yyyy.format(p.get("fileAge")) + MM.format(p.get("fileAge")) + dd.format(p.get("fileAge")));
        setAttr("premark", Util.CheckNull(p.getStr("remark")));
        setAttr("fremark", Util.CheckNull(f.getStr("remark")));
        setAttr("yyyy", yyyy.format(l.get("time")));
        setAttr("mm", MM.format(l.get("time")));
        setAttr("dd", dd.format(l.get("time")));
        render("/dist/printIn.html");
      }
    }
  }
  /**
   * 打印
   * lid
   */
  @Before({Tx.class,LoginInterceptor.class})
  public void printBorrow() {
    Flow l = Flow.dao.findById(getPara("lid"));
    if (l == null) {
      removeSessionAttr("user");
      redirect("/index");
    } else {
      User u = User.dao.findById(l.getInt("uid"));
      File f = File.dao.findById(l.getInt("fid"));
      if (((User) getSessionAttr("user")).get("did") != f.getInt("did")) {
        removeSessionAttr("user");
        redirect("/index");
      } else {
        Print r = new Print();
        r.set("lid", getPara("lid"))
                .set("uid", ((User) getSessionAttr("user")).get("id").toString())
                .set("time", new Date())
                .save();
        Department d = Department.dao.findById(l.getInt("did"));
        Person p = Person.dao.findById(l.getInt("pid"));
        SimpleDateFormat yyyy = new SimpleDateFormat("yyyy");
        SimpleDateFormat MM = new SimpleDateFormat("MM");
        SimpleDateFormat dd = new SimpleDateFormat("dd");
        setAttr("fnumber", Util.CheckNull(f.getStr("number")));
        setAttr("uname", Util.CheckNull(u.getStr("name")));
        setAttr("pname", Util.CheckNull(p.getStr("name")));
        setAttr("dname", Util.CheckNull(d.getStr("name")));
        setAttr("pnumber", Util.CheckNull(p.getStr("number")));
        setAttr("pphone1", Util.CheckNull(p.getStr("phone1")));
        setAttr("pphone2", Util.CheckNull(p.getStr("phone2")));
        setAttr("paddress", Util.CheckNull(p.getStr("address")));
        setAttr("lreason", Util.CheckNull(l.getStr("reason")));
        setAttr("ldirect", Util.CheckNull(l.getStr("direct")));
        setAttr("pbirth", yyyy.format(p.get("birth")) + MM.format(p.get("birth")) + dd.format(p.get("birth")));
        setAttr("psex", Util.CheckNull(p.getStr("sex")));
        setAttr("fileAge", yyyy.format(p.get("fileAge")) + MM.format(p.get("fileAge")) + dd.format(p.get("fileAge")));
        setAttr("lremark", Util.CheckNull(l.getStr("remark")));
        setAttr("fremark", Util.CheckNull(f.getStr("remark")));
        setAttr("yyyy", yyyy.format(l.get("time")));
        setAttr("mm", MM.format(l.get("time")));
        setAttr("dd", dd.format(l.get("time")));
        render("/dist/printBorrow.html");
      }
    }
  }
  /**
   * 打印
   * lid
   */
  @Before({Tx.class,LoginInterceptor.class})
  public void printReturn() {
    Flow l = Flow.dao.findById(getPara("lid"));
    if (l == null) {
      removeSessionAttr("user");
      redirect("/index");
    } else {
      User u = User.dao.findById(l.getInt("uid"));
      File f = File.dao.findById(l.getInt("fid"));
      if (((User) getSessionAttr("user")).get("did") != f.getInt("did")) {
        removeSessionAttr("user");
        redirect("/index");
      } else {
        Print r = new Print();
        r.set("lid", getPara("lid"))
                .set("uid", ((User) getSessionAttr("user")).get("id").toString())
                .set("time", new Date())
                .save();
        Department d = Department.dao.findById(l.getInt("did"));
        Person p = Person.dao.findById(l.getInt("pid"));
        SimpleDateFormat yyyy = new SimpleDateFormat("yyyy");
        SimpleDateFormat MM = new SimpleDateFormat("MM");
        SimpleDateFormat dd = new SimpleDateFormat("dd");
        setAttr("fnumber", Util.CheckNull(f.getStr("number")));
        setAttr("uname", Util.CheckNull(u.getStr("name")));
        setAttr("pname", Util.CheckNull(p.getStr("name")));
        setAttr("dname", Util.CheckNull(d.getStr("name")));
        setAttr("pnumber", Util.CheckNull(p.getStr("number")));
        setAttr("pphone1", Util.CheckNull(p.getStr("phone1")));
        setAttr("pphone2", Util.CheckNull(p.getStr("phone2")));
        setAttr("paddress", Util.CheckNull(p.getStr("address")));
        setAttr("lreason", Util.CheckNull(l.getStr("reason")));
        setAttr("ldirect", Util.CheckNull(l.getStr("ldirect")));
        setAttr("pbirth", yyyy.format(p.get("birth")) + MM.format(p.get("birth")) + dd.format(p.get("birth")));
        setAttr("psex", Util.CheckNull(p.getStr("sex")));
        setAttr("fileAge", yyyy.format(p.get("fileAge")) + MM.format(p.get("fileAge")) + dd.format(p.get("fileAge")));
        setAttr("lremark", Util.CheckNull(l.getStr("remark")));
        setAttr("fremark", Util.CheckNull(f.getStr("remark")));
        setAttr("yyyy", yyyy.format(l.get("time")));
        setAttr("mm", MM.format(l.get("time")));
        setAttr("dd", dd.format(l.get("time")));
        render("/dist/printReturn.html");
      }
    }
  }

}


