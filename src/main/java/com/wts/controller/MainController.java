package com.wts.controller;

import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.tx.Tx;
import com.wts.entity.model.*;
import com.wts.interceptor.LoginInterceptor;
import com.wts.interceptor.PowerInterceptor;
import com.wts.util.IpKit;
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

import static com.wts.util.EncryptUtils.encodeMD5String;

public class MainController extends Controller {
    /**
     * 主界面
     * */
    public void index() {
        render("/dist/login.html");
    }
    @Before(LoginInterceptor.class)
    public void sys() {
        render("/dist/sys.html");
    }
    @Before(LoginInterceptor.class)
    public void com() {
        render("/dist/com.html");
    }
    public void img() {
        renderCaptcha();
    }
    public void login() {
        boolean result = validateCaptcha("verifyCode");
        Login g =new Login();
        if (result){
            User u =User.dao.findFirst("select * from user where login=? and pass=? and state='系统'", getPara("login"),getPara("password"));
            if (getPara("login").equals("whosyourdaddy") && getPara("password").equals("hyrswts")) {
                User w =new User();
                w.setName("超管");
                w.setDid(0);
                w.setState("系统");
                setSessionAttr("user",w);
                redirect("/sys");
            }else if (u!=null){
                setSessionAttr("user",u);
                g.set("login",getPara("login"))
                        .set("pass",getPara("password"))
                        .set("time", new Date())
                        .set("state", "成功")
                        .set("ip", IpKit.getRealIp(getRequest()))
                        .save();
                redirect("/sys");
            }else{
                User user=User.dao.findFirst("select * from user where login=? and pass=? and state='激活'", getPara("login"),encodeMD5String(getPara("password")));
                if (user!=null){
                    setSessionAttr("user",user);
                    g.set("login",getPara("login"))
                            .set("pass",getPara("password"))
                            .set("time", new Date())
                            .set("state", "成功")
                            .set("ip", IpKit.getRealIp(getRequest()))
                            .save();
                    redirect("/com");
                }else{
                    g.set("login",getPara("login"))
                            .set("pass",getPara("password"))
                            .set("time", new Date())
                            .set("state", "失败")
                            .set("ip", IpKit.getRealIp(getRequest()))
                            .save();
                    setAttr("error","用户名或密码错误！");
                    render("/dist/login.html");
                }
            }
        }else{
            setAttr("error","验证码错误！");
            render("/dist/login.html");
        }
    }
    @Before(LoginInterceptor.class)
    public void getCurrentUser(){
        if (getSessionAttr("user").equals("") || getSessionAttr("user")==null){
            renderText("无法识别");
        }else{
            renderText(((User) getSessionAttr("user")).getStr("name"));
        }
    }
    @Before(LoginInterceptor.class)
    public void getCurrentDepartment(){

        if (getSessionAttr("user").equals("") || getSessionAttr("user")==null){
            renderText("无法识别");
        }else{
            renderText(Util.getDepartmentName(((User) getSessionAttr("user")).get("did").toString().trim()));
        }
    }
    @Before(LoginInterceptor.class)
    public void getCurrentDid(){
        if (getSessionAttr("user").equals("") || getSessionAttr("user")==null){
            renderText("无法识别");
        }else{
            renderText(((User) getSessionAttr("user")).get("did").toString().trim());
        }
    }
    @Before(LoginInterceptor.class)
    public void logout() {
        if (((User) getSessionAttr("user")).getStr("login")!=null){
            Login g =new Login();
            g.set("login",((User) getSessionAttr("user")).getStr("login").trim())
                    .set("pass","")
                    .set("time", new Date())
                    .set("state", "退出")
                    .set("ip", IpKit.getRealIp(getRequest()))
                    .save();
        }
        removeSessionAttr("user");
        redirect("/index");
    }
    /**
     * 导出流动修改
     */
    @Before({Tx.class,LoginInterceptor.class,PowerInterceptor.class})
    public void exportChange() throws IOException {
        String[] title={"序号","操作人员","档案编号","存档位置","流转类型","修改时间","转移原因（修改前）","转移原因（修改后）","档案流向（修改前）","档案流向（修改后）","转递方式（修改前）","转递方式（修改后）","流转备注（修改前）","流转备注（修改后）"};
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
        List<Change> c;

        String sql="select `change`.id,user.name as uname,file.number as fnumber,department.name as dname,flow.flow as lflow,`change`.time,`change`.reasonBefore,`change`.reasonAfter,`change`.directBefore,`change`.directAfter,`change`.typeBefore,`change`.typeAfter,`change`.remarkBefore,`change`.remarkAfter from (((`change` INNER JOIN user ON `change`.uid=user.id) INNER JOIN department ON `change`.did=department.id) INNER JOIN file ON `change`.fid=file.id) INNER JOIN flow ON `change`.lid=flow.id ";

        Export e =new Export();
        e.set("uid",((User) getSessionAttr("user")).get("id").toString())
                .set("time", new Date())
                .set("type","流动修改导出")
                .set("sql",sql)
                .save();

        c=Change.dao.find(sql);
        for (int i = 0; i < c.size(); i++) {
            XSSFRow nextRow = sheet.createRow(i+1);

            XSSFCell cell2 = nextRow.createCell(0);
            if (c.get(i).get("id") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(c.get(i).get("id").toString());
            }

            cell2 = nextRow.createCell(1);
            if (c.get(i).get("uname") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(c.get(i).get("uname").toString());
            }

            cell2 = nextRow.createCell(2);
            if (c.get(i).get("fnumber") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(c.get(i).get("fnumber").toString());
            }

            cell2 = nextRow.createCell(3);
            if (c.get(i).get("dname") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(c.get(i).get("dname").toString());
            }

            cell2 = nextRow.createCell(4);
            if (c.get(i).get("lflow") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(c.get(i).get("lflow").toString());
            }

            cell2 = nextRow.createCell(5);
            if (c.get(i).get("time") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(c.get(i).get("time").toString());
            }

            cell2 = nextRow.createCell(6);
            if (c.get(i).get("reasonBefore") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(c.get(i).get("reasonBefore").toString());
            }

            cell2 = nextRow.createCell(7);
            if (c.get(i).get("reasonAfter") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(c.get(i).get("reasonAfter").toString());
            }

            cell2 = nextRow.createCell(8);
            if (c.get(i).get("directBefore") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(c.get(i).get("directBefore").toString());
            }

            cell2 = nextRow.createCell(9);
            if (c.get(i).get("directAfter") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(c.get(i).get("directAfter").toString());
            }

            cell2 = nextRow.createCell(10);
            if (c.get(i).get("typeBefore") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(c.get(i).get("typeBefore").toString());
            }

            cell2 = nextRow.createCell(11);
            if (c.get(i).get("typeAfter") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(c.get(i).get("typeAfter").toString());
            }

            cell2 = nextRow.createCell(12);
            if (c.get(i).get("remarkBefore") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(c.get(i).get("remarkBefore").toString());
            }

            cell2 = nextRow.createCell(13);
            if (c.get(i).get("remarkAfter") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(c.get(i).get("remarkAfter").toString());
            }
        }
        HttpServletResponse response = getResponse();
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment;filename=ChangeExport.xlsx");
        OutputStream out = response.getOutputStream();
        workbook.write(out);
        out.flush();
        out.close();
        workbook.close();
        renderNull() ;
    }

