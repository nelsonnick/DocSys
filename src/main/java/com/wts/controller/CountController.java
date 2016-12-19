package com.wts.controller;

import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.activerecord.tx.Tx;
import com.wts.entity.model.User;
import com.wts.interceptor.LoginInterceptor;

import java.util.List;

public class CountController extends Controller {

    @Before({Tx.class,LoginInterceptor.class})
    public void flowIn() {
        if (getPara("did").equals("")) {
            String count = Db.queryLong("select count(*) from flow where flow.flow = '转入' ").toString();
            renderText(count);
        } else {
            String count = Db.queryLong("select count(*) from flow where flow.flow = '转入' and flow.did = " + getPara("did")).toString();
            renderText(count);
        }
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void flowOut() {
        if (getPara("did").equals("")) {
            String count = Db.queryLong("select count(*) from flow where flow.flow = '转出' ").toString();
            renderText(count);
        } else {
            String count = Db.queryLong("select count(*) from flow where flow.flow = '转出' and flow.did = " + getPara("did")).toString();
            renderText(count);
        }
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void flowBorrow() {
        if (getPara("did").equals("")) {
            String count = Db.queryLong("select count(*) from flow where flow.flow = '出借' ").toString();
            renderText(count);
        } else {
            String count = Db.queryLong("select count(*) from flow where flow.flow = '出借' and flow.did = " + getPara("did")).toString();
            renderText(count);
        }
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void flowReturn() {
        if (getPara("did").equals("")) {
            String count = Db.queryLong("select count(*) from flow where flow.flow = '归还' ").toString();
            renderText(count);
        } else {
            String count = Db.queryLong("select count(*) from flow where flow.flow = '归还' and flow.did = " + getPara("did")).toString();
            renderText(count);
        }
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void flowChange() {
        if (getPara("did").equals("")) {
            String count = Db.queryLong("select count(*) from trans ").toString();
            renderText(count);
        } else {
            String count = Db.queryLong("select count(*) from trans where trans.did = " + getPara("did")).toString();
            renderText(count);
        }
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void personChange() {
        if (getPara("did").equals("")) {
            String count = Db.queryLong("select count(*) from `change` ").toString();
            renderText(count);
        } else {
            String count = Db.queryLong("select count(*) from `change` where did = " + getPara("did")).toString();
            renderText(count);
        }
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void maleIn() {
        if (getPara("did").equals("")) {
            String count = Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='在档' and person.sex='男' ").toString();
            renderText(count);
        } else {
            String count = Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='在档' and person.sex='男' and file.did = " + getPara("did")).toString();
            renderText(count);
        }
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void maleOut() {
        if (getPara("did").equals("")) {
            String count = Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='已提' and person.sex='男' ").toString();
            renderText(count);
        } else {
            String count = Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='已提' and person.sex='男' and file.did = " + getPara("did")).toString();
            renderText(count);
        }
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void maleBorrow() {
        if (getPara("did").equals("")) {
            String count = Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='出借' and person.sex='男' ").toString();
            renderText(count);
        } else {
            String count = Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='出借' and person.sex='男' and file.did = " + getPara("did")).toString();
            renderText(count);
        }
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void femaleIn() {
        if (getPara("did").equals("")) {
            String count = Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='在档' and person.sex='女' ").toString();
            renderText(count);
        } else {
            String count = Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='在档' and person.sex='女' and file.did = " + getPara("did")).toString();
            renderText(count);
        }
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void femaleOut() {
        if (getPara("did").equals("")) {
            String count = Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='已提' and person.sex='女' ").toString();
            renderText(count);
        } else {
            String count = Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='已提' and person.sex='女' and file.did = " + getPara("did")).toString();
            renderText(count);
        }
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void femaleBorrow() {
        if (getPara("did").equals("")) {
            String count = Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='出借' and person.sex='女' ").toString();
            renderText(count);
        } else {
            String count = Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='出借' and person.sex='女' and file.did = " + getPara("did")).toString();
            renderText(count);
        }
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void flowInAll() {
        renderText(Db.queryLong("select count(*) from flow where flow.flow = '转入' ").toString());
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void flowOutAll() {
        renderText(Db.queryLong("select count(*) from flow where flow.flow = '转出' ").toString());
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void flowBorrowAll() {
        renderText(Db.queryLong("select count(*) from flow where flow.flow = '出借' ").toString());
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void flowReturnAll() {
        renderText(Db.queryLong("select count(*) from flow where flow.flow = '归还' ").toString());
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void flowChangeAll() {
        renderText(Db.queryLong("select count(*) from trans ").toString());
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void personChangeAll() {
        renderText(Db.queryLong("select count(*) from `change` ").toString());
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void maleInAll() {
        renderText(Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='在档' and person.sex='男' ").toString());
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void maleOutAll() {
        renderText(Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='已提' and person.sex='男' ").toString());
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void maleBorrowAll() {
        renderText(Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='出借' and person.sex='男' ").toString());
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void femaleInAll() {
        renderText(Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='在档' and person.sex='女' ").toString());
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void femaleOutAll() {
        renderText(Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='已提' and person.sex='女' ").toString());
    }
    @Before({Tx.class,LoginInterceptor.class})
    public void femaleBorrowAll() {
        renderText(Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='出借' and person.sex='女' ").toString());
    }
    /**
     * 检查导出
     * did
     */
    @Before({Tx.class,LoginInterceptor.class})
    public  void countAll(){
        String sql = "select (select count(*) from `change`) as change_count ,"
                + "(select count(*) from `export`) as export_count ,"
                + "(select count(*) from `extract`) as extract_count ,"
                + "(select count(*) from `flow`) as flow_count1 ,"
                + "(select count(*) from `flow`) as flow_count2 ,"
                + "(select count(*) from `flow`) as flow_count3 ,"
                + "(select count(*) from `flow`) as flow_count4 ,"
                + "(select count(*) from `flow`) as flow_count5 ,"
                + "(select count(*) from `look`) as look_count ,"
                + "(select count(*) from `polity`) as polity_count ,"
                + "(select count(*) from `print`) as print_count ,"
                + "(select count(*) from `prove`) as prove_count ,"
                + "(select count(*) from `trans`) as trans_count ";
        List<Record> r=Db.find(sql);
        r.remove(0);
        List<User> users = User.dao.find("select user.* from user where did="+getPara("did"));
        for (int i = 0; i < users.size(); i++) {
            sql = "select (select count(*) from `change` where uid = " + users.get(i).get("id").toString() + ") as change_count ,"
                    + "(select count(*) from `export` where uid = " + users.get(i).get("id").toString() + ") as export_count ,"
                    + "(select count(*) from `extract` where uid = " + users.get(i).get("id").toString() + ") as extract_count ,"
                    + "(select count(*) from `flow` where flow='转入' and uid = " + users.get(i).get("id").toString() + ") as flow_count1 ,"
                    + "(select count(*) from `flow` where flow='转出' and uid = " + users.get(i).get("id").toString() + ") as flow_count2 ,"
                    + "(select count(*) from `flow` where flow='重存' and uid = " + users.get(i).get("id").toString() + ") as flow_count3 ,"
                    + "(select count(*) from `flow` where flow='出借' and uid = " + users.get(i).get("id").toString() + ") as flow_count4 ,"
                    + "(select count(*) from `flow` where flow='归还' and uid = " + users.get(i).get("id").toString() + ") as flow_count5 ,"
                    + "(select count(*) from `look` where uid = " + users.get(i).get("id").toString() + ") as look_count ,"
                    + "(select count(*) from `polity` where uid = " + users.get(i).get("id").toString() + ") as polity_count ,"
                    + "(select count(*) from `print` where uid = " + users.get(i).get("id").toString() + ") as print_count ,"
                    + "(select count(*) from `prove` where uid = " + users.get(i).get("id").toString() + ") as prove_count ,"
                    + "(select count(*) from `trans` where uid = " + users.get(i).get("id").toString() + ") as trans_count ,"
                    + "name,id from user where name = '"+users.get(i).get("name")+"' group by name";
            r.addAll(Db.find(sql));
        }
        renderJson(r);
    }

    /**
     * 检查导出
     */
    @Before({Tx.class,LoginInterceptor.class})
    public  void countAlls(){
        String sql = "select (select count(*) from `change`) as change_count ,"
                + "(select count(*) from `export`) as export_count ,"
                + "(select count(*) from `extract`) as extract_count ,"
                + "(select count(*) from `flow` where flow='转入') as flow_count1 ,"
                + "(select count(*) from `flow` where flow='转出') as flow_count2 ,"
                + "(select count(*) from `flow` where flow='重存') as flow_count3 ,"
                + "(select count(*) from `flow` where flow='出借') as flow_count4 ,"
                + "(select count(*) from `flow` where flow='归还') as flow_count5 ,"
                + "(select count(*) from `look`) as look_count ,"
                + "(select count(*) from `polity`) as polity_count ,"
                + "(select count(*) from `print`) as print_count ,"
                + "(select count(*) from `prove`) as prove_count ,"
                + "(select count(*) from `trans`) as trans_count ";
        List<Record> r=Db.find(sql);
        renderJson(r);
    }

}


