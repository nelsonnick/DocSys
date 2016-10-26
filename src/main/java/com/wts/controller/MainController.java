package com.wts.controller;

import com.jfinal.core.Controller;
import com.wts.entity.User;
import com.wts.util.DepartmentGet;

public class MainController extends Controller {
    /**
     * 主界面
     * */
    public void index() {
        render("/dist/login.html");
    }
    public void img() {
        renderCaptcha();
    }
    public void login() {
        boolean result = validateCaptcha("verifyCode");
        if (result){
            if (getPara("login").equals("admin") && getPara("password").equals("admin")){
                User user=new User();
                user.setName("管理员");
                user.setDid(0);
                setSessionAttr("user",user);
                setSessionAttr("userName",user.getName());
                setSessionAttr("userDid",user.getDid());
                setSessionAttr("departmentName","系统后台");
                render("/dist/sys.html");
            }else{
                User user=User.dao.findFirst("select * from user where login=? and password=? and active='激活'", getPara("login"),getPara("password"));
                if (user!=null){
                    setSessionAttr("user",user);
                    setSessionAttr("userName",((User) getSessionAttr("user")).getStr("name"));
                    setSessionAttr("userDid", ((User) getSessionAttr("user")).getStr("did"));
                    setSessionAttr("departmentName", DepartmentGet.getDepartmentName(((User) getSessionAttr("user")).getStr("did")));
                    render("/home.html");
                }else{
                    setAttr("error","用户名或密码错误，请重新输入!");
                    render("/dist/login.html");
                }
            }
        }else{
            setAttr("error","验证码错误，请重新输入!");
            render("/dist/login.html");
        }
    }
    public void getCurrentUser(){
        System.out.println(getSessionAttr("userName"));
        if (getSessionAttr("userName").equals("") || getSessionAttr("userName")==null){
            renderText("无法识别");
        }else{
            renderText(getSessionAttr("userName").toString());
        }
    }
    public void getCurrentDepartment(){
        if (getSessionAttr("departmentName").equals("") || getSessionAttr("departmentName")==null){
            renderText("无法识别");
        }else{
            renderText(getSessionAttr("departmentName").toString());
        }
    }
    public void logout() {
        setSessionAttr("user",null);
        setSessionAttr("userName",null);
        setSessionAttr("userDid",null);
        setSessionAttr("departmentName",null);
        redirect("/index");
    }
}


