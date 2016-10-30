package com.wts.controller;

import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.tx.Tx;
import com.wts.entity.model.*;
import com.wts.interceptor.LoginInterceptor;
import com.wts.util.IDNumber;
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

public class FileController extends Controller {
  /**
   * 核查档案编号
   *@param: number
   */
  @Before(LoginInterceptor.class)
  public void number() {
    List<File> files = File.dao.find(
            "select * from file where number=?", getPara("number"));
    if (files.size() != 0) {
      renderText("该档案编号已存在，请更换!");
    } else {
      renderText("OK");
    }
  }
  /**
   * 核查档案编号
   *@param: number
   */
  @Before(LoginInterceptor.class)
  public void numbers() {
    List<File> files = File.dao.find(
            "select * from file where number=?", getPara("number"));
    if (files.size() >1) {
      renderText("该档案编号已存在，请更换!");
    } else {
      renderText("OK");
    }
  }
  /**
   * 最新档案编号
   */
  @Before(LoginInterceptor.class)
  public void newNumber() {
    SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
    Date date=new Date();
    String nn = Department.dao.findById(((User) getSessionAttr("user")).get("did").toString().trim()).getStr("number")+df.format(date);
    List<File> files = File.dao.find(
            "select * from file where number like '%"+nn+"%'");
    renderText(nn+ Util.getNumber(String.valueOf(files.size()+1)));
  }
  /**
   * 查询档案
   *@param: PageNumber
   *@param: PageSize
   *@param: PersonName
   *@param: PersonNumber
   *@param: FileNumber
   *@param: FileDept
   */
  @Before(LoginInterceptor.class)
  public void query() {
    Page<File> files=File.dao.paginate2(getParaToInt("PageNumber"),getParaToInt("PageSize"),getPara("PersonName"),getPara("PersonNumber"),getPara("FileNumber"),getPara("FileDept"),getPara("FileState"));
    renderJson(files.getList());
  }
  /**
   * 查询档案数量
   *@param: PersonName
   *@param: PersonNumber
   *@param: FileNumber
   *@param: FileDept
   */
  @Before(LoginInterceptor.class)
  public void count() {
    if (getPara("FileDept").equals("")) {
      String count = Db.queryLong("select count(*) from file inner join person on person.id = file.pid where person.name like '%" + getPara("PersonName") + "%' and  person.number like '%" + getPara("PersonNumber") + "%' and file.number like '%" + getPara("FileNumber") + "%' and file.state like '%" + getPara("FileState") + "%'").toString();
      renderText(count);
    } else {
      String count = Db.queryLong("select count(*) from file inner join person on person.id = file.pid where person.name like '%" + getPara("PersonName") + "%' and  person.number like '%" + getPara("PersonNumber") + "%' and file.number like '%" + getPara("FileNumber") + "%' and file.state like '%" + getPara("FileState") + "%' and file.did = " + getPara("FileDept")).toString();
      renderText(count);
    }
  }
  /**
   * 新增档案
   *@param: pname
   *@param: pnumber
   *@param: pphone1
   *@param: pphone2
   *@param: paddress
   *@param: pinfo
   *@param: pretire
   *@param: premark
   *@param: fnumber
   *@param: fremark
   *@param: lremark
   *@param: lreason
   *@param: fileAge
   *@param: ltype
   *@param: ldirect
   */
  @Before({Tx.class,LoginInterceptor.class})
  public void add() {
    String a = "^(?:(?!0000)[0-9]{4}(?:(?:0[1-9]|1[0-2])(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$";
    List<File> files = File.dao.find(
            "select * from file where number=?", getPara("fnumber"));
    List<Person> persons = Person.dao.find(
            "select * from person where number=?", getPara("pnumber"));
    if (files.size() != 0) {
      renderText("该档案编号数据库中已存在，请核实!");
    } else if (persons.size() != 0) {
      renderText("该证件号码数据库中已存在，请核实!");
    } else if (!getPara("pname").matches("[\u4e00-\u9fa5]+")) {
      renderText("人员姓名必须为汉字!");
    } else if (getPara("pname").length()<2) {
      renderText("人员姓名称必须为两个以上汉字!");
    } else if (!getPara("pphone1").matches("\\d{11}")) {
      renderText("联系电话1必须为11位数字!");
    } else if ((!getPara("pphone2").trim().equals("")) && (!getPara("pphone2").matches("\\d{11}"))){
      renderText("联系电话2必须为11位数字或不填写!");
    } else if (!IDNumber.availableIDNumber(getPara("pnumber"))){
      renderText("证件号码错误，请核实！");
    } else if (getPara("paddress").length()<2) {
      renderText("联系地址应该在两个字符以上！");
    }else if (!getPara("fileAge").matches(a)) {
      renderText("档案年龄日期有误!");
    } else if (getPara("lreason").trim().length()==0) {
      renderText("存档原因必须填写!");
    } else if (getPara("ldirect").trim().length()==0) {
      renderText("档案来源必须填写!");
    } else{
      Person p = new Person();
      p.set("name", getPara("pname").trim())
              .set("number", getPara("pnumber").trim())
              .set("phone1", getPara("pphone1").trim())
              .set("phone2", getPara("pphone2").trim())
              .set("address", getPara("paddress").trim())
              .set("remark", getPara("premark").trim())
              .set("info", getPara("pinfo").trim())
              .set("retire", getPara("pretire").trim())
              .set("fileAge", IDNumber.getFileDate(getPara("fileAge").trim()))
              .set("state", "在档")
              .set("sex", IDNumber.get(getPara("pnumber").trim()))
              .set("birth", IDNumber.getBirthDate(getPara("pnumber").trim()))
              .save();
      File f = new File();
      f.set("number", getPara("fnumber").trim())
              .set("state", "在档")
              .set("remark", getPara("fremark").trim())
              .set("did", ((User) getSessionAttr("user")).get("did").toString())
              .set("pid",p.get("id").toString())
              .save();
      Flow l = new Flow();
      l.set("remark", getPara("lremark").trim())
              .set("type", getPara("ltype").trim())
              .set("direct", getPara("ldirect").trim())
              .set("reason", getPara("lreason").trim())
              .set("did", ((User) getSessionAttr("user")).get("did").toString())
              .set("uid", ((User) getSessionAttr("user")).get("id").toString())
              .set("pid",getPara("pid"))
              .set("time", new Date())
              .set("fid",f.get("id").toString())
              .set("flow","转入")
              .save();
      renderText("OK");
    }
  }

