package com.wts.util;

import com.wts.entity.model.Department;

public class Util {
    public static final String ADMIN = "whosyourdaddy";
    public static final String PWD = "hyrswts";
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
    public static String CheckNull(String str) {
        if (str==null){
            return "";
        }else{
            return str.trim();
        }
    }
    public static void main(String[] args) {
        String b = "^([\\d]{4}(((0[13578]|1[02])((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|11)((0[1-9])|([12][1-9])|30))|(02((0[1-9])|(1[0-9])|(2[1-8])))))|((((([02468][048])|([13579][26]))00)|([0-9]{2}(([02468][048])|([13579][26]))))(((0[13578]|1[02])((0[1-9])|([12][0-9])|(3[01])))|(((0[469])|11)((0[1-9])|([12][1-9])|30))|(02((0[1-9])|(1[0-9])|(2[1-9])))))";
        System.out.println("201p0229".matches(b));
        // System.out.println("111"+CheckNull(null));
    }
}
