package com.wts.entity;

import com.jfinal.plugin.activerecord.Page;
import com.wts.entity.base.BaseDepartment;

public class Department extends BaseDepartment<Department> {
  public static final Department dao = new Department();
  public Page<Department> paginate(int pageNumber, int pageSize,String query) {
    return paginate(pageNumber, pageSize, "SELECT *",
            "FROM department WHERE name LIKE '%"+query+"%' AND state<>'删除' ORDER BY id DESC");
  }

}