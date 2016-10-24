package com.wts.entity;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
/**
 * Department model.
 mysql> desc department;
 +-------------+--------------+------+-----+---------+----------------+
 | Field       | Type         | Null | Key | Default | Extra          |
 +-------------+--------------+------+-----+---------+----------------+
 | id          | int(11)      | NO   | PRI | NULL    | auto_increment |
 | name        | varchar(255) | NO   |     | NULL    |                |
 | number      | varchar(255) | NO   |     | NULL    |                |
 | phone       | varchar(255) | NO   |     | NULL    |                |
 | address     | varchar(255) | NO   |     | NULL    |                |
 | state       | varchar(255) | NO   |     | NULL    |                |
 | other       | varchar(255) | NO   |     | NULL    |                |
 +-------------+--------------+------+-----+---------+----------------+
 */
public class Department extends Model<Department> {
  public static final Department dao = new Department();
  public Page<Department> paginate(int pageNumber, int pageSize,String query) {
    return paginate(pageNumber, pageSize, "SELECT *",
            "FROM department WHERE name LIKE '%"+query+"%' AND state<>'删除' ORDER BY id DESC");
  }

}