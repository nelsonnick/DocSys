package com.wts.controller;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.wts.entity.Department;
import com.wts.entity.File;
import com.wts.entity.User;

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
    Page<File> files=File.dao.paginate2(getParaToInt("PageNumber"),getParaToInt("PageSize"),getPara("PersonName"),getPara("PersonNumber"),getPara("FileNumber"),getPara("FileDept"))
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
      String count = Db.queryLong("select count(*) from file inner join person on person.id = file.pid where person.name like '&" + getPara("PersonName") + "&' and  person.number like '&" + getPara("PersonNumber") + "&' and file.number like '%" + getPara("FileNumber") + "%'").toString();
      String count = Db.queryLong("select count(*) from file inner join person on person.id = file.pid where person.name like '&" + getPara("PersonName") + "&' and  person.number like '&" + getPara("PersonNumber") + "&' and file.number like '%" + getPara("FileNumber") + "%' and file.did = " + getPara("FileDept")).toString();

      renderText(count);
    } else {
      renderText(count);
    }
  }

}


