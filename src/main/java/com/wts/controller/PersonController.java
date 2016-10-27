package com.wts.controller;

import com.jfinal.core.Controller;
import com.wts.util.IDNumber;

public class PersonController extends Controller {
  /**
   * 核查真实姓名
   *@param: name
   */
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
   * 核查证件号码
   *@param: number
   */
  public void number() {
    renderText(IDNumber.checkIDNumber(getPara("number")));
  }
  /**
   * 核查联系电话1
   *@param: phone1
   */
  public void phone1() {
    if (!getPara("phone1").matches("\\d{11}")) {
      renderText("联系电话必须为11位数字!");
    } else {
      renderText("OK");
    }
  }
  /**
   * 核查联系电话2
   *@param: phone2
   */
  public void phone2() {
    if (!getPara("phone2").trim().equals("")){
      if (!getPara("phone2").matches("\\d{11}")) {
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
   *@param: address
   */
  public void address() {
    if (getPara("address").trim().length()<2) {
      renderText("联系地址应该在两个字符以上!");
    } else {
      renderText("OK");
    }
  }
  /**
   * 核查年龄
   *@param: age
   */
  public void age() {
    renderText("OK");
  }

}


