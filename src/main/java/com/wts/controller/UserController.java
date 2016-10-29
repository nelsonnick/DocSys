package com.wts.controller;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.wts.entity.model.*;
import com.wts.util.IDNumber;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import static com.wts.util.EncryptUtils.encodeMD5String;

public class UserController extends Controller {
  /**
   * 查询用户
   *@param: PageNumber
   *@param: PageSize
   *@param: UserName
   *@param: UserDept
   */
  public void query() {
    Page<User> users=User.dao.paginate2(getParaToInt("PageNumber"),getParaToInt("PageSize"),getPara("UserName"),getPara("UserDept"));
    renderJson(users.getList());
  }
  /**
   * 查询用户数量
   *@param: UserName
   *@param: UserDept
   */
  public void count() {
    if (getPara("UserDept").equals("")) {
      String count = Db.queryLong("select count(*) from user where name like '%" + getPara("UserName") + "%' and state<>'删除' ").toString();
      renderText(count);
    } else {
      String count = Db.queryLong("select count(*) from user where name like '%" + getPara("UserName") + "%' and did = " + getPara("UserDept") + " and state<>'删除' ").toString();
      renderText(count);
    }
  }

  /**
   * 核查用户真实姓名
   *@param: name
   */
  public void name() {
    if (!getPara("name").matches("[\u4e00-\u9fa5]+")) {
      renderText("真实姓名必须为汉字!");
    } else if (getPara("name").length()<2) {
      renderText("真实姓名必须在两个汉字以上，请使用其他名称!");
    } else {
      renderText("OK");
    }
  }
  /**
   * 核查用户证件号码
   *@param: number
   */
  public void number() {
    renderText(IDNumber.checkIDNumber(getPara("number")));
  }
  /**
   * 核查用户联系电话
   *@param: phone
   */
  public void phone() {
    if (!getPara("phone").matches("\\d{11}")) {
      renderText("联系电话必须为11位数字!");
    } else {
      renderText("OK");
    }
  }
  /**
   * 核查用户登录名称
   *@param: login
   */
  public void login() {
    List<User> user = User.dao.find(
            "select * from user where login=?", getPara("login"));
    if (user.size() != 0) {
      renderText("该登录名称已有其他工作人员使用，请更换!");
    } else if (!getPara("login").matches("[a-zA-Z0-9]{4,12}")) {
      renderText("登录名称必须为4到12位的数字或字母组合!");
    } else {
      renderText("OK");
    }
  }
  /**
   * 核查用户所属部门
   *@param: name
   */
  public void dept() {
    if (getPara("dept").equals("")) {
      renderText("所属部门尚未选择!");
    } else {
      renderText("OK");
    }
  }
  /**
   * 获取户所属部门
   *@param: did
   */
  public void depts() {
    Department department = Department.dao.findById(getPara("did"));
    renderText(department.get("id").toString());
  }
  /**
   * 新增用户
   */
  public void add() {
    List<User> user1 = User.dao.find(
            "select * from user where number=?", getPara("number"));
    List<User> user2 = User.dao.find(
            "select * from user where login=?", getPara("login"));
    if (!getPara("name").matches("[\u4e00-\u9fa5]+")) {
      renderText("用户名称必须为汉字!");
    } else if (user1.size() != 0) {
      renderText("该证件号码数据库中已存在，请核实!");
    } else if (user2.size() != 0) {
      renderText("该登录名称已有其他工作人员使用，请更换!");
    } else if (getPara("name").length()<2) {
      renderText("用户名称必须为两个以上汉字!");
    } else if (!getPara("login").matches("[a-zA-Z0-9]{4,12}")) {
      renderText("登录名称必须为4到12位的数字或字母组合!");
    } else if (!getPara("phone").matches("\\d{11}")) {
      renderText("联系电话必须为11位数字!");
    } else if (!IDNumber.availableIDNumber(getPara("number"))){
      renderText("证件号码错误，请核实！");
    }else {
      User user = new User();
      user.set("name", getPara("name").trim())
              .set("number", getPara("number").trim())
              .set("phone", getPara("phone").trim())
              .set("login", getPara("login").trim())
              .set("did", getPara("did").trim())
              .set("state", getPara("state").trim())
              .set("pass", encodeMD5String(getPara("number").substring(getPara("number").length()-8,getPara("number").length()).trim()))
              .set("other", getPara("other").trim());
      if (user.save()) {
        renderText("OK");
      } else {
        renderText("发生未知错误，请检查数据库！");
      }
    }
  }
  /**
   * 修改用户
   */
  public void edit(){
    User user = User.dao.findById(getPara("id"));
    if (user == null) {
      renderText("要修改的用户不存在，请刷新页面后再试！");
    } else {
      if (user.get("name").equals(getPara("name").trim())
              && user.get("other").equals(getPara("other").trim())
              && user.get("number").equals(getPara("number").trim())
              && user.get("phone").equals(getPara("phone").trim())
              && user.get("login").equals(getPara("login").trim())
              && user.get("did").toString().equals(getPara("did").trim())
              ) {
        renderText("未找到修改内容，请核实后再修改！");
      } else if (!user.get("number").equals(getPara("number"))
              && User.dao.find("select * from user where number=?", getPara("number")).size() > 0
              ){
        renderText("该证件号码已绑定为其他工作人员，请重新修改！");
      } else if (!getPara("name").matches("[\u4e00-\u9fa5]+")) {
        renderText("用户真实姓名必须为汉字!");
      } else if (getPara("name").length()<2) {
        renderText("用户名称必须为两个以上汉字，请核实!");
      } else if (!getPara("login").matches("[a-zA-Z0-9]{4,12}")) {
        renderText("登录名称必须为4到12位的数字或字母组合!");
      } else if (!getPara("phone").matches("\\d{11}")) {
        renderText("联系电话必须为11位数字!");
      } else if (!IDNumber.availableIDNumber(getPara("number"))){
        renderText("证件号码错误，请核实！");
      } else {
        if (user
                .set("name",getPara("name").trim())
                .set("number",getPara("number").trim())
                .set("phone",getPara("phone").trim())
                .set("login",getPara("login").trim())
                .set("did",getPara("did").trim())
                .set("other",getPara("other").trim())
                .update()) {
          renderText("OK");
        } else{
          renderText("发生未知错误，请检查数据库！");
        }
      }
    }
  }
  /**
   * 注销用户
   */
  public void abandon(){
    User user = User.dao.findById(getPara("id"));
    if (user == null) {
      renderText("要注销的用户不存在，请刷新页面后再试！");
    }else if (user.get("state").equals("注销")){
      renderText("该用户已注销！");
    }else{
      if (User.dao.findById(getPara("id")).set("state", "注销").update()){
        renderText("OK");
      } else {
        renderText("发生未知错误，请检查数据库！");
      }
    }
  }
  /**
   * 激活用户
   */
  public void active(){
    User user = User.dao.findById(getPara("id"));
    if (user == null) {
      renderText("要激活的用户不存在，请刷新页面后再试！");
    }else if (user.get("state").equals("激活")){
      renderText("该用户已激活！");
    }else{
      if (user.set("state", "激活").update()){
        renderText("OK");
      } else {
        renderText("发生未知错误，请检查数据库！");
      }
    }
  }
  /**
   * 删除用户
   */
  public void delete(){
    User user = User.dao.findById(getPara("id"));
    if (user == null) {
      renderText("要删除的用户不存在，请刷新页面后再试！");
    }else if (user.get("state").equals("删除")){
      renderText("该用户已删除！");
    }else{
      if (user.set("state", "删除").update()){
        renderText("OK");
      } else {
        renderText("发生未知错误，请检查数据库！");
      }
    }
  }
  /**
   * 重置密码
   */
  public void reset(){
    User user = User.dao.findById(getPara("id"));
    if (user == null) {
      renderText("要重置的用户不存在，请刷新页面后再试！");
    }else if(!IDNumber.availableIDNumber(getPara("number"))){
      renderText("要重置的用户证件号码有误，请修改证件号码后再试！");
    } else {
      if (user.set("pass", encodeMD5String(user.get("number").toString().substring(user.get("number").toString().length()-8,user.get("number").toString().length()).trim())).update()){
        renderText("OK");
      } else {
        renderText("发生未知错误，请检查数据库！");
      }
    }
  }
  /**
   * 检查导出
   *@param: UserName
   *@param: UserDept
   */
  public void download() {
    List<User> users;
    String username,userdept;
    if (getPara("UserName").equals("") || getPara("UserName")==null) {
      username = "";
      setSessionAttr("UserName", "");
    }else{
      username = " name like '%"+getPara("UserName")+"%'";
      setSessionAttr("UserName", getPara("UserName"));
    }
    if (getPara("UserDept").equals("") || getPara("UserDept")==null) {
      userdept = "";
      setSessionAttr("UserDept", "");
    }else{
      userdept = " did = "+getPara("UserDept");
      setSessionAttr("UserDept", getPara("UserDept"));
    }

    if (username.equals("") && userdept.equals("")) {
      users = User.dao.find("select * from user");
    }else if (username.equals("") && !userdept.equals("")) {
      users = User.dao.find("select * from user where" + userdept);
    }else if (!username.equals("") && userdept.equals("")) {
      users = User.dao.find("select * from user where" + username);
    }else{
      users = User.dao.find("select * from user where" + username + " and " + userdept);
    }
    if (users.size()>100) {
      setSessionAttr("UserName", "");
      setSessionAttr("UserDept", "");
      renderText("导出数据数量超过上限！");
    }else{
      renderText("OK");
    }
  }
  /**
   * 导出
   */
  public void export() throws IOException {
    String[] title={"序号","姓名","证件号码","联系电话","登录名称","所属部门","状态","备注"};
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
    List<User> u;
    if (getSessionAttr("UserName").equals("") && getSessionAttr("UserDept").equals("")) {
      u = User.dao.find("select user.*,department.name as dname from user inner join department on user.did=department.id");
    }else if (!getSessionAttr("UserName").equals("") && getSessionAttr("UserDept").equals("")) {
      u = User.dao.find("select user.*,department.name as dname from user inner join department on user.did=department.id where user.name like '%"+getSessionAttr("UserName")+"%'");
    }else if(getSessionAttr("UserName").equals("") && !getSessionAttr("UserDept").equals("")){
      u = User.dao.find("select user.*,department.name as dname from user inner join department on user.did=department.id where user.did = "+getSessionAttr("UserDept"));
    }else {
      u = User.dao.find("select user.*,department.name as dname from user inner join department on user.did=department.id where user.name like '%"+getSessionAttr("UserName")+"%' and user.did = "+getSessionAttr("UserDept"));
    }
    for (int i = 0; i < u.size(); i++) {
      XSSFRow nextRow = sheet.createRow(i+1);
      XSSFCell cell2 = nextRow.createCell(0);
      cell2.setCellValue(u.get(i).get("id").toString());
      cell2 = nextRow.createCell(1);
      cell2.setCellValue(u.get(i).get("name").toString());
      cell2 = nextRow.createCell(2);
      cell2.setCellValue(u.get(i).get("number").toString());
      cell2 = nextRow.createCell(3);
      cell2.setCellValue(u.get(i).get("phone").toString());
      cell2 = nextRow.createCell(4);
      cell2.setCellValue(u.get(i).get("login").toString());
      cell2 = nextRow.createCell(5);
      cell2.setCellValue(u.get(i).get("dname").toString());
      cell2 = nextRow.createCell(6);
      cell2.setCellValue(u.get(i).get("state").toString());
      cell2 = nextRow.createCell(7);
      if (u.get(i).get("other") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(u.get(i).get("other").toString());
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
  /**
   * 修改密码
   *@param: did
   */
  public void pass() {
    User u = (User) getSessionAttr("user");
    if (!u.getStr("pass").equals(encodeMD5String(getPara("passBefore")))) {
      renderText("输入的原密码错误！");
    } else if (!getPara("passAfter1").equals(getPara("passAfter2"))) {
      renderText("两次输入的新密码不一致！");
    } else if (!getPara("passAfter1").trim().matches("[a-zA-Z0-9]{6,12}")) {
      renderText("新密码必须为6到12位的数字或字母组合!");
    } else {
      if (u.set("pass", encodeMD5String(getPara("passAfter1").trim())).update()) {
        renderText("OK");
      } else {
        renderText("发生未知错误，请检查数据库！");
      }
    }
  }
}