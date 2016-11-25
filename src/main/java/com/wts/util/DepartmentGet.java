package com.wts.util;

import com.wts.entity.model.Department;

public class DepartmentGet {
    public static String getDepartmentName(String departmentId) {
        if (departmentId.equals("0")){
            return "系统";
        }else if (Department.dao.findById(departmentId)==null){
            return "未识别";
        }else{
            Department department = Department.dao.findById(departmentId);
            return department.getStr("name");
        }
    }
}
