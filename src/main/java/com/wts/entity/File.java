package com.wts.entity;

import com.jfinal.plugin.activerecord.Page;
import com.wts.entity.base.BaseFile;

public class File extends BaseFile<File> {
  public static final File dao = new File();

  public Page<File> paginate2(int pageNumber, int pageSize, String personName, String personNumber, String fileNumber, String fileDept, String fileState) {
    if (fileDept.equals("")) {
      return paginate(pageNumber, pageSize, "SELECT file.id AS fid, file.did AS did, file.number AS fnumber, file.state AS fstate, file.remark AS fremark, person.id AS pid, person.name AS pname, person.number AS pnumber, person.phone1 AS pphone1, person.phone2 AS pphone2, person.address AS paddress, person.remark AS premark, person.fileAge AS pfileAge, person.state AS pstate, department.name AS dname",
              "FROM (file INNER JOIN person ON file.pid=person.id) INNER JOIN department ON file.did=department.did WHERE pname LIKE '%" + personName + "%' AND pnumber LIKE '%" + personNumber + "%' AND fnumber LIKE '%" + fileNumber + "%' AND fstate LIKE '%" + fileState + "%' ORDER BY fid DESC");
    } else {
      return paginate(pageNumber, pageSize, "SELECT file.id AS fid, file.number AS fnumber, file.state AS fstate, file.remark AS fremark, person.id AS pid, person.name AS pname, person.number AS pnumber, person.phone1 AS pphone1, person.phone2 AS pphone2, person.address AS paddress, person.remark AS premark, person.fileAge AS pfileAge, person.state AS pstate, department.name AS dname",
              "FROM (file INNER JOIN person ON file.pid=person.id) INNER JOIN department ON file.did=department.did WHERE pname LIKE '%" + personName + "%' AND pnumber LIKE '%" + personNumber + "%' AND fnumber LIKE '%" + fileNumber + "%' AND fstate LIKE '%" + fileState + "%' AND did = " + fileDept + "  ORDER BY fid DESC");
    }
  }
}
