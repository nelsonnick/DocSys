package com.wts.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseLook<M extends BaseLook<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer id) {
		set("id", id);
	}

	public java.lang.Integer getId() {
		return get("id");
	}

	public void setUid(java.lang.Integer uid) {
		set("uid", uid);
	}

	public java.lang.Integer getUid() {
		return get("uid");
	}

	public void setTime(java.util.Date time) {
		set("time", time);
	}

	public java.util.Date getTime() {
		return get("time");
	}

	public void setType(java.lang.String type) {
		set("type", type);
	}

	public java.lang.String getType() {
		return get("type");
	}

	public void setSql(java.lang.String sql) {
		set("sql", sql);
	}

	public java.lang.String getSql() {
		return get("sql");
	}

	public void setPageNumber(java.lang.String pageNumber) {
		set("pageNumber", pageNumber);
	}

	public java.lang.String getPageNumber() {
		return get("pageNumber");
	}

	public void setPageSize(java.lang.String pageSize) {
		set("pageSize", pageSize);
	}

	public java.lang.String getPageSize() {
		return get("pageSize");
	}

}
