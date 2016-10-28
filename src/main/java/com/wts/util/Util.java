package com.wts.util;

import com.wts.entity.model.Department;

public class Util {
    public static String getDepartmentName(String departmentId) {
        if (departmentId.equals("0")) {
            return "管理后台";
        }else{
            Department department = Department.dao.findById(departmentId);
            if (department==null){
                return "未识别";
            }else{
                return department.getStr("name");
            }
        }
    }
    public static String getNumber(String number) {
        if (number.length()==1){
            return "00"+number;
        }else if(number.length()==2){
            return "0"+number;
        }else if(number.length()==3){
            return number;
        }else{
            return "000";
        }
    }

    public static void main(String[] args) {
        Department department = Department.dao.findById("1");
        System.out.println(department.toJson());
        System.out.println(getDepartmentName("2"));
    }
}
