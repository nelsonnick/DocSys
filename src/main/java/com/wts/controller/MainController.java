package com.wts.controller;

import com.jfinal.core.Controller;

public class MainController extends Controller {


    /**
     * 主界面
     * */
    public void index() {
        render("/src/login.html");
    }
    public void img() {
        renderCaptcha();
    }
    public void login() {
        boolean result = validateCaptcha("verifyCode");
        System.out.println(result);
        renderNull();
    }
}


