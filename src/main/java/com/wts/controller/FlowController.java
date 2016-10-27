package com.wts.controller;

import com.jfinal.core.Controller;

public class FlowController extends Controller {
  /**
   * 检测来源
   *@param: direct
   */
  public void direct() {
    if (getPara("direct").trim().length()<2) {
      renderText("档案来源必须在两个字符以上!");
    } else {
      renderText("OK");
    }
  }
  /**
   * 检测原因
   *@param: reason
   */
  public void reason() {
    if (getPara("reason").trim().length()<2) {
      renderText("流转原因必须在两个字符以上!");
    } else {
      renderText("OK");
    }
  }
}