  /**
   * 修改档案
   *@param: fid
   *@param: pid
   *@param: pname
   *@param: pnumber
   *@param: pphone1
   *@param: pphone2
   *@param: paddress
   *@param: pinfo
   *@param: pretire
   *@param: premark
   *@param: fremark
   *@param: fileAge

   */
  @Before({Tx.class,LoginInterceptor.class})
  public void edit() {
    String a = "^(?:(?!0000)[0-9]{4}(?:(?:0[1-9]|1[0-2])(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$";
    File file = File.dao.findById(getPara("fid"));
    Person person = Person.dao.findById(getPara("pid"));
    SimpleDateFormat sdf=new SimpleDateFormat("yyyyMMdd");
    String fileAge=sdf.format(person.get("fileAge"));
    if (file == null){
      renderText("要修改的档案不存在，请刷新页面后再试！");
    }else if (person == null){
      renderText("要修改的人员不存在，请刷新页面后再试！");
    }else{
      if (file.get("remark").equals(getPara("fremark").trim())
              && person.get("name").equals(getPara("pname").trim())
              && person.get("number").equals(getPara("pnumber").trim())
              && person.get("phone1").equals(getPara("pphone1").trim())
              && person.get("phone2").equals(getPara("pphone2").trim())
              && person.get("address").equals(getPara("paddress").trim())
              && person.get("info").equals(getPara("pinfo").trim())
              && person.get("remark").equals(getPara("premark").trim())
              && person.get("retire").equals(getPara("pretire").trim())
              && fileAge.equals(getPara("fileAge").trim())
              ){
        renderText("未找到修改内容，请核实后再修改！");
      } else if (!person.get("number").toString().equals(getPara("pnumber"))
              && Person.dao.find("select * from person where number=?", getPara("pnumber")).size() > 0
              ){
        renderText("该证件号码数据库中已存在，请核实！");
      } else if (!getPara("pname").matches("[\u4e00-\u9fa5]+")) {
        renderText("市民姓名必须为汉字!");
      } else if (getPara("pname").length()<2) {
        renderText("市民姓名必须为两个以上汉字，请核实!");
      } else if (!getPara("pphone1").matches("\\d{11}")) {
        renderText("联系电话1必须为11位数字!");
      } else if (!IDNumber.availableIDNumber(getPara("pnumber"))){
        renderText("证件号码错误，请核实！");
      } else if ((!getPara("pphone2").trim().equals("")) && (!getPara("pphone2").matches("\\d{11}"))){
        renderText("联系电话2必须为11位数字或不填写!");
      } else if (getPara("paddress").length()<2) {
        renderText("联系地址应该在两个字符以上！");
      } else if (!getPara("fileAge").matches(a)) {
        renderText("档案年龄日期有误!");
      } else {
        Trans t = new Trans();
        t.set("pid",getPara("pid").trim())
                .set("uid", ((User) getSessionAttr("user")).get("id").toString())
                .set("fid",getPara("fid").trim())
                .set("did", ((User) getSessionAttr("user")).get("did").toString())
                .set("time", new Date())
                .set("nameAfter",getPara("pname").trim())
                .set("numberAfter",getPara("pnumber").trim())
                .set("phone1After",getPara("pphone1").trim())
                .set("phone2After",getPara("pphone2").trim())
                .set("addressAfter",getPara("paddress").trim())
                .set("infoAfter",getPara("pinfo").trim())
                .set("retireAfter",getPara("pretire").trim())
                .set("premarkAfter",getPara("premark").trim())
                .set("fremarkAfter",getPara("fremark").trim())
                .set("fileAgeAfter", IDNumber.getFileDate(getPara("fileAge").trim()))
                .set("nameBefore",person.get("name").toString().trim())
                .set("numberBefore",person.get("number").toString().trim())
                .set("phone1Before",person.get("phone1").toString().trim())
                .set("phone2Before",person.get("phone2").toString().trim())
                .set("addressBefore",person.get("address").toString().trim())
                .set("infoBefore",person.get("info").toString().trim())
                .set("retireBefore",person.get("retire").toString().trim())
                .set("premarkBefore",person.get("remark").toString().trim())
                .set("fremarkBefore",file.get("remark").toString().trim())
                .set("fileAgeBefore",person.get("fileAge"))
                .save();
        person.set("name",getPara("pname").trim())
                .set("number",getPara("pnumber").trim())
                .set("phone1",getPara("pphone1").trim())
                .set("phone2",getPara("pphone2").trim())
                .set("address",getPara("paddress").trim())
                .set("info",getPara("pinfo").trim())
                .set("retire",getPara("pretire").trim())
                .set("remark",getPara("premark").trim())
                .set("fileAge", IDNumber.getFileDate(getPara("fileAge").trim()))
                .update();
        file.set("remark",getPara("fremark").trim()).update();
        renderText("OK");
      }
    }
  }

