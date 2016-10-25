package com.wts.controller;

import com.jfinal.core.Controller;
import com.wts.entity.User;

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
            if (getPara("number").equals("admin") && getPara("password").equals("admin")){
                setSessionAttr("user","管理员");
                setAttr("userName","管理员");
                render("/dist/sys.html");
            }else{
                User user=User.dao.findFirst("select * from user where login=? and password=? and active='激活'", getPara("login"),getPara("password"));
                if (user!=null){
                    setSessionAttr("user",user);
                    setAttr("Name",((User) getSessionAttr("user")).getStr("name"));
                    setAttr("DepartmentId", ((User) getSessionAttr("user")).getInt("locationId"));
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
}


