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
   * number
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
   * number
   */
  @Before(LoginInterceptor.class)
  public void numbers() {
    List<File> files = File.dao.find(
            "select * from file where number=? and did=?", getPara("number"),((User) getSessionAttr("user")).get("did").toString());
    if (files.size() >1) {
      renderText("该档案编号在当前部门已存在，请更换!");
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
   * PageNumber
   * PageSize
   * PersonName
   * PersonNumber
   * FileNumber
   * FileDept
   */
  @Before({Tx.class,LoginInterceptor.class})
  public void query() {
    String sql;
    if (getPara("FileDept").equals("")) {
      sql="SELECT file.id AS fid, file.did AS did, file.number AS fnumber, file.state AS fstate, file.remark AS fremark, person.id AS pid, person.name AS pname, person.number AS pnumber, person.phone1 AS pphone1, person.phone2 AS pphone2, person.address AS paddress, person.sex AS psex, person.birth AS pbirth, person.remark AS premark, person.fileAge AS fileAge, person.state AS pstate, person.info AS pinfo, person.retire AS pretire, department.name AS dname FROM (file INNER JOIN person ON file.pid=person.id) INNER JOIN department ON file.did=department.id WHERE person.name LIKE '%" + getPara("PersonName") + "%' AND person.number LIKE '%" + getPara("PersonNumber") + "%' AND file.number LIKE '%" + getPara("FileNumber") + "%' AND file.state LIKE '%" + getPara("FileState") + "%' ORDER BY file.id DESC";
    } else {
      sql="SELECT file.id AS fid, file.did AS did, file.number AS fnumber, file.state AS fstate, file.remark AS fremark, person.id AS pid, person.name AS pname, person.number AS pnumber, person.phone1 AS pphone1, person.phone2 AS pphone2, person.address AS paddress, person.sex AS psex, person.birth AS pbirth, person.remark AS premark, person.fileAge AS fileAge, person.state AS pstate, person.info AS pinfo, person.retire AS pretire, department.name AS dname FROM (file INNER JOIN person ON file.pid=person.id) INNER JOIN department ON file.did=department.id WHERE person.name LIKE '%" + getPara("PersonName") + "%' AND person.number LIKE '%" + getPara("PersonNumber") + "%' AND file.number LIKE '%" + getPara("FileNumber") + "%' AND file.state LIKE '%" + getPara("FileState") + "%' AND file.did = " + getPara("FileDept") + "  ORDER BY file.id DESC";
    }

    Page<File> files=File.dao.paginate2(getParaToInt("PageNumber"),getParaToInt("PageSize"),getPara("PersonName"),getPara("PersonNumber"),getPara("FileNumber"),getPara("FileDept"),getPara("FileState"));

    Look o =new Look();
    o.set("uid",((User) getSessionAttr("user")).get("id").toString())
            .set("time", new Date())
            .set("pageNumber",getPara("PageNumber"))
            .set("pageSize",getPara("PageSize"))
            .set("type","档案搜索")
            .set("sql",sql)
            .save();
    renderJson(files.getList());
  }
  /**
   * 查询档案数量
   * PersonName
   * PersonNumber
   * FileNumber
   * FileDept
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
   * pname
   * pnumber
   * pphone1
   * pphone2
   * paddress
   * pinfo
   * pretire
   * premark
   * fnumber
   * fremark
   * lremark
   * lreason
   * fileAge
   * ltype
   * ldirect
   */
  @Before({Tx.class,LoginInterceptor.class})
  public void add() {
    // String a = "^(?:(?!0000)[0-9]{4}(?:(?:0[1-9]|1[0-2])(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$";
    String a = "^([\\d]{4}(((0[13578]|1[02])((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|11)((0[1-9])|([12][1-9])|30))|(02((0[1-9])|(1[0-9])|(2[1-8])))))|((((([02468][048])|([13579][26]))00)|([0-9]{2}(([02468][048])|([13579][26]))))(((0[13578]|1[02])((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|11)((0[1-9])|([12][1-9])|30))|(02((0[1-9])|(1[0-9])|(2[1-9])))))";
    List<File> files = File.dao.find(
            "select * from file where number=?", getPara("fnumber"));
    List<Person> persons = Person.dao.find(
            "select * from person where number=?", getPara("pnumber"));
    if (files.size() != 0) {
      renderText("该档案编号数据库中已存在，请核实!");
    } else if (persons.size() != 0 && !getPara("pnumber").equals("000000000000000000")) {
      renderText("该证件号码数据库中已存在，请核实!");
    } else if (!getPara("pname").matches("[\u4e00-\u9fa5]+")) {
      renderText("人员姓名必须为汉字!");
    } else if (getPara("pname").length()<2) {
      renderText("人员姓名称必须为两个以上汉字!");
    } else if (!getPara("pphone1").matches("\\d{11}")) {
      renderText("联系电话1必须为11位数字!");
    } else if ((!getPara("pphone2").trim().equals("")) && (!getPara("pphone2").matches("\\d{11}"))){
      renderText("联系电话2必须为11位数字或不填写!");
    } else if (!IDNumber.availableIDNumber(getPara("pnumber")) && !getPara("pnumber").equals("000000000000000000")){
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
              .set("phone2", Util.CheckNull(getPara("pphone2").trim()))
              .set("address", getPara("paddress").trim())
              .set("remark", Util.CheckNull(getPara("premark").trim()))
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
              .set("remark", Util.CheckNull(getPara("fremark").trim()))
              .set("did", ((User) getSessionAttr("user")).get("did").toString())
              .set("pid",p.get("id").toString())
              .save();
      Flow l = new Flow();
      l.set("remark", Util.CheckNull(getPara("lremark").trim()))
              .set("type", getPara("ltype").trim())
              .set("direct", getPara("ldirect").trim())
              .set("reason", getPara("lreason").trim())
              .set("did", ((User) getSessionAttr("user")).get("did").toString())
              .set("uid", ((User) getSessionAttr("user")).get("id").toString())
              .set("pid",p.get("id").toString())
              .set("time", new Date())
              .set("fid",f.get("id").toString())
              .set("flow","转入")
              .save();
      renderText("OK");
    }
  }

  /**
   * 修改档案
   * fid
   * pid
   * pname
   * pnumber
   * pphone1
   * pphone2
   * paddress
   * pinfo
   * pretire
   * premark
   * fnumber
   * fremark
   * fileAge
   */
  @Before({Tx.class,LoginInterceptor.class})
  public void edit() {
    // String a = "^(?:(?!0000)[0-9]{4}(?:(?:0[1-9]|1[0-2])(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$";
    String a = "^([\\d]{4}(((0[13578]|1[02])((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|11)((0[1-9])|([12][1-9])|30))|(02((0[1-9])|(1[0-9])|(2[1-8])))))|((((([02468][048])|([13579][26]))00)|([0-9]{2}(([02468][048])|([13579][26]))))(((0[13578]|1[02])((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|11)((0[1-9])|([12][1-9])|30))|(02((0[1-9])|(1[0-9])|(2[1-9])))))";
    File file = File.dao.findById(getPara("fid"));
    if (((User) getSessionAttr("user")).get("did")!=file.getInt("did")){
      removeSessionAttr("user");
      redirect("/index");
    }else{
      Person person = Person.dao.findById(getPara("pid"));
      SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
      String fileAge = sdf.format(person.get("fileAge"));
      if (file == null) {
        renderText("要修改的档案不存在，请刷新页面后再试！");
      } else if (Person.dao.findById(getPara("pid")) == null) {
        renderText("要修改的人员不存在，请刷新页面后再试！");
      } else {
        if (Util.CheckNull(file.getStr("remark")).equals(getPara("fremark").trim())
                && Util.CheckNull(file.getStr("number")).equals(getPara("fnumber").trim())
                && Util.CheckNull(person.getStr("name")).equals(getPara("pname").trim())
                && Util.CheckNull(person.getStr("number")).equals(getPara("pnumber").trim())
                && Util.CheckNull(person.getStr("phone1")).equals(getPara("pphone1").trim())
                && Util.CheckNull(person.getStr("phone2")).equals(getPara("pphone2").trim())
                && Util.CheckNull(person.getStr("address")).equals(getPara("paddress").trim())
                && Util.CheckNull(person.getStr("info")).equals(getPara("pinfo").trim())
                && Util.CheckNull(person.getStr("remark")).equals(getPara("premark").trim())
                && Util.CheckNull(person.getStr("retire")).equals(getPara("pretire").trim())
                && fileAge.equals(getPara("fileAge").trim())
                ) {
          renderText("未找到修改内容，请核实后再修改！");
        } else if (!Util.CheckNull(person.getStr("number")).equals(getPara("pnumber"))
                && Person.dao.find("select * from person where number=?", getPara("pnumber")).size() > 0
                && !getPara("pnumber").equals("000000000000000000")) {
          renderText("该证件号码数据库中已存在，请核实！");
        } else if (!Util.CheckNull(file.getStr("number")).equals(getPara("fnumber"))
                && File.dao.find("select * from file where number=? and did=?", getPara("fnumber"), ((User) getSessionAttr("user")).get("did").toString()).size() > 0
                ) {
          renderText("该档案编号数据库中已存在，请核实！");
        } else if (!getPara("pname").matches("[\u4e00-\u9fa5]+")) {
          renderText("市民姓名必须为汉字!");
        } else if (getPara("pname").length() < 2) {
          renderText("市民姓名必须为两个以上汉字，请核实!");
        } else if (!getPara("pphone1").matches("\\d{11}")) {
          renderText("联系电话1必须为11位数字!");
        } else if (!IDNumber.availableIDNumber(getPara("pnumber"))) {
          renderText("证件号码错误，请核实！");
        } else if ((!getPara("pphone2").trim().equals("")) && (!getPara("pphone2").matches("\\d{11}"))) {
          renderText("联系电话2必须为11位数字或不填写!");
        } else if (getPara("paddress").length() < 2) {
          renderText("联系地址应该在两个字符以上！");
        } else if (!getPara("fileAge").matches(a)) {
          renderText("档案年龄日期有误!");
        } else {
          Trans t = new Trans();
          t.set("pid", getPara("pid").trim())
                  .set("uid", ((User) getSessionAttr("user")).get("id").toString())
                  .set("fid", getPara("fid").trim())
                  .set("did", ((User) getSessionAttr("user")).get("did").toString())
                  .set("time", new Date())
                  .set("nameAfter", getPara("pname").trim())
                  .set("pnumberAfter", getPara("pnumber").trim())
                  .set("fnumberAfter", getPara("fnumber").trim())
                  .set("phone1After", getPara("pphone1").trim())
                  .set("phone2After", Util.CheckNull(getPara("pphone2").trim()))
                  .set("addressAfter", getPara("paddress").trim())
                  .set("infoAfter", getPara("pinfo").trim())
                  .set("retireAfter", getPara("pretire").trim())
                  .set("premarkAfter", Util.CheckNull(getPara("premark").trim()))
                  .set("fremarkAfter", Util.CheckNull(getPara("fremark").trim()))
                  .set("fileAgeAfter", IDNumber.getFileDate(getPara("fileAge").trim()))
                  .set("nameBefore", Util.CheckNull(person.getStr("name")))
                  .set("pnumberBefore", Util.CheckNull(person.getStr("number")))
                  .set("fnumberBefore", Util.CheckNull(file.getStr("number")))
                  .set("phone1Before", Util.CheckNull(person.getStr("phone1")))
                  .set("phone2Before", Util.CheckNull(person.getStr("phone2")))
                  .set("addressBefore", Util.CheckNull(person.getStr("address")))
                  .set("infoBefore", Util.CheckNull(person.getStr("info")))
                  .set("retireBefore", Util.CheckNull(person.getStr("retire")))
                  .set("premarkBefore", Util.CheckNull(person.getStr("remark")))
                  .set("fremarkBefore", Util.CheckNull(file.getStr("remark")))
                  .set("fileAgeBefore", person.get("fileAge"))
                  .save();
          person.set("name", getPara("pname").trim())
                  .set("number", getPara("pnumber").trim())
                  .set("phone1", getPara("pphone1").trim())
                  .set("phone2", Util.CheckNull(getPara("pphone2").trim()))
                  .set("address", getPara("paddress").trim())
                  .set("info", getPara("pinfo").trim())
                  .set("retire", getPara("pretire").trim())
                  .set("remark", Util.CheckNull(getPara("premark").trim()))
                  .set("fileAge", IDNumber.getFileDate(getPara("fileAge").trim()))
                  .update();
          file.set("remark", Util.CheckNull(getPara("fremark").trim()))
                  .set("number", getPara("fnumber").trim())
                  .update();
          renderText("OK");
        }
      }
    }
  }

  /**
   * 档案转出
   * fid
   * pid
   * ltype
   * ldirect
   * lreason
   * lremark
   */
  @Before({Tx.class, LoginInterceptor.class})
  public void flow() {
    File file = File.dao.findById(getPara("fid"));
    if (((User) getSessionAttr("user")).get("did")!=file.getInt("did")){
      removeSessionAttr("user");
      redirect("/index");
    }else {
      Person person = Person.dao.findById(getPara("pid"));
      if (Util.CheckNull(file.getStr("state")).equals("已提")) {
        renderText("该档案已办理提档手续！");
      } else if (Util.CheckNull(person.getStr("state")).equals("已提")) {
        renderText("该人员已处于提档状态！");
      } else {
        Flow l = new Flow();
        l.set("pid", getPara("pid").trim())
                .set("uid", ((User) getSessionAttr("user")).get("id").toString())
                .set("fid", getPara("fid").trim())
                .set("did", ((User) getSessionAttr("user")).get("did").toString())
                .set("type", getPara("ltype").trim())
                .set("direct", getPara("ldirect").trim())
                .set("reason", getPara("lreason").trim())
                .set("remark", getPara("lremark").trim())
                .set("time", new Date())
                .set("flow", "转出")
                .save();
        file.set("state", "已提").update();
        person.set("state", "已提").update();
        renderText("OK");
      }
    }
  }

  /**
   * 重存档案
   * fnumber
   * pid
   * fremark
   * lremark
   * lreason
   * ltype
   * ldirect
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
    } else if (!Util.CheckNull(person.getStr("state")).equals("已提")) {
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
   * PersonName
   * PersonNumber
   * FileDept
   * FileNumber
   * FileState
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
    if (files.size()>100000) {
      setSessionAttr("PersonName", "");
      setSessionAttr("PersonNumber", "");
      setSessionAttr("FileNumber", "");
      setSessionAttr("FileDept", "");
      setSessionAttr("FileState", "");
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
    String[] title={"档案编号","档案状态","姓名","证件号码","联系电话1","联系电话2","联系地址","性别","出生日期","档案年龄","信息整理","退休情况","人员备注","档案材料","存档单位"};
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
    Export e =new Export();
    e.set("uid",((User) getSessionAttr("user")).get("id").toString())
            .set("time", new Date())
            .set("type","档案导出")
            .set("sql",sql)
            .save();
    f=File.dao.find(sql);
    for (int i = 0; i < f.size(); i++) {
      XSSFRow nextRow = sheet.createRow(i+1);
      XSSFCell cell2 = nextRow.createCell(0);
      if (f.get(i).get("fnumber") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("fnumber").toString());
      }
      cell2 = nextRow.createCell(1);
      if (f.get(i).get("fstate") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("fstate").toString());
      }
      cell2 = nextRow.createCell(2);
      if (f.get(i).get("fremark") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("fremark").toString());
      }
      cell2 = nextRow.createCell(3);
      if (f.get(i).get("pname") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("pname").toString());
      }
      cell2 = nextRow.createCell(4);
      if (f.get(i).get("pnumber") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("pnumber").toString());
      }
      cell2 = nextRow.createCell(5);
      if (f.get(i).get("pphone1") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("pphone1").toString());
      }
      cell2 = nextRow.createCell(6);
      if (f.get(i).get("pphone2") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("pphone2").toString());
      }
      cell2 = nextRow.createCell(7);
      if (f.get(i).get("paddress") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("paddress").toString());
      }
      cell2 = nextRow.createCell(8);
      if (f.get(i).get("psex") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("psex").toString());
      }
      cell2 = nextRow.createCell(9);
      if (f.get(i).get("pbirth") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("pbirth").toString());
      }
      cell2 = nextRow.createCell(10);
      if (f.get(i).get("fileAge") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("fileAge").toString());
      }
      cell2 = nextRow.createCell(11);
      if (f.get(i).get("pinfo") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("pinfo").toString());
      }
      cell2 = nextRow.createCell(12);
      if (f.get(i).get("pretire") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("pretire").toString());
      }
      cell2 = nextRow.createCell(13);
      if (f.get(i).get("premark") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("premark").toString());
      }
      cell2 = nextRow.createCell(14);
      if (f.get(i).get("dname") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("dname").toString());
      }
    }
    HttpServletResponse response = getResponse();
    response.setContentType("application/octet-stream");
    response.setHeader("Content-Disposition", "attachment;filename=FileExport.xlsx");
    OutputStream out = response.getOutputStream();
    workbook.write(out);
    out.flush();
    out.close();
    workbook.close();
    renderNull() ;
  }
  /**
   * 打印存档证明
   * fid
   */
  @Before({Tx.class,LoginInterceptor.class})
  public void printProve() {

    File f = File.dao.findById(getPara("fid"));

    if (((User) getSessionAttr("user")).get("did")!=f.getInt("did")){
      removeSessionAttr("user");
      redirect("/index");
    }else{
      Prove r =new Prove();
      r.set("fid",getPara("fid"))
              .set("uid",((User) getSessionAttr("user")).get("id").toString())
              .set("type","存档证明")
              .set("time", new Date())
              .save();

      Department d = Department.dao.findById(f.getInt("did"));
      Person p =Person.dao.findById(f.getInt("pid"));
      setAttr("pname",Util.CheckNull(p.getStr("name")));
      setAttr("pnumber",Util.CheckNull(p.getStr("number")));
      setAttr("dname",Util.CheckNull(d.getStr("name")));
      SimpleDateFormat yyyy = new SimpleDateFormat("yyyy");
      SimpleDateFormat MM = new SimpleDateFormat("MM");
      SimpleDateFormat dd = new SimpleDateFormat("dd");
      setAttr("yyyy",yyyy.format(new Date()));
      setAttr("mm",MM.format(new Date()));
      setAttr("dd",dd.format(new Date()));
      render("/dist/printProve.html");
    }
  }
  /**
   * 打印政审证明
   * fid
   * pid
   * pnation
   * plearn
   * pface
   * ptime
   * pwork
   * pzl
   * pwg
   * pfl
   * premark
   */
  @Before({Tx.class,LoginInterceptor.class})
  public void printPolity() {
    File f = File.dao.findById(getPara("fid"));
    if (((User) getSessionAttr("user")).get("did")!=f.getInt("did")){
      removeSessionAttr("user");
      redirect("/index");
    }else {
      Polity r = new Polity();
      r.set("fid", getPara("fid"))
              .set("uid", ((User) getSessionAttr("user")).get("id").toString())
              .set("nation", Util.CheckNull(getPara("pnation")))
              .set("learn", Util.CheckNull(getPara("plearn")))
              .set("face", Util.CheckNull(getPara("pface")))
              .set("work", Util.CheckNull(getPara("pwork")))
              .set("leave", Util.CheckNull(getPara("pleave")))
              .set("zl", Util.CheckNull(getPara("pzl")))
              .set("wg", Util.CheckNull(getPara("pwg")))
              .set("ls", Util.CheckNull(getPara("pls")))
              .set("fl", Util.CheckNull(getPara("pfl")))
              .set("remark", Util.CheckNull(getPara("premark")))
              .set("time", new Date())
              .save();

      Department d = Department.dao.findById(f.getInt("did"));
      Person p = Person.dao.findById(f.getInt("pid"));
      setAttr("pname", Util.CheckNull(p.getStr("name")));
      setAttr("pnumber", Util.CheckNull(p.getStr("number")));
      setAttr("psex", Util.CheckNull(p.getStr("sex")));
      setAttr("pnation", Util.CheckNull(getPara("pnation")));
      setAttr("plearn", Util.CheckNull(getPara("plearn")));
      setAttr("pface", Util.CheckNull(getPara("pface")));
      setAttr("pleave", Util.CheckNull(getPara("pleave")));
      setAttr("pwork", Util.CheckNull(getPara("pwork")));
      setAttr("pzl", Util.CheckNull(getPara("pzl")));
      setAttr("pwg", Util.CheckNull(getPara("pwg")));
      setAttr("pls", Util.CheckNull(getPara("pls")));
      setAttr("pfl", Util.CheckNull(getPara("pfl")));
      setAttr("premark", Util.CheckNull(getPara("premark")));
      setAttr("dname", Util.CheckNull(d.getStr("name")));
      SimpleDateFormat yyyy = new SimpleDateFormat("yyyy");
      SimpleDateFormat MM = new SimpleDateFormat("MM");
      SimpleDateFormat dd = new SimpleDateFormat("dd");
      setAttr("yyyy", yyyy.format(new Date()));
      setAttr("mm", MM.format(new Date()));
      setAttr("dd", dd.format(new Date()));
      setAttr("pbirth", yyyy.format(p.get("birth")) + MM.format(p.get("birth")) + dd.format(p.get("birth")));

      render("/dist/printPolity.html");
    }
  }
  /**
   * 开提档函
   * pname
   * pnumber
   * location
   * remark
   */
  @Before({Tx.class,LoginInterceptor.class})
  public void printExtract() {
    Department d = Department.dao.findById(((User) getSessionAttr("user")).get("did").toString());
    Extract e =new Extract();
    e.set("did",((User) getSessionAttr("user")).get("did").toString())
            .set("uid",((User) getSessionAttr("user")).get("id").toString())
            .set("name",Util.CheckNull(getPara("pname")))
            .set("number",Util.CheckNull(getPara("pnumber")))
            .set("location",Util.CheckNull(getPara("location")))
            .set("remark",Util.CheckNull(getPara("remark")))
            .set("time", new Date())
            .save();

    setAttr("pname",Util.CheckNull(getPara("pname")));
    setAttr("pnumber",Util.CheckNull(getPara("pnumber")));
    setAttr("dname",Util.CheckNull(d.getStr("name")));
    setAttr("dphone",Util.CheckNull(d.getStr("phone")));
    setAttr("daddress",Util.CheckNull(d.getStr("address")));
    setAttr("dcode",Util.CheckNull(d.getStr("code")));
    setAttr("location",Util.CheckNull(getPara("location")));

    SimpleDateFormat yyyy = new SimpleDateFormat("yyyy");
    SimpleDateFormat MM = new SimpleDateFormat("MM");
    SimpleDateFormat dd = new SimpleDateFormat("dd");
    setAttr("yyyy",yyyy.format(new Date()));
    setAttr("mm",MM.format(new Date()));
    setAttr("dd",dd.format(new Date()));

    render("/dist/printExtract.html");
  }

}


