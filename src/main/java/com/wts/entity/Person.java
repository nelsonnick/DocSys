package com.wts.entity;

import com.jfinal.plugin.activerecord.Page;
import com.wts.entity.base.BasePerson;

public class Person extends BasePerson<Person> {
  public static final Person dao = new Person();
  public Page<Person> paginate(int pageNumber, int pageSize, String query) {
    return paginate(pageNumber, pageSize, "SELECT *",
            "FROM department WHERE name LIKE '%"+query+"%' AND state<>'删除' ORDER BY id DESC");
  }

}