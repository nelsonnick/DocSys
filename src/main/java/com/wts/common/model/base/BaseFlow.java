package com.wts.common.model.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseFlow<M extends BaseFlow<M>> extends Model<M> implements IBean {

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

	public void setDid(java.lang.Integer did) {
		set("did", did);
	}

	public java.lang.Integer getDid() {
		return get("did");
	}

	public void setTime(java.util.Date time) {
		set("time", time);
	}

	public java.util.Date getTime() {
		return get("time");
	}

	public void setRemark(java.lang.String remark) {
		set("remark", remark);
	}

	public java.lang.String getRemark() {
		return get("remark");
	}

	public void setFlow(java.lang.String flow) {
		set("flow", flow);
	}

	public java.lang.String getFlow() {
		return get("flow");
	}

	public void setReason(java.lang.String reason) {
		set("reason", reason);
	}

	public java.lang.String getReason() {
		return get("reason");
	}

}
