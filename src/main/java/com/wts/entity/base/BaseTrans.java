package com.wts.entity.base;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.IBean;

/**
 * Generated by JFinal, do not modify this file.
 */
@SuppressWarnings("serial")
public abstract class BaseTrans<M extends BaseTrans<M>> extends Model<M> implements IBean {

	public void setId(java.lang.Integer id) {
		set("id", id);
	}

	public java.lang.Integer getId() {
		return get("id");
	}

	public void setPid(java.lang.Integer pid) {
		set("pid", pid);
	}

	public java.lang.Integer getPid() {
		return get("pid");
	}

	public void setDid(java.lang.Integer did) {
		set("did", did);
	}

	public java.lang.Integer getDid() {
		return get("did");
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

	public void setNameBefore(java.lang.String nameBefore) {
		set("nameBefore", nameBefore);
	}

	public java.lang.String getNameBefore() {
		return get("nameBefore");
	}

	public void setNameAfter(java.lang.String nameAfter) {
		set("nameAfter", nameAfter);
	}

	public java.lang.String getNameAfter() {
		return get("nameAfter");
	}

	public void setNumberBefore(java.lang.String numberBefore) {
		set("numberBefore", numberBefore);
	}

	public java.lang.String getNumberBefore() {
		return get("numberBefore");
	}

	public void setNumberAfter(java.lang.String numberAfter) {
		set("numberAfter", numberAfter);
	}

	public java.lang.String getNumberAfter() {
		return get("numberAfter");
	}

	public void setPhone1Before(java.lang.String phone1Before) {
		set("phone1Before", phone1Before);
	}

	public java.lang.String getPhone1Before() {
		return get("phone1Before");
	}

	public void setPhone1After(java.lang.String phone1After) {
		set("phone1After", phone1After);
	}

	public java.lang.String getPhone1After() {
		return get("phone1After");
	}

	public void setPhone2Before(java.lang.String phone2Before) {
		set("phone2Before", phone2Before);
	}

	public java.lang.String getPhone2Before() {
		return get("phone2Before");
	}

	public void setPhone2After(java.lang.String phone2After) {
		set("phone2After", phone2After);
	}

	public java.lang.String getPhone2After() {
		return get("phone2After");
	}

	public void setAddressBefore(java.lang.String addressBefore) {
		set("addressBefore", addressBefore);
	}

	public java.lang.String getAddressBefore() {
		return get("addressBefore");
	}

	public void setAddressAfter(java.lang.String addressAfter) {
		set("addressAfter", addressAfter);
	}

	public java.lang.String getAddressAfter() {
		return get("addressAfter");
	}

	public void setFileAgeBefore(java.util.Date fileAgeBefore) {
		set("fileAgeBefore", fileAgeBefore);
	}

	public java.util.Date getFileAgeBefore() {
		return get("fileAgeBefore");
	}

	public void setFileAgeAfter(java.util.Date fileAgeAfter) {
		set("fileAgeAfter", fileAgeAfter);
	}

	public java.util.Date getFileAgeAfter() {
		return get("fileAgeAfter");
	}

}