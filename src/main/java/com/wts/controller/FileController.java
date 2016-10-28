package com.wts.controller;

import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.tx.Tx;
import com.wts.entity.model.*;
import com.wts.util.IDNumber;
import com.wts.util.Util;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import static com.sun.org.apache.xml.internal.security.keys.keyresolver.KeyResolver.length;
import static com.sun.scenario.Settings.set;

public class FileController extends Controller {
  /**
   * 核查档案编号
   *@param: number
   */
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
   * 最新档案编号
   */
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
  public void count() {
    if (getPara("FileDept").equals("")) {
      String count = Db.queryLong("select count(*) from file inner join person on person.id = file.pid where person.name like '&" + getPara("PersonName") + "&' and  person.number like '&" + getPara("PersonNumber") + "&' and file.number like '%" + getPara("FileNumber") + "%' and file.state like '%" + getPara("FileState") + "%'").toString();
      renderText(count);
    } else {
      String count = Db.queryLong("select count(*) from file inner join person on person.id = file.pid where person.name like '&" + getPara("PersonName") + "&' and  person.number like '&" + getPara("PersonNumber") + "&' and file.number like '%" + getPara("FileNumber") + "%' and file.state like '%" + getPara("FileState") + "%' and file.did = " + getPara("FileDept")).toString();
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
  @Before(Tx.class)
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
  @Before(Tx.class)
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
              && person.get("address").equals(getPara("address").trim())
              && person.get("info").equals(getPara("pinfo").trim())
              && person.get("remark").equals(getPara("premark").trim())
              && fileAge.equals(getPara("pretire").trim())
              ){
        renderText("未找到修改内容，请核实后再修改！");
      } else if (!person.get("number").equals(getPara("pnumber"))
              && Person.dao.find("select * from person where number=?", getPara("pnumber")).size() > 0
              ){
        renderText("该证件号码数据库中已存在，请核实！");
      } else if (!getPara("pname").matches("[\u4e00-\u9fa5]+")) {
        renderText("市民姓名必须为汉字!");
      } else if (getPara("pname").length()<2) {
        renderText("市民姓名必须为两个以上汉字，请核实!");
      } else if (!getPara("pphone1").matches("\\d{11}")) {
        renderText("联系电话1必须为11位数字!");
      } else if (!IDNumber.availableIDNumber(getPara("number"))){
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
                .set("pphone1After",getPara("pphone1").trim())
                .set("pphone2After",getPara("pphone2").trim())
                .set("addressAfter",getPara("paddress").trim())
                .set("infoAfter",getPara("pinfo").trim())
                .set("retireAfter",getPara("pretire").trim())
                .set("premarkAfter",getPara("premark").trim())
                .set("fremarkAfter",getPara("fremark").trim())
                .set("fileAgeAfter", IDNumber.getFileDate(getPara("fileAge").trim()))
                .set("nameBefore",person.get("name").toString().trim())
                .set("numberBefore",person.get("number").toString().trim())
                .set("pphone1Before",person.get("phone1").toString().trim())
                .set("pphone2Before",person.get("phone2").toString().trim())
                .set("addressBefore",person.get("address").toString().trim())
                .set("infoBefore",person.get("info").toString().trim())
                .set("retireBefore",person.get("retire").toString().trim())
                .set("premarkBefore",person.get("renmark").toString().trim())
                .set("fremarkBeforeAfter",file.get("remark").toString().trim())
                .set("fileAgeBefore",person.get("fileAge"))
                .save();
        person.set("name",getPara("pname").trim())
                .set("number",getPara("pnumber").trim())
                .set("pphone1",getPara("pphone1").trim())
                .set("pphone2",getPara("pphone2").trim())
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
  @Before(Tx.class)
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
  @Before(Tx.class)
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

    if (personName.equals("") && fileDept.equals("")) {
      users = User.dao.find("select * from user");
    }else if (personName.equals("") && !fileDept.equals("")) {
      users = User.dao.find("select * from user where" + fileDept);
    }else if (!personName.equals("") && fileDept.equals("")) {
      users = User.dao.find("select * from user where" + personName);
    }else{
      users = User.dao.find("select * from user where" + personName + " and " + fileDept);
    }
    if (files.size()>100) {
      setSessionAttr("UserName", "");
      setSessionAttr("UserDept", "");
      renderText("导出数据数量超过上限！");
    }else{
      if(getPara("UserName").equals("") || getPara("UserName")==null){
        setSessionAttr("UserName", "");
      }else {
        setSessionAttr("UserName", getPara("UserName"));
      }
      if(getPara("UserDept").equals("") || getPara("UserDept")==null){
        setSessionAttr("UserDept", "");
      }else {
        setSessionAttr("UserDept", getPara("UserDept"));
      }
      renderText("OK");
    }
  }
}