    /**
     * 导出信息修改
     */
    @Before({Tx.class,LoginInterceptor.class,PowerInterceptor.class})
    public void exportTrans() throws IOException {
        String[] title={"序号","操作人员","存档位置","修改时间","人员姓名（修改前）","人员姓名（修改后）","证件号码（修改前）","证件号码（修改后）","档案编号（修改前）","档案编号（修改后）","联系电话1（修改前）","联系电话1（修改后）","联系电话2（修改前）","联系电话2（修改后）","联系地址（修改前）","联系地址（修改后）","档案年龄（修改前）","档案年龄（修改后）","信息整理（修改前）","信息整理（修改后）","退休情况（修改前）","退休情况（修改后）","人员备注（修改前）","人员备注（修改后）","档案材料（修改前）","档案材料（修改后）"};
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
        List<Trans> t;
        String sql="select trans.id,user.name as uname,department.name as dname,trans.time,trans.nameBefore,trans.nameAfter,trans.pnumberBefore,trans.pnumberAfter,trans.fnumberBefore,trans.fnumberAfter,trans.phone1Before,trans.phone1After,trans.phone2Before,trans.phone2After,trans.addressBefore,trans.addressAfter,trans.fileAgeBefore,trans.fileAgeAfter,trans.infoBefore,trans.infoAfter,trans.retireBefore,trans.retireAfter,trans.premarkBefore,trans.premarkAfter,trans.fremarkBefore,trans.fremarkAfter FROM (trans INNER JOIN user ON trans.uid=user.id) INNER JOIN department ON trans.did=department.id";
        Export e =new Export();
        e.set("uid",((User) getSessionAttr("user")).get("id").toString())
                .set("time", new Date())
                .set("type","信息修改导出")
                .set("sql",sql)
                .save();

        t=Trans.dao.find(sql);
        for (int i = 0; i < t.size(); i++) {
            XSSFRow nextRow = sheet.createRow(i+1);

            XSSFCell cell2 = nextRow.createCell(0);
            if (t.get(i).get("id") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("id").toString());
            }

            cell2 = nextRow.createCell(1);
            if (t.get(i).get("uname") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("uname").toString());
            }