  /**
   * 档案转出
   *@param: fid
   *@param: pid
   *@param: ltype
   *@param: ldirect
   *@param: lreason
   *@param: lremark
   */
  @Before({Tx.class,LoginInterceptor.class})
  public void flow(){
    File file = File.dao.findById(getPara("fid"));
    Person person = Person.dao.findById(getPara("pid"));
    Flow l = new Flow();
    l.set("pid",getPara("pid").trim())
            .set("uid", ((User) getSessionAttr("user")).get("id").toString())
            .set("fid",getPara("fid").trim())
            .set("did", ((User) getSessionAttr("user")).get("did").toString())
            .set("type",getPara("ltype").trim())
            .set("direct",getPara("ldirect").trim())
            .set("reason",getPara("lreason").trim())
            .set("remark",getPara("lremark").trim())
            .set("time", new Date())
            .set("flow", "转出")
            .save();
    file.set("state","已提").update();
    person.set("state","已提").update();
    renderText("OK");
  }

  /**
   * 重存档案
   *@param: fnumber
   *@param: pid
   *@param: fremark
   *@param: lremark
   *@param: lreason
   *@param: ltype
   *@param: ldirect
   */
  @Before({Tx.class,LoginInterceptor.class})
  public void back() {
    List<File> files = File.dao.find(
            "select * from file where number=?", getPara("fnumber"));
    Person person = Person.dao.findById(getPara("pid"));
    if (files.size() != 0) {
      renderText("该档案编号数据库中已存在，请核实!");
    } else if (getPara("lreason").trim().length()==0) {
      renderText("存档原因必须填写!");
    } else if (getPara("ldirect").trim().length()==0) {
      renderText("档案来源必须填写!");
    } else if (!person.get("state").toString().equals("已提")) {
      renderText("该人员有在存档案，请核实!");
    } else {
      person.set("state", "在档").update();
      File f = new File();
      f.set("number", getPara("fnumber").trim())
              .set("state", "在档")
              .set("remark", getPara("fremark").trim())
              .set("did", ((User) getSessionAttr("user")).get("did").toString())
              .set("pid",getPara("pid"))
              .save();
      Flow l = new Flow();
      l.set("remark", getPara("lremark").trim())
              .set("type", getPara("ltype").trim())
              .set("direct", getPara("ldirect").trim())
              .set("reason", getPara("lreason").trim())
              .set("did", ((User) getSessionAttr("user")).get("did").toString())
              .set("uid", ((User) getSessionAttr("user")).get("id").toString())
              .set("time", new Date())
              .set("fid",f.get("id").toString())
              .set("pid",getPara("pid"))
              .set("flow","转入")
              .save();
      renderText("OK");
    }
  }

