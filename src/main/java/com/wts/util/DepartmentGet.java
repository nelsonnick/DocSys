package com.wts.util;

import com.wts.entity.model.Department;

public class DepartmentGet {
    public static String getDepartmentName(String departmentId) {
        Department department = Department.dao.findById(departmentId);
        if (department==null){
            return "未识别";
        }else{
            return department.getStr("name");
        }
    }
}
