package com.wts.entity;

import com.jfinal.plugin.activerecord.Page;
import com.wts.entity.base.BaseTrans;

public class Trans extends BaseTrans<Trans> {
  public static final Trans dao = new Trans();
  public Page<Trans> paginate(int pageNumber, int pageSize, String query) {
    return paginate(pageNumber, pageSize, "SELECT *",
            "FROM department WHERE name LIKE '%"+query+"%' AND state<>'删除' ORDER BY id DESC");
  }

}