  /**
   * 检查导出
   *@param: PersonName
   *@param: PersonNumber
   *@param: FileDept
   *@param: FileNumber
   *@param: FileState
   */
  @Before(LoginInterceptor.class)
  public void download() {
    List<File> files;
    String personName,personNumber,fileNumber,fileState,fileDept;
    if (getPara("PersonName").equals("") || getPara("PersonName")==null) {
      personName = "";
      setSessionAttr("PersonName", "");
    }else{
      personName = " person.name like '%"+getPara("PersonName")+"%'";
      setSessionAttr("personName", getPara("personName"));
    }
    if (getPara("PersonNumber").equals("") || getPara("PersonNumber")==null) {
      personNumber = "";
      setSessionAttr("PersonNumber", "");
    }else{
      personNumber = " person.number like '%"+getPara("PersonNumber")+"%'";
      setSessionAttr("PersonNumber", getPara("PersonNumber"));
    }
    if (getPara("FileNumber").equals("") || getPara("FileNumber")==null) {
      fileNumber = "";
      setSessionAttr("FileNumber", "");
    }else{
      fileNumber = " file.number like '%"+getPara("FileNumber")+"%'";
      setSessionAttr("FileNumber", getPara("FileNumber"));
    }
    if (getPara("FileState").equals("") || getPara("FileState")==null) {
      fileState = "";
      setSessionAttr("FileState", "");
    }else{
      fileState = " file.state like '%"+getPara("FileState")+"%'";
      setSessionAttr("FileState", getPara("FileState"));
    }
    if (getPara("FileDept").equals("") || getPara("FileDept")==null) {
      fileDept = "";
      setSessionAttr("FileDept", "");
    }else{
      fileDept = " file.did = "+getPara("FileDept");
      setSessionAttr("FileDept", getPara("FileDept"));
    }

    String sql="SELECT file.id AS fid, file.did AS did, file.number AS fnumber, file.state AS fstate, file.remark AS fremark, person.id AS pid, person.name AS pname, person.number AS pnumber, person.phone1 AS pphone1, person.phone2 AS pphone2, person.address AS paddress, person.sex AS psex, person.birth AS pbirth, person.remark AS premark, person.fileAge AS fileAge, person.state AS pstate, person.info AS pinfo, person.retire AS pretire, department.name AS dname FROM (file INNER JOIN person ON file.pid=person.id) INNER JOIN department ON file.did=department.id ";

    if (!(personName.equals("") && personNumber.equals("") && fileNumber.equals("") && fileState.equals("") && fileDept.equals(""))){
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
    if (!fileState.equals("")){
      if (sql.substring(sql.length()-6,sql.length()).equals("where ")){
        sql=sql+fileState;
      }else{
        sql=sql+"and "+ fileState;
      }
    }
    if (!fileDept.equals("")){
      if (sql.substring(sql.length()-6,sql.length()).equals("where ")){
        sql=sql+fileDept;
      }else{
        sql=sql+"and "+ fileDept;
      }
    }
    files=File.dao.find(sql);
    if (files.size()>100) {
      setSessionAttr("PersonName", "");
      setSessionAttr("PersonNumber", "");
      setSessionAttr("FileNumber", "");
      setSessionAttr("FileDept", "");
      setSessionAttr("FileState", "");
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
    String[] title={"档案编号","档案状态","姓名","证件号码","联系电话1","联系电话2","联系地址","性别","出生日期","档案年龄","信息整理","退休情况","人员备注","档案备注"};
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
    List<File> f;

    String sql="SELECT file.id AS fid, file.did AS did, file.number AS fnumber, file.state AS fstate, file.remark AS fremark, person.id AS pid, person.name AS pname, person.number AS pnumber, person.phone1 AS pphone1, person.phone2 AS pphone2, person.address AS paddress, person.sex AS psex, person.birth AS pbirth, person.remark AS premark, person.fileAge AS fileAge, person.state AS pstate, person.info AS pinfo, person.retire AS pretire, department.name AS dname FROM (file INNER JOIN person ON file.pid=person.id) INNER JOIN department ON file.did=department.id ";

    if (!(getSessionAttr("PersonName").equals("") && getSessionAttr("PersonNumber").equals("") && getSessionAttr("FileNumber").equals("") && getSessionAttr("FileState").equals("") && getSessionAttr("FileDept").equals(""))){
      sql=sql+" where ";
    }

    if (!getSessionAttr("PersonName").equals("")){
      if (sql.substring(sql.length()-6,sql.length()).equals("where ")){
        sql=sql+getSessionAttr("PersonName");
      }else{
        sql=sql+"and "+ getSessionAttr("PersonName");
      }
    }
    if (!getSessionAttr("PersonNumber").equals("")){
      if (sql.substring(sql.length()-6,sql.length()).equals("where ")){
        sql=sql+getSessionAttr("PersonNumber");
      }else{
        sql=sql+"and "+ getSessionAttr("PersonNumber");
      }
    }
    if (!getSessionAttr("FileNumber").equals("")){
      if (sql.substring(sql.length()-6,sql.length()).equals("where ")){
        sql=sql+getSessionAttr("FileNumber");
      }else{
        sql=sql+"and "+ getSessionAttr("FileNumber");
      }
    }
    if (!getSessionAttr("FileState").equals("")){
      if (sql.substring(sql.length()-6,sql.length()).equals("where ")){
        sql=sql+getSessionAttr("FileState");
      }else{
        sql=sql+"and "+ getSessionAttr("FileState");
      }
    }
    if (!getSessionAttr("FileDept").equals("")){
      if (sql.substring(sql.length()-6,sql.length()).equals("where ")){
        sql=sql+getSessionAttr("FileDept");
      }else{
        sql=sql+"and "+ getSessionAttr("FileDept");
      }
    }
    System.out.println(sql);
    f=File.dao.find(sql);

    for (int i = 0; i < f.size(); i++) {
      XSSFRow nextRow = sheet.createRow(i+1);
      XSSFCell cell2 = nextRow.createCell(0);
      cell2.setCellValue(f.get(i).get("fnumber").toString());
      cell2 = nextRow.createCell(1);
      cell2.setCellValue(f.get(i).get("fstate").toString());
      cell2 = nextRow.createCell(2);
      cell2.setCellValue(f.get(i).get("fremark").toString());
      cell2 = nextRow.createCell(3);
      cell2.setCellValue(f.get(i).get("pname").toString());
      cell2 = nextRow.createCell(4);
      cell2.setCellValue(f.get(i).get("pnumber").toString());
      cell2 = nextRow.createCell(5);
      cell2.setCellValue(f.get(i).get("pphone1").toString());
      cell2 = nextRow.createCell(6);
      cell2.setCellValue(f.get(i).get("pphone2").toString());
      cell2 = nextRow.createCell(7);
      cell2.setCellValue(f.get(i).get("paddress").toString());
      cell2 = nextRow.createCell(8);
      cell2.setCellValue(f.get(i).get("psex").toString());
      cell2 = nextRow.createCell(9);
      cell2.setCellValue(f.get(i).get("pbirth").toString());
      cell2 = nextRow.createCell(10);
      cell2.setCellValue(f.get(i).get("fileAge").toString());
      cell2 = nextRow.createCell(11);
      cell2.setCellValue(f.get(i).get("pinfo").toString());
      cell2 = nextRow.createCell(12);
      cell2.setCellValue(f.get(i).get("pretire").toString());
      cell2 = nextRow.createCell(13);
      if (f.get(i).get("premark") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("premark").toString());
      }
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


