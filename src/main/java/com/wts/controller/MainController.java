package com.wts.controller;

import com.jfinal.core.Controller;
import com.wts.entity.model.User;
import com.wts.util.Util;

import static com.wts.util.EncryptUtils.encodeMD5String;

public class MainController extends Controller {
public void l(){
  User user=new User();
  user.set("name","管理员");
  user.set("did","0");
  setSessionAttr("user",user);
  System.out.println(getSessionAttr("user").toString());
  renderText(getSessionAttr("user").toString());
}
    /**
     * 主界面
     * */
    public void index() {
        render("/dist/login.html");
    }
    public void sys() {
        render("/dist/sys.html");
    }
    public void com() {
        render("/dist/com.html");
    }
    public void img() {
        renderCaptcha();
    }
    public void login() {
        boolean result = validateCaptcha("verifyCode");
        if (result){
            if (getPara("login").equals("admin") && getPara("password").equals("admin")){
                User user=new User();
                user.set("name","管理员");
                user.set("did","0");
                setSessionAttr("user",user);
                redirect("/sys");
            }else{
                User user=User.dao.findFirst("select * from user where login=? and pass=? and state='激活'", getPara("login"),encodeMD5String(getPara("password")));
                if (user!=null){
                    setSessionAttr("user",user);
                    redirect("/com");
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
        if (getSessionAttr("user").equals("") || getSessionAttr("user")==null){
            renderText("无法识别");
        }else{
            renderText(((User) getSessionAttr("user")).getStr("name"));
        }
    }
    public void getCurrentDepartment(){

        if (getSessionAttr("user").equals("") || getSessionAttr("user")==null){
            renderText("无法识别");
        }else{
            renderText(Util.getDepartmentName(((User) getSessionAttr("user")).get("did").toString().trim()));
        }
    }
    public void logout() {
        removeSessionAttr("user");
        redirect("/index");
    }
}


