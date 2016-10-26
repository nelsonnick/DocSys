package com.wts.entity;

import com.jfinal.plugin.activerecord.Page;
import com.wts.entity.base.BaseUser;

public class User extends BaseUser<User> {
  public static final User dao = new User();

  public Page<User> paginate2(int pageNumber, int pageSize, String userName, String userDept) {
    if (userDept.equals("")) {
      return paginate(pageNumber, pageSize, "SELECT user.*,department.name AS dname",
              "FROM user INNER JOIN department ON user.did = department.id WHERE user.name LIKE '%" + userName + "%' AND user.state <> '删除' ORDER BY user.id DESC");
    } else {
      return paginate(pageNumber, pageSize, "SELECT user.*,department.name AS dname",
              "FROM user INNER JOIN department ON user.did = department.id WHERE user.name LIKE '%" + userName + "%' AND user.did = " + userDept + " AND user.state <> '删除' ORDER BY user.id DESC");
    }
  }
}