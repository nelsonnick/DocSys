package com.wts.controller;

import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.wts.entity.model.*;
import com.wts.interceptor.LoginInterceptor;
import com.wts.util.IDNumber;

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

}


