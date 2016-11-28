package com.wts.controller;

import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.tx.Tx;
import com.wts.entity.model.*;
import com.wts.interceptor.LoginInterceptor;
import com.wts.interceptor.PowerInterceptor;
import com.wts.util.IDNumber;
import com.wts.util.Util;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;
import java.util.List;

public class PersonController extends Controller {
  /**
   * 核查真实姓名
   * name
   */
  @Before(LoginInterceptor.class)
  public void name() {
    if (!getPara("name").matches("[\u4e00-\u9fa5]+")) {
      renderText("真实姓名必须为汉字!");
    } else if (getPara("name").length()<2) {
      renderText("真实姓名应该在两个汉字以上!");
    } else {
      renderText("OK");
    }
  }
  /**
   * 核查证件号码（新增）
   * number
   */
  @Before(LoginInterceptor.class)
  public void number() {
    if (getPara("number").equals("000000000000000000")) {
      renderText("OK");
    } else {
      List<Person> persons = Person.dao.find(
              "select * from person where number=?", getPara("number"));
      if (persons.size() != 0) {
        renderText("该证件号码已存在，请更换!");
      } else {
        renderText(IDNumber.checkIDNumber(getPara("number")));
      }
    }
  }
  /**
   * 核查证件号码（修改）
   * number
   */
  @Before(LoginInterceptor.class)
  public void numbers() {
    if (getPara("number").equals("000000000000000000")) {
      renderText("OK");
    } else {
      List<Person> persons = Person.dao.find(
              "select * from person where number=?", getPara("number"));
      if (persons.size() >= 2) {
        renderText("该证件号码已存在，请更换!");
      } else {
        renderText(IDNumber.checkIDNumber(getPara("number")));
      }
    }
  }
  /**
   * 核查证件号码(提档函)
   * number
   */
  @Before(LoginInterceptor.class)
  public void numberz() {
    renderText(IDNumber.checkIDNumber(getPara("number")));
  }
  /**
   * 核查联系电话1
   * phone1
   */
  @Before(LoginInterceptor.class)
  public void phone1() {
    if (!getPara("phone").matches("\\d{11}")) {
      renderText("联系电话必须为11位数字!");
    } else {
      renderText("OK");
    }
  }
  /**
   * 核查联系电话2
   * phone2
   */
  @Before(LoginInterceptor.class)
  public void phone2() {
    if (!getPara("phone").trim().equals("")){
      if (!getPara("phone").matches("\\d{11}")) {
        renderText("联系电话必须为11位数字或不填写!");
      } else {
        renderText("OK");
      }
    } else {
      renderText("OK");
    }
  }
  /**
   * 核查联系地址
   * address
   */
  @Before(LoginInterceptor.class)
  public void address() {
    if (getPara("address").trim().length()<2) {
      renderText("联系地址应该在两个字符以上!");
    } else {
      renderText("OK");
    }
  }
  /**
   * 核查年龄
   * age
   */
  @Before(LoginInterceptor.class)
  public void age() {
    String a = "^([\\d]{4}(((0[13578]|1[02])((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|11)((0[1-9])|([12][1-9])|30))|(02((0[1-9])|(1[0-9])|(2[1-8])))))|((((([02468][048])|([13579][26]))00)|([0-9]{2}(([02468][048])|([13579][26]))))(((0[13578]|1[02])((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|11)((0[1-9])|([12][1-9])|30))|(02((0[1-9])|(1[0-9])|(2[1-9])))))";
    if (!getPara("fileAge").matches("\\d{8}")) {
      renderText("档案年龄必须为8位数字!");
    } else {
      if (getPara("fileAge").matches(a)) {
        renderText("OK");
      }else{
        renderText("档案年龄日期有误!");
      }
    }
  }

