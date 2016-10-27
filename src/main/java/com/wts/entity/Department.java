package com.wts.entity;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import com.wts.entity.base.BaseDepartment;

public class Department extends BaseDepartment<Department> {
  public static final Department dao = new Department();
  public Page<Department> paginate2(int pageNumber, int pageSize,String name) {
    return paginate(pageNumber, pageSize, "SELECT *",
            "FROM department WHERE name LIKE '%"+name+"%' AND state<>'删除' ORDER BY id DESC");
  }

}