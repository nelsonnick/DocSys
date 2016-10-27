package com.wts.controller;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.wts.entity.model.*;
import com.wts.util.IDNumber;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

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
    String nn = Department.dao.findById(((User) getSessionAttr("user")).getStr("did")).getStr("number")+df.format(date);
    List<File> files = File.dao.find(
            "select * from file where number like '%"+nn+"%'");
    renderText(nn+String.valueOf(files.size()+1));
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
  public void add() {
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
      renderText("联系电话必须为11位数字!");
    } else if (!IDNumber.availableIDNumber(getPara("pnumber"))){
      renderText("证件号码错误，请核实！");
    } else if (getPara("paddress").length()<2) {
      renderText("联系地址应该在两个字符以上！");
    } else {
      Person p = new Person();
      p.set("name", getPara("pname").trim())
              .set("number", getPara("pnumber").trim())
              .set("phone1", getPara("pphone1").trim())
              .set("phone2", getPara("pphone2").trim())
              .set("address", getPara("paddress").trim())
              .set("remark", getPara("premark").trim())
              .set("fileAge", getPara("fileAge").trim())
              .set("state", "1")
              .set("sex", IDNumber.getMF(getPara("pnumber").trim()))
              .set("birth", IDNumber.getBirthDate(getPara("pnumber").trim())).save();
      File f = new File();
      f.set("number", getPara("fnumber").trim())
              .set("state", "在档")
              .set("remark", getPara("fremark").trim())
              .set("did", ((User) getSessionAttr("user")).getStr("did"))
              .set("pid",p.getId()).save();
      Flow l = new Flow();
      l.set("remark", getPara("lremark").trim())
              .set("type", getPara("ltype").trim())
              .set("direct", getPara("ldirect").trim())
              .set("direct", getPara("ldirect").trim())
              .set("reason", getPara("lreason").trim())
              .set("did", ((User) getSessionAttr("user")).getStr("did"))
              .set("uid", ((User) getSessionAttr("user")).getStr("id"))
              .set("time", new Date())
              .set("fid",f.getId()).save();
      renderText("OK");
    }
  }
}


