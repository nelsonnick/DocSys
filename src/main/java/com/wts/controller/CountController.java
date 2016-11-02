package com.wts.controller;

import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.wts.entity.model.Login;
import com.wts.entity.model.User;
import com.wts.util.IpKit;
import com.wts.util.Util;

import java.util.Date;

import static com.wts.util.EncryptUtils.encodeMD5String;

public class CountController extends Controller {

    public void flowIn() {
        if (getPara("did").equals("")) {
            String count = Db.queryLong("select count(*) from flow where flow.flow = '转入' ").toString();
            renderText(count);
        } else {
            String count = Db.queryLong("select count(*) from flow where flow.flow = '转入' and flow.did = " + getPara("did")).toString();
            renderText(count);
        }
    }
    public void flowOut() {
        if (getPara("did").equals("")) {
            String count = Db.queryLong("select count(*) from flow where flow.flow = '转出' ").toString();
            renderText(count);
        } else {
            String count = Db.queryLong("select count(*) from flow where flow.flow = '转出' and flow.did = " + getPara("did")).toString();
            renderText(count);
        }
    }
    public void flowChange() {
        if (getPara("did").equals("")) {
            String count = Db.queryLong("select count(*) from trans ").toString();
            renderText(count);
        } else {
            String count = Db.queryLong("select count(*) from trans where trans.did = " + getPara("did")).toString();
            renderText(count);
        }
    }
    public void personChange() {
        if (getPara("did").equals("")) {
            String count = Db.queryLong("select count(*) from `change` ").toString();
            renderText(count);
        } else {
            String count = Db.queryLong("select count(*) from `change` where did = " + getPara("did")).toString();
            renderText(count);
        }
    }
    public void maleIn() {
        if (getPara("did").equals("")) {
            String count = Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='在档' and person.sex='男' ").toString();
            renderText(count);
        } else {
            String count = Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='在档' and person.sex='男' and file.did = " + getPara("did")).toString();
            renderText(count);
        }
    }
    public void maleOut() {
        if (getPara("did").equals("")) {
            String count = Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='已提' and person.sex='男' ").toString();
            renderText(count);
        } else {
            String count = Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='已提' and person.sex='男' and file.did = " + getPara("did")).toString();
            renderText(count);
        }
    }
    public void femaleIn() {
        if (getPara("did").equals("")) {
            String count = Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='在档' and person.sex='女' ").toString();
            renderText(count);
        } else {
            String count = Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='在档' and person.sex='女' and file.did = " + getPara("did")).toString();
            renderText(count);
        }
    }
    public void femaleOut() {
        if (getPara("did").equals("")) {
            String count = Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='已提' and person.sex='女' ").toString();
            renderText(count);
        } else {
            String count = Db.queryLong("select count(*) from file inner join person on file.pid = person.id where file.state='已提' and person.sex='女' and file.did = " + getPara("did")).toString();
            renderText(count);
        }
    }
}


