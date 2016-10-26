package com.wts.entity;

import com.jfinal.plugin.activerecord.Page;
import com.wts.entity.base.BaseFile;

public class File extends BaseFile<File> {
  public static final File dao = new File();

  public Page<File> paginate2(int pageNumber, int pageSize, String userName, String userDept) {
    if (userDept.equals("")) {
      return paginate(pageNumber, pageSize, "SELECT user.*,department.name AS dname",
              "FROM user INNER JOIN department ON user.did = department.id WHERE user.name LIKE '%" + userName + "%' AND user.state <> '删除' ORDER BY user.id DESC");
    } else {
      return paginate(pageNumber, pageSize, "SELECT user.*,department.name AS dname",
              "FROM user INNER JOIN department ON user.did = department.id WHERE user.name LIKE '%" + userName + "%' AND user.did = " + userDept + " AND user.state <> '删除' ORDER BY user.id DESC");
    }
  }
}