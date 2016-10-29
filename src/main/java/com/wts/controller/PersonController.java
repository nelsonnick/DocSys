package com.wts.controller;

import com.jfinal.core.Controller;
import com.wts.entity.model.*;
import com.wts.util.IDNumber;

import java.util.List;

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
    List<Person> persons = Person.dao.find(
            "select * from person where number=?", getPara("number"));
    if (persons.size() != 0) {
      renderText("该证件号码已存在，请更换!");
    } else {
      renderText(IDNumber.checkIDNumber(getPara("number")));
    }
  }
  /**
   * 核查证件号码
   *@param: number
   */
  public void numbers() {
    List<Person> persons = Person.dao.find(
            "select * from person where number=?", getPara("number"));
    if (persons.size() > 1 ) {
      renderText("该证件号码已存在，请更换!");
    } else {
      renderText(IDNumber.checkIDNumber(getPara("number")));
    }
  }
  /**
   * 核查联系电话1
   *@param: phone1
   */
  public void phone1() {
    if (!getPara("phone").matches("\\d{11}")) {
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
    String a = "^(?:(?!0000)[0-9]{4}(?:(?:0[1-9]|1[0-2])(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$";
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