  /**
   * 查询人员
   * PageNumber
   * PageSize
   * PersonName
   * PersonNumber
   * PersonState
   */
  @Before({LoginInterceptor.class,PowerInterceptor.class})
  public void query() {
    Page<Person> persons=Person.dao.paginate2(getParaToInt("PageNumber"),getParaToInt("PageSize"),getPara("PersonName"),getPara("PersonNumber"),getPara("PersonState"));
    renderJson(persons.getList());
  }
  /**
   * 查询人员数量
   * PersonName
   * PersonNumber
   * PersonState
   */
  @Before({LoginInterceptor.class,PowerInterceptor.class})
  public void count() {
    String count = Db.queryLong("select count(*) from person where name like '%" + getPara("PersonName") + "%' and number like '%" + getPara("PersonNumber") + "%' and state like '%" + getPara("PersonState") + "%'").toString();
    renderText(count);
  }
  /**
   * 人员转在档
   * id
   */
  @Before({Tx.class,LoginInterceptor.class,PowerInterceptor.class})
  public void active(){
    Person person = Person.dao.findById(getPara("id"));
    if (person == null) {
      renderText("要转为在档状态的人员不存在，请刷新页面后再试！");
    }else if (Util.CheckNull(person.getStr("state")).equals("在档")){
      renderText("该用户已处于在档状态！");
    }else{
      if (person.set("state", "在档").update()){
        renderText("OK");
      } else {
        renderText("发生未知错误，请检查数据库！");
      }
    }
  }
  /**
   * 人员转已提
   * id
   */
  @Before({Tx.class,LoginInterceptor.class,PowerInterceptor.class})
  public void abandon(){
    Person person = Person.dao.findById(getPara("id"));
    if (person == null) {
      renderText("要转为已提状态的人员不存在，请刷新页面后再试！");
    }else if (Util.CheckNull(person.getStr("state")).equals("已提")){
      renderText("该用户已处于已提状态！");
    }else{
      if (person.set("state", "已提").update()){
        renderText("OK");
      } else {
        renderText("发生未知错误，请检查数据库！");
      }
    }
  }
  /**
   * 检查导出
   * PersonName
   * PersonNumber
   * PersonState
   */
  @Before(LoginInterceptor.class)
  public void download() {
    List<Person> persons;
    String personName,personNumber,personState;
    if (getPara("PersonName").equals("") || getPara("PersonName")==null) {
      personName = "";
      setSessionAttr("PersonName", "");
    }else{
      personName = " name like '%"+getPara("PersonName")+"%'";
      setSessionAttr("personName", getPara("personName"));
    }
    if (getPara("PersonNumber").equals("") || getPara("PersonNumber")==null) {
      personNumber = "";
      setSessionAttr("PersonNumber", "");
    }else{
      personNumber = " number like '%"+getPara("PersonNumber")+"%'";
      setSessionAttr("PersonNumber", getPara("PersonNumber"));
    }
    if (getPara("PersonState").equals("") || getPara("PersonState")==null) {
      personState = "";
      setSessionAttr("PersonState", "");
    }else{
      personState = " state like '%"+getPara("PersonState")+"%'";
      setSessionAttr("PersonState", getPara("PersonState"));
    }

    String sql="select person.* from person";
    if (!(personName.equals("") && personNumber.equals("") && personState.equals(""))){
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
    if (!personState.equals("")){
      if (sql.substring(sql.length()-6,sql.length()).equals("where ")){
        sql=sql+personState;
      }else{
        sql=sql+"and "+ personState;
      }
    }
    persons=Person.dao.find(sql);
    if (persons.size()>100000) {
      setSessionAttr("PersonName", "");
      setSessionAttr("PersonNumber", "");
      setSessionAttr("PersonState", "");
      renderText("导出数据数量超过10万，请从后台操作！");
    }else{
      renderText("OK");
    }
  }

  /**
   * 导出
   */
  @Before({Tx.class,LoginInterceptor.class,PowerInterceptor.class})
  public void export() throws IOException {
    String[] title={"序号","姓名","证件号码","联系电话1","联系电话2","联系地址","性别","出生日期","档案年龄","信息整理","退休情况","人员备注","人员状态"};
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
    List<Person> f;

    String sql="select person.* from person";
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
    if (!getSessionAttr("PersonState").equals("")){
      if (sql.substring(sql.length()-6,sql.length()).equals("where ")){
        sql=sql+getSessionAttr("PersonState");
      }else{
        sql=sql+"and "+ getSessionAttr("PersonState");
      }
    }
    if (!((User) getSessionAttr("user")).get("login").toString().equals(Util.ADMIN)){
      Export e =new Export();
      e.set("uid",((User) getSessionAttr("user")).get("id").toString())
              .set("time", new Date())
              .set("type","人员导出")
              .set("sql",sql)
              .save();
    }
    f=Person.dao.find(sql);
    for (int i = 0; i < f.size(); i++) {
      XSSFRow nextRow = sheet.createRow(i+1);
      XSSFCell cell2 = nextRow.createCell(0);
      if (f.get(i).get("id") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("id").toString());
      }
      cell2 = nextRow.createCell(1);
      if (f.get(i).get("name") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("name").toString());
      }
      cell2 = nextRow.createCell(2);
      if (f.get(i).get("number") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("number").toString());
      }
      cell2 = nextRow.createCell(3);
      if (f.get(i).get("phone1") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("phone1").toString());
      }
      cell2 = nextRow.createCell(4);
      if (f.get(i).get("phone2") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("phone2").toString());
      }
      cell2 = nextRow.createCell(5);
      if (f.get(i).get("address") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("address").toString());
      }
      cell2 = nextRow.createCell(6);
      if (f.get(i).get("sex") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("sex").toString());
      }
      cell2 = nextRow.createCell(7);
      if (f.get(i).get("birth") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("birth").toString());
      }
      cell2 = nextRow.createCell(8);
      if (f.get(i).get("fileAge") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("fileAge").toString());
      }
      cell2 = nextRow.createCell(9);
      if (f.get(i).get("info") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("info").toString());
      }
      cell2 = nextRow.createCell(10);
      if (f.get(i).get("retire") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("retire").toString());
      }
      cell2 = nextRow.createCell(11);
      if (f.get(i).get("remark") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("remark").toString());
      }
      cell2 = nextRow.createCell(12);
      if (f.get(i).get("state") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(f.get(i).get("state").toString());
      }
    }
    HttpServletResponse response = getResponse();
    response.setContentType("application/octet-stream");
    response.setHeader("Content-Disposition", "attachment;filename=PersonExport.xlsx");
    OutputStream out = response.getOutputStream();
    workbook.write(out);
    out.flush();
    out.close();
    workbook.close();
    renderNull() ;
  }
}