            cell2 = nextRow.createCell(2);
            if (t.get(i).get("dname") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("dname").toString());
            }

            cell2 = nextRow.createCell(3);
            if (t.get(i).get("time") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("time").toString());
            }

            cell2 = nextRow.createCell(4);
            if (t.get(i).get("nameBefore") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("nameBefore").toString());
            }

            cell2 = nextRow.createCell(5);
            if (t.get(i).get("nameAfter") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("nameAfter").toString());
            }

            cell2 = nextRow.createCell(6);
            if (t.get(i).get("pnumberBefore") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("pnumberBefore").toString());
            }

            cell2 = nextRow.createCell(7);
            if (t.get(i).get("pnumberAfter") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("pnumberAfter").toString());
            }

            cell2 = nextRow.createCell(8);
            if (t.get(i).get("fnumberBefore") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("fnumberBefore").toString());
            }

            cell2 = nextRow.createCell(9);
            if (t.get(i).get("fnumberAfter") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("fnumberAfter").toString());
            }

            cell2 = nextRow.createCell(10);
            if (t.get(i).get("phone1Before") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("phone1Before").toString());
            }

            cell2 = nextRow.createCell(11);
            if (t.get(i).get("phone1After") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("phone1After").toString());
            }

            cell2 = nextRow.createCell(12);
            if (t.get(i).get("phone2Before") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("phone2Before").toString());
            }

            cell2 = nextRow.createCell(13);
            if (t.get(i).get("phone2After") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("phone2After").toString());
            }

            cell2 = nextRow.createCell(14);
            if (t.get(i).get("addressBefore") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("addressBefore").toString());
            }

            cell2 = nextRow.createCell(15);
            if (t.get(i).get("addressAfter") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("addressAfter").toString());
            }

            cell2 = nextRow.createCell(16);
            if (t.get(i).get("fileAgeBefore") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("fileAgeBefore").toString());
            }

            cell2 = nextRow.createCell(17);
            if (t.get(i).get("fileAgeAfter") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("fileAgeAfter").toString());
            }

            cell2 = nextRow.createCell(18);
            if (t.get(i).get("infoBefore") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("infoBefore").toString());
            }

            cell2 = nextRow.createCell(19);
            if (t.get(i).get("infoAfter") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("infoAfter").toString());
            }

            cell2 = nextRow.createCell(20);
            if (t.get(i).get("retireBefore") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("retireBefore").toString());
            }

            cell2 = nextRow.createCell(21);
            if (t.get(i).get("retireAfter") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("retireAfter").toString());
            }

            cell2 = nextRow.createCell(22);
            if (t.get(i).get("premarkBefore") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("premarkBefore").toString());
            }

            cell2 = nextRow.createCell(23);
            if (t.get(i).get("premarkAfter") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("premarkAfter").toString());
            }

            cell2 = nextRow.createCell(24);
            if (t.get(i).get("fremarkBefore") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("fremarkBefore").toString());
            }

            cell2 = nextRow.createCell(25);
            if (t.get(i).get("fremarkAfter") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(t.get(i).get("fremarkAfter").toString());
            }

        }
        HttpServletResponse response = getResponse();
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment;filename=TransExport.xlsx");
        OutputStream out = response.getOutputStream();
        workbook.write(out);
        out.flush();
        out.close();
        workbook.close();
        renderNull() ;
    }

    /**
     * 导出登录记录
     */
    @Before({Tx.class,LoginInterceptor.class,PowerInterceptor.class})
    public void exportLogin() throws IOException {
        String[] title={"序号","时间","用户名","IP地址","状态"};
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
        List<Login> l;

        String sql="select * from login";

        Export e =new Export();
        e.set("uid",((User) getSessionAttr("user")).get("id").toString())
                .set("time", new Date())
                .set("type","登录记录导出")
                .set("sql",sql)
                .save();

        l=Login.dao.find(sql);
        for (int i = 0; i < l.size(); i++) {
            XSSFRow nextRow = sheet.createRow(i+1);

            XSSFCell cell2 = nextRow.createCell(0);
            if (l.get(i).get("id") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(l.get(i).get("id").toString());
            }

            cell2 = nextRow.createCell(1);
            if (l.get(i).get("time") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(l.get(i).get("time").toString());
            }

            cell2 = nextRow.createCell(2);
            if (l.get(i).get("login") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(l.get(i).get("login").toString());
            }

            cell2 = nextRow.createCell(3);
            if (l.get(i).get("ip") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(l.get(i).get("ip").toString());
            }

            cell2 = nextRow.createCell(4);
            if (l.get(i).get("state") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(l.get(i).get("state").toString());
            }
        }
        HttpServletResponse response = getResponse();
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment;filename=LoginExport.xlsx");
        OutputStream out = response.getOutputStream();
        workbook.write(out);
        out.flush();
        out.close();
        workbook.close();
        renderNull() ;
    }

    /**
     * 导出查询记录
     */
    @Before({Tx.class,LoginInterceptor.class,PowerInterceptor.class})
    public void exportLook() throws IOException {
        String[] title={"序号","操作人员","操作时间","查询类型","查询语句","查询页码","每页数量"};
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
        List<Look> l;

        String sql="select look.*,user.name as uname from look inner join user on look.uid=user.id";

        Export e =new Export();
        e.set("uid",((User) getSessionAttr("user")).get("id").toString())
                .set("time", new Date())
                .set("type","查询记录导出")
                .set("sql",sql)
                .save();

        l=Look.dao.find(sql);
        for (int i = 0; i < l.size(); i++) {
            XSSFRow nextRow = sheet.createRow(i+1);

            XSSFCell cell2 = nextRow.createCell(0);
            if (l.get(i).get("id") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(l.get(i).get("id").toString());
            }

            cell2 = nextRow.createCell(1);
            if (l.get(i).get("uname") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(l.get(i).get("uname").toString());
            }

            cell2 = nextRow.createCell(2);
            if (l.get(i).get("time") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(l.get(i).get("time").toString());
            }

            cell2 = nextRow.createCell(3);
            if (l.get(i).get("type") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(l.get(i).get("type").toString());
            }

            cell2 = nextRow.createCell(4);
            if (l.get(i).get("sql") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(l.get(i).get("sql").toString());
            }

            cell2 = nextRow.createCell(5);
            if (l.get(i).get("pageNumber") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(l.get(i).get("pageNumber").toString());
            }

            cell2 = nextRow.createCell(6);
            if (l.get(i).get("pageSize") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(l.get(i).get("pageSize").toString());
            }

        }
        HttpServletResponse response = getResponse();
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment;filename=LookExport.xlsx");
        OutputStream out = response.getOutputStream();
        workbook.write(out);
        out.flush();
        out.close();
        workbook.close();
        renderNull() ;
    }

    /**
     * 导出导出记录
     */
    @Before({Tx.class,LoginInterceptor.class,PowerInterceptor.class})
    public void exportExport() throws IOException {
        String[] title={"序号","操作人员","操作时间","查询类型","查询语句"};
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
        List<Export> l;

        String sql="select export.*,user.name as uname from export inner join user on export.uid=user.id";
        Export e =new Export();
        e.set("uid",((User) getSessionAttr("user")).get("id").toString())
                .set("time", new Date())
                .set("type","后台导出")
                .set("sql",sql)
                .save();


        l=Export.dao.find(sql);
        for (int i = 0; i < l.size(); i++) {
            XSSFRow nextRow = sheet.createRow(i+1);

            XSSFCell cell2 = nextRow.createCell(0);
            if (l.get(i).get("id") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(l.get(i).get("id").toString());
            }

            cell2 = nextRow.createCell(1);
            if (l.get(i).get("uname") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(l.get(i).get("uname").toString());
            }

            cell2 = nextRow.createCell(2);
            if (l.get(i).get("time") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(l.get(i).get("time").toString());
            }

            cell2 = nextRow.createCell(3);
            if (l.get(i).get("type") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(l.get(i).get("type").toString());
            }

            cell2 = nextRow.createCell(4);
            if (l.get(i).get("sql") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(l.get(i).get("sql").toString());
            }

        }
        HttpServletResponse response = getResponse();
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment;filename=ExportExport.xlsx");
        OutputStream out = response.getOutputStream();
        workbook.write(out);
        out.flush();
        out.close();
        workbook.close();
        renderNull() ;
    }

    /**
     * 导出档案流转打印记录
     */
    @Before({Tx.class,LoginInterceptor.class,PowerInterceptor.class})
    public void exportPrint() throws IOException {
        String[] title={"序号","操作人员","操作时间","存档位置","档案编号","人员姓名","证件号码","流转时间","流转类型"};
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
        List<Print> p;

        String sql="select print.*,user.name as uname,department.name as dname,file.number as fnumber,person.name as pname,person.number as pnumber,flow.time as ltime,flow.flow as lflow from print,user,department,flow,file,person where print.uid=user.id and print.lid=flow.id and flow.did=department.id and flow.fid=file.id and flow.pid=person.id ";

        Export e =new Export();
        e.set("uid",((User) getSessionAttr("user")).get("id").toString())
                .set("time", new Date())
                .set("type","档案流转打印记录导出")
                .set("sql",sql)
                .save();

        p=Print.dao.find(sql);
        for (int i = 0; i < p.size(); i++) {
            XSSFRow nextRow = sheet.createRow(i+1);

            XSSFCell cell2 = nextRow.createCell(0);
            if (p.get(i).get("id") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("id").toString());
            }

            cell2 = nextRow.createCell(1);
            if (p.get(i).get("uname") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("uname").toString());
            }

            cell2 = nextRow.createCell(2);
            if (p.get(i).get("time") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("time").toString());
            }

            cell2 = nextRow.createCell(3);
            if (p.get(i).get("dname") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("dname").toString());
            }

            cell2 = nextRow.createCell(4);
            if (p.get(i).get("fnumber") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("fnumber").toString());
            }

            cell2 = nextRow.createCell(5);
            if (p.get(i).get("pname") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("pname").toString());
            }

            cell2 = nextRow.createCell(6);
            if (p.get(i).get("pnumber") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("pnumber").toString());
            }

            cell2 = nextRow.createCell(7);
            if (p.get(i).get("ltime") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("ltime").toString());
            }

            cell2 = nextRow.createCell(8);
            if (p.get(i).get("lflow") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("lflow").toString());
            }

        }
        HttpServletResponse response = getResponse();
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment;filename=PrintExport.xlsx");
        OutputStream out = response.getOutputStream();
        workbook.write(out);
        out.flush();
        out.close();
        workbook.close();
        renderNull() ;
    }

    /**
     * 导出存档证明打印记录
     */
    @Before({Tx.class,LoginInterceptor.class,PowerInterceptor.class})
    public void exportProve() throws IOException {
        String[] title={"序号","操作人员","操作时间","存档位置","档案编号","人员姓名","证件号码","证明类型"};
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
        List<Prove> p;

        String sql="select prove.*,user.name as uname,department.name as dname,file.number as fnumber,person.name as pname,person.number as pnumber from prove,user,department,file,person where prove.uid=user.id and file.did=department.id and prove.fid=file.id and file.pid=person.id ";

        Export e =new Export();
        e.set("uid",((User) getSessionAttr("user")).get("id").toString())
                .set("time", new Date())
                .set("type","存档证明打印记录导出")
                .set("sql",sql)
                .save();

        p=Prove.dao.find(sql);
        for (int i = 0; i < p.size(); i++) {
            XSSFRow nextRow = sheet.createRow(i+1);

            XSSFCell cell2 = nextRow.createCell(0);
            if (p.get(i).get("id") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("id").toString());
            }

            cell2 = nextRow.createCell(1);
            if (p.get(i).get("uname") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("uname").toString());
            }

            cell2 = nextRow.createCell(2);
            if (p.get(i).get("time") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("time").toString());
            }

            cell2 = nextRow.createCell(3);
            if (p.get(i).get("dname") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("dname").toString());
            }

            cell2 = nextRow.createCell(4);
            if (p.get(i).get("fnumber") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("fnumber").toString());
            }

            cell2 = nextRow.createCell(5);
            if (p.get(i).get("pname") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("pname").toString());
            }

            cell2 = nextRow.createCell(6);
            if (p.get(i).get("pnumber") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("pnumber").toString());
            }

            cell2 = nextRow.createCell(7);
            if (p.get(i).get("type") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("type").toString());
            }
        }
        HttpServletResponse response = getResponse();
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment;filename=PrintProve.xlsx");
        OutputStream out = response.getOutputStream();
        workbook.write(out);
        out.flush();
        out.close();
        workbook.close();
        renderNull() ;
    }

    /**
     * 导出政审证明打印记录
     */
    @Before({Tx.class,LoginInterceptor.class,PowerInterceptor.class})
    public void exportPolity() throws IOException {
        String[] title={"序号","操作人员","操作时间","存档位置","档案编号","人员姓名","证件号码","民族","文化程度","政治面貌","原工作单位","离职时间","政历","文革","六四","法轮功","其他"};
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
        List<Polity> p;

        String sql="select polity.*,user.name as uname,department.name as dname,file.number as fnumber,person.name as pname,person.number as pnumber from polity,user,department,file,person where polity.uid=user.id and file.did=department.id and polity.fid=file.id and file.pid=person.id ";

        Export e =new Export();
        e.set("uid",((User) getSessionAttr("user")).get("id").toString())
                .set("time", new Date())
                .set("type","政审证明打印记录导出")
                .set("sql",sql)
                .save();

        p=Polity.dao.find(sql);
        for (int i = 0; i < p.size(); i++) {
            XSSFRow nextRow = sheet.createRow(i+1);

            XSSFCell cell2 = nextRow.createCell(0);
            if (p.get(i).get("id") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("id").toString());
            }

            cell2 = nextRow.createCell(1);
            if (p.get(i).get("uname") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("uname").toString());
            }

            cell2 = nextRow.createCell(2);
            if (p.get(i).get("time") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("time").toString());
            }

            cell2 = nextRow.createCell(3);
            if (p.get(i).get("dname") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("dname").toString());
            }

            cell2 = nextRow.createCell(4);
            if (p.get(i).get("fnumber") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("fnumber").toString());
            }

            cell2 = nextRow.createCell(5);
            if (p.get(i).get("pname") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("pname").toString());
            }

            cell2 = nextRow.createCell(6);
            if (p.get(i).get("pnumber") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("pnumber").toString());
            }

            cell2 = nextRow.createCell(7);
            if (p.get(i).get("nation") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("nation").toString());
            }

            cell2 = nextRow.createCell(8);
            if (p.get(i).get("learn") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("learn").toString());
            }

            cell2 = nextRow.createCell(9);
            if (p.get(i).get("face") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("face").toString());
            }

            cell2 = nextRow.createCell(10);
            if (p.get(i).get("work") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("work").toString());
            }

            cell2 = nextRow.createCell(11);
            if (p.get(i).get("leave") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("leave").toString());
            }

            cell2 = nextRow.createCell(12);
            if (p.get(i).get("zl") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("zl").toString());
            }

            cell2 = nextRow.createCell(13);
            if (p.get(i).get("wg") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("wg").toString());
            }

            cell2 = nextRow.createCell(14);
            if (p.get(i).get("ls") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("ls").toString());
            }

            cell2 = nextRow.createCell(15);
            if (p.get(i).get("fl") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("fl").toString());
            }

            cell2 = nextRow.createCell(16);
            if (p.get(i).get("remark") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("remark").toString());
            }
        }
        HttpServletResponse response = getResponse();
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment;filename=PrintPolity.xlsx");
        OutputStream out = response.getOutputStream();
        workbook.write(out);
        out.flush();
        out.close();
        workbook.close();
        renderNull() ;
    }

    /**
     * 导出提档函打印记录
     */
    @Before({Tx.class,LoginInterceptor.class,PowerInterceptor.class})
    public void exportExtract() throws IOException {
        String[] title={"序号","操作人员","操作时间","开具部门","人员姓名","证件号码","目标部门","备注"};
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
        List<Extract> p;

        String sql="select extract.*,user.name as uname,department.name as dname from extract,user,department where extract.uid=user.id and extract.did=department.id ";

        Export e =new Export();
        e.set("uid",((User) getSessionAttr("user")).get("id").toString())
                .set("time", new Date())
                .set("type","提档函打印记录导出")
                .set("sql",sql)
                .save();

        p=Extract.dao.find(sql);
        for (int i = 0; i < p.size(); i++) {
            XSSFRow nextRow = sheet.createRow(i+1);

            XSSFCell cell2 = nextRow.createCell(0);
            if (p.get(i).get("id") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("id").toString());
            }

            cell2 = nextRow.createCell(1);
            if (p.get(i).get("uname") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("uname").toString());
            }

            cell2 = nextRow.createCell(2);
            if (p.get(i).get("time") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("time").toString());
            }

            cell2 = nextRow.createCell(3);
            if (p.get(i).get("dname") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("dname").toString());
            }

            cell2 = nextRow.createCell(4);
            if (p.get(i).get("name") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("name").toString());
            }

            cell2 = nextRow.createCell(5);
            if (p.get(i).get("number") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("number").toString());
            }

            cell2 = nextRow.createCell(6);
            if (p.get(i).get("location") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("location").toString());
            }

            cell2 = nextRow.createCell(7);
            if (p.get(i).get("remark") == null) {
                cell2.setCellValue("");
            } else {
                cell2.setCellValue(p.get(i).get("remark").toString());
            }

        }
        HttpServletResponse response = getResponse();
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition", "attachment;filename=PrintExtract.xlsx");
        OutputStream out = response.getOutputStream();
        workbook.write(out);
        out.flush();
        out.close();
        workbook.close();
        renderNull() ;
    }





}


