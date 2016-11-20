package com.wts.controller;

// import com.google.gson.Gson;
import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.tx.Tx;
import com.wts.entity.model.Department;
import com.wts.interceptor.LoginInterceptor;
import com.wts.util.Util;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

public class DepartmentController extends Controller {
  /**
   * 查询部门
   *@param: PageNumber
   *@param: PageSize
   *@param: QueryString
   */
  @Before(LoginInterceptor.class)
  public void query() {
    Page<Department> departments=Department.dao.paginate2(getParaToInt("PageNumber"),getParaToInt("PageSize"),getPara("DeptName"));
    renderJson(departments.getList());
  }
  /**
   * 查询部门数量
   *@param: DeptName
   */
  @Before(LoginInterceptor.class)
  public void count() {
    String count = Db.queryLong("select count(*) from department where name like '%"+ getPara("DeptName") +"%' and state<>'删除' ").toString();
    renderText(count);
  }
  /**
   * 查询部门列表
   */
  @Before(LoginInterceptor.class)
  public void list() {
    List<Department> departments = Department.dao.find(
            "SELECT * FROM department ORDER BY id DESC");
    int count=Integer.parseInt(Db.queryLong("select count(*) from department where state<>'删除'").toString());
    String[][] DeptList=new String[count][2];
    for (int j=0;j<count;j++){
      DeptList[j][0]=departments.get(j).get("id").toString();
      DeptList[j][1]=departments.get(j).get("name").toString();
    }
//    Gson gson = new Gson();
//    String jsonStr = gson.toJson(DeptList);
//    System.out.println(jsonStr);
    renderJson(DeptList);
  }
  /**
   * 核查部门名称
   *@param: name
   */
  @Before(LoginInterceptor.class)
  public void name() {
    List<Department> departments = Department.dao.find(
            "select * from department where name=?", getPara("name"));
    if (!getPara("name").matches("[\u4e00-\u9fa5]+")) {
      renderText("部门名称必须为汉字!");
    } else if (getPara("name").length() < 3) {
      renderText("部门名称必须超过3个汉字!");
    } else if (departments.size() != 0) {
      renderText("该部门名称数据库中已存在，请使用其他名称!");
    } else {
      renderText("OK");
    }
  }
  /**
   * 核查部门名称
   *@param: names
   */
  @Before(LoginInterceptor.class)
  public void names() {
    if (!getPara("name").matches("[\u4e00-\u9fa5]+")) {
      renderText("部门名称必须为汉字!");
    } else if (getPara("name").length() < 3) {
      renderText("部门名称必须超过3个汉字!");
    } else {
      renderText("OK");
    }
  }
  /**
   * 核查部门编号
   *@param: number
   */
  @Before(LoginInterceptor.class)
  public void number() {
    List<Department> departments = Department.dao.find(
            "select * from department where number=?", getPara("number"));
    if (getPara("number").matches("[\u4e00-\u9fa5]+")) {
      renderText("部门编号必须为数字或字母的组合");
    } else if (getPara("number").length() != 3) {
      renderText("部门编号必须为3个字符!");
    } else if (departments.size() != 0) {
      renderText("该部门编号数据库中已存在，请使用其他编号!");
    } else {
      renderText("OK");
    }
  }
  /**
   * 核查部门编号
   *@param: numbers
   */
  @Before(LoginInterceptor.class)
  public void numbers() {
    if (getPara("number").matches("[\u4e00-\u9fa5]+")) {
      renderText("部门编号必须为数字或字母的组合");
    } else if (getPara("number").length() != 3) {
      renderText("部门编号必须为3个字符!");
    } else {
      renderText("OK");
    }
  }
  /**
   * 核查部门电话
   */
  @Before(LoginInterceptor.class)
  public void phone() {
    if (!getPara("phone").matches("\\d{8}")) {
      renderText("部门电话必须为8位数字!");
    } else {
      renderText("OK");
    }
  }
  /**
   * 核查部门地址
   */
  @Before(LoginInterceptor.class)
  public void address() {
    if (getPara("address").length() < 3) {
      renderText("部门地址必须超过3个字符!");
    } else {
      renderText("OK");
    }
  }
  /**
   * 核查部门邮编
   */
  @Before(LoginInterceptor.class)
  public void code() {
    if (!getPara("code").matches("\\d{6}")) {
      renderText("邮政编码必须为6位数字!");
    } else {
      renderText("OK");
    }
  }
  /**
   * 新增部门
   */
  @Before({Tx.class,LoginInterceptor.class})
  public void add() {
    List<Department> departments = Department.dao.find(
            "select * from department where name=?", getPara("name"));
    List<Department> departmentz = Department.dao.find(
            "select * from department where number=?", getPara("number"));
    if (!getPara("name").matches("[\u4e00-\u9fa5]+")) {
      renderText("部门名称必须为汉字!");
    } else if (getPara("name").length() < 3) {
      renderText("部门名称必须超过3个汉字!");
    } else if (departments.size() != 0) {
      renderText("该部门名称数据库中已存在，请使用其他名称!");
    } else if (!getPara("phone").matches("\\d{8}")) {
      renderText("部门电话必须为8位数字!");
    } else if (!getPara("code").matches("\\d{6}")) {
      renderText("邮政编码必须为6位数字!");
    } else if (getPara("address").length() < 3) {
      renderText("部门地址必须超过3个字符!");
    } else if (getPara("number").matches("[\u4e00-\u9fa5]+")) {
      renderText("部门编号必须为数字或字母的组合!");
    } else if (getPara("number").length() != 3) {
      renderText("部门编号必须为3个字符!");
    } else if (departmentz.size() != 0) {
      renderText("该部门编号数据库中已存在，请使用其他编号!");
    } else {
      Department department = new Department();
      department.set("name", getPara("name").trim())
              .set("phone", getPara("phone").trim())
              .set("address", getPara("address").trim())
              .set("code", getPara("code").trim())
              .set("state", getPara("state").trim())
              .set("number", getPara("number").trim())
              .set("other", getPara("other").trim());
      if (department.save()) {
        renderText("OK");
      } else {
        renderText("发生未知错误，请检查数据库！");
      }
    }
  }
  /**
   * 注销部门
   */
  @Before({Tx.class,LoginInterceptor.class})
  public void abandon(){
    Department department = Department.dao.findById(getPara("id"));
    if (department == null) {
      renderText("要注销的部门不存在，请刷新页面后再试！");
    }else if (Util.CheckNull(department.getStr("state")).equals("注销")){
      renderText("该部门已注销！");
    }else{
      if (Department.dao.findById(getPara("id")).set("state", "注销").update()){
        renderText("OK");
      } else {
        renderText("发生未知错误，请检查数据库！");
      }
    }
  }
  /**
   * 激活部门
   */
  @Before({Tx.class,LoginInterceptor.class})
  public void active(){
    Department department = Department.dao.findById(getPara("id"));
    if (department == null) {
      renderText("要激活的部门不存在，请刷新页面后再试！");
    }else if (Util.CheckNull(department.getStr("state")).equals("激活")){
      renderText("该部门已激活！");
    }else{
      if (department.set("state", "激活").update()){
        renderText("OK");
      } else {
        renderText("发生未知错误，请检查数据库！");
      }
    }
  }
  /**
   * 删除部门
   */
  @Before({Tx.class,LoginInterceptor.class})
  public void delete(){
    Department department = Department.dao.findById(getPara("id"));
    if (department == null) {
      renderText("要删除的部门不存在，请刷新页面后再试！");
    }else if (Util.CheckNull(department.getStr("state")).equals("删除")){
      renderText("该部门已删除！");
    }else{
      if (department.set("state", "删除").update()){
        renderText("OK");
      } else {
        renderText("发生未知错误，请检查数据库！");
      }
    }
  }
  /**
   * 修改部门
   */
  @Before({Tx.class,LoginInterceptor.class})
  public void edit(){
    Department department = Department.dao.findById(getPara("id"));

    if (department == null) {
      renderText("要修改的部门不存在，请刷新页面后再试！");
    } else {
      if (Util.CheckNull(department.getStr("name")).equals(getPara("name"))
              && Util.CheckNull(department.getStr("phone")).equals(getPara("phone"))
              && Util.CheckNull(department.getStr("address")).equals(getPara("address"))
              && Util.CheckNull(department.getStr("code")).equals(getPara("code"))
              && Util.CheckNull(department.getStr("other")).equals(getPara("other"))
              && Util.CheckNull(department.getStr("number")).equals(getPara("number"))
              ) {
        renderText("未找到修改内容，请核实后再修改！");
      } else if (!Util.CheckNull(department.getStr("name")).equals(getPara("name"))
              && Department.dao.find("select * from department where name=?", getPara("name")).size() > 0
              ){
        renderText("该部门名称已存在，请重新修改！");
      }else if (!getPara("name").matches("[\u4e00-\u9fa5]+")) {
        renderText("部门名称必须为汉字!");
      } else if (getPara("name").length() < 3) {
        renderText("部门名称必须超过3个汉字!");
      } else if (!getPara("phone").matches("\\d{8}")) {
        renderText("部门电话必须为8位数字!");
      } else if (!getPara("code").matches("\\d{6}")) {
        renderText("邮政编码必须为6位数字!");
      } else if (getPara("address").length() < 3) {
        renderText("部门地址必须超过3个字符!");
      } else if (getPara("number").matches("[\u4e00-\u9fa5]+")) {
        renderText("部门编号必须为数字或字母的组合!");
      } else if (getPara("number").length() != 3) {
        renderText("部门编号必须为3个字符!");
      } else if (!Util.CheckNull(department.getStr("number")).equals(getPara("number"))
              && Department.dao.find("select * from department where number=?", getPara("number")).size() > 0) {
        renderText("该部门编号数据库中已存在，请使用其他编号!");
      } else {
        if (department
                .set("name",getPara("name").trim())
                .set("phone",getPara("phone").trim())
                .set("address",getPara("address").trim())
                .set("code",getPara("code").trim())
                .set("other",Util.CheckNull(getPara("other").trim()))
                .set("number",getPara("number").trim())
                .update()) {
          renderText("OK");
        } else{
          renderText("发生未知错误，请检查数据库！");
        }
      }
    }
  }
  /**
   * 检查导出
   *@param: DeptName
   */
  @Before(LoginInterceptor.class)
  public void download() {
    List<Department> departments;
    if (getPara("DeptName").equals("") || getPara("DeptName")==null){
      departments= Department.dao.find("select * from department");
    }else{
      departments= Department.dao.find("select * from department where name like '%"+getPara("DeptName")+"%'");
    }
    if (departments.size()>100000) {
      setSessionAttr("Dept", "");
      renderText("导出数据数量超过10万，请从后台操作！");
    }else{
      if(getPara("DeptName")==null){
        setSessionAttr("Dept", "");
      }else {
        setSessionAttr("Dept", getPara("DeptName"));
      }
      renderText("OK");
    }
  }
  /**
   * 导出
   */
  @Before({Tx.class,LoginInterceptor.class})
  public void export() throws IOException {
    String[] title={"序号","部门名称","部门编号","联系电话","联系地址","邮政编码","状态","备注"};
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
//    Export e =new Export();
//    e.set("time", new Date())
//            .set("uid",null)
//            .set("type","部门导出")
//            .set("sql","select * from department where name like '%"+getSessionAttr("Dept")+"%'")
//            .save();
    List<Department> d= Department.dao.find("select * from department where name like '%"+getSessionAttr("Dept")+"%'");
    for (int i = 0; i < d.size(); i++) {
      XSSFRow nextRow = sheet.createRow(i+1);
      XSSFCell cell2 = nextRow.createCell(0);
      if (d.get(i).get("id") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(d.get(i).get("id").toString());
      }
      cell2 = nextRow.createCell(1);
      if (d.get(i).get("name") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(d.get(i).get("name").toString());
      }
      cell2 = nextRow.createCell(2);
      if (d.get(i).get("number") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(d.get(i).get("number").toString());
      }
      cell2 = nextRow.createCell(3);
      if (d.get(i).get("phone") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(d.get(i).get("phone").toString());
      }
      cell2 = nextRow.createCell(4);
      if (d.get(i).get("address") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(d.get(i).get("address").toString());
      }
      cell2 = nextRow.createCell(5);
      if (d.get(i).get("code") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(d.get(i).get("code").toString());
      }
      cell2 = nextRow.createCell(6);
      cell2.setCellValue(d.get(i).get("state").toString());

      cell2 = nextRow.createCell(7);
      if (d.get(i).get("other") == null) {
        cell2.setCellValue("");
      } else {
        cell2.setCellValue(d.get(i).get("other").toString());
      }
    }

    HttpServletResponse response = getResponse();
    response.setContentType("application/octet-stream");
    response.setHeader("Content-Disposition", "attachment;filename=DepartmentExport.xlsx");
    OutputStream out = response.getOutputStream();
    workbook.write(out);
    out.flush();
    out.close();
    workbook.close();
    renderNull() ;
  }

}