package com.wts.entity;

import com.jfinal.plugin.activerecord.Page;
import com.wts.entity.base.BaseFlow;

public class Flow extends BaseFlow<Flow> {
  public static final Flow dao = new Flow();
  public Page<Flow> paginate(int pageNumber, int pageSize, String query) {
    return paginate(pageNumber, pageSize, "SELECT *",
            "FROM department WHERE name LIKE '%"+query+"%' AND state<>'删除' ORDER BY id DESC");
  }

}