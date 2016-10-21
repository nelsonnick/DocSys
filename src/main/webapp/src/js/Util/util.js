/**
 * Copyright 2015-2016 Inc.
 * All rights reserved.
 * created by JinTongYao @ 2016-03-10
 *
 */
import $ from 'jquery';
import {Popover} from '../components/';
import moment from 'moment';
import Cons from './constant';

export default {
	/**
	 * 获得cookie
	 */
	'getCookie': (name) => {
		let arr;
		let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
		if (document.cookie.length > 0) {
			arr = document.cookie.match(reg);
			if (arr !== null && arr.length >= 2) {
				return unescape(arr[2]);
			} else {
				return '';
			}
		}
		return '';
	},

	/**
	 * 设置cookie
	 * @param cookieName
	 * @param value
	 * @param expiredays
	 */
	'setCookie': (cookieName, value, expiredays) => {
		let expDate = new Date();
		expDate.setDate(expDate.getDate() + expiredays);
		document.cookie = cookieName + '=' + escape(value) + ((expiredays === null) ? '' : ';expires=' + expDate.toGMTString()) + '; path=/';
	},

	/**
	 * 删除cookie
	 * @param cookieName cookie名
	 */
	'delCookie': function(cookieName) {
		let expDate = new Date();
		expDate.setTime(expDate.getTime() - 1);
		let cookieValue = this.getCookie(cookieName);
		if (cookieValue !== null) {
			document.cookie = `${cookieName}=${cookieValue};expires=${expDate.toGMTString()}; path=/`;
		}
	},

	/**
	 * 通用ajax请求
	 * @param api
	 * @param data
	 * @param type
	 * @param successCallback
	 * @param errorCallBack
	 */
	'commonAjax': function(api, data, type, successCallback, errorCallBack) {
		$.ajax({
			'type': type,
			'url': api,
			'dataType': 'JSON',
			'xhrFields': {
				'withCredentials': true
			},
			'cache': false,
			'data': data || {},
			'success': (result) => {
				console.log(result);
				if (result.code === null || result.code === undefined) {
					ReactDOM.render(<Popover title="系统错误" content="系统异常,请稍后重试..." showConfirm={true}/>, document.getElementById('popover'));
					return;
				}
				if (result.code === 101 || result.code === 102) {// 系统错误
					ReactDOM.render(<Popover title="系统错误" showLoading={false} content={result.message} showConfirm={true}/>, document.getElementById('popover'));
				} else if (result.code === 100) {// 权限不足
					ReactDOM.render(<Popover title="请登录" content="用户未登录,正在为您跳转至登录界面..."/>, document.getElementById('popover'));
					setTimeout(() => {
						location.href = `${Cons.ADDRESS.LOGIN}?src=${window.location.href}`;
					}, 1000);// 提示显示1秒
				} else {// 正常
					successCallback(result);
				}
			},
			'error': errorCallBack || function(err) {
				console.error(err);
			}
		});
	},

	/**
	 * 基本ajax post方法
	 */
	'ajaxPost': function(api, postData, successCallback, errorCallBack) {
		this.commonAjax(api, postData, 'POST', successCallback, errorCallBack);
	},

	/**
	 * 基本ajax get方法
	 */
	'ajaxGet': function(api, getData, successCallback, errorCallBack) {
		this.commonAjax(api, getData, 'GET', successCallback, errorCallBack);
	},

	/**
	 * 今天日期
	 * @format 日期格式(默认YYYY-MM-DD)
	 */
	'getToday': function(format) {
		let dateFormat = format || 'YYYY-MM-DD';
		return moment().format(dateFormat);
	},

	/**
	 * 今年第一天
	 * @format 日期格式(默认YYYY-MM-DD)
	 */
	'getThisYearStart': function(format) {
		let dateFormat = format || 'YYYY-MM-DD';
		return moment().startOf('year').format(dateFormat);
	},

	/**
	 * 去年第一天
	 * @format 日期格式(默认YYYY-MM-DD)
	 */
	'getLastYearStart': function(format) {
		let dateFormat = format || 'YYYY-MM-DD';
		let lastYearToday = moment().subtract(1, 'years');
		return lastYearToday.startOf('year').format(dateFormat);
	},

	/**
	 * 去年最后一天
	 * @format 日期格式(默认YYYY-MM-DD)
	 */
	'getLastYearEnd': function(format) {
		let dateFormat = format || 'YYYY-MM-DD';
		let lastYearToday = moment().subtract(1, 'years');
		return lastYearToday.endOf('year').format(dateFormat);
	},

	/**
	 * 三个月前
	 * @format 日期格式(默认YYYY-MM-DD)
	 */
	'getLastThreeMonthDay': function(format) {
		let dateFormat = format || 'YYYY-MM-DD';
		return moment().subtract(3, 'months').format(dateFormat);
	},

	/**
	 * 将日期字符串转为JavaScript的Date对象
	 * @param dateString
	 */
	'convertDateString2JSDate': function(dateString) {
		return moment(dateString).toDate();
	},

	/**
	 * 将时间戳转换为当前时间
	 * @param timestamp 时间戳
	 * @param format 格式
	 */
	'getTimeFromTimestamp': function(timestamp, format) {
		let dateFormat = format || 'YYYY-MM-DD HH:mm:ss';
		let time = moment(timestamp);
		return time.format(dateFormat);
	},

	/**
	 * 获得页面url参数
	 * @param name 参数name
	 * @returns {Array|{index: number, input: string}|string}
	 */
	'getParameterByName': function(name) {
		let match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
		return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
	},

	/**
	 * 根据出生日期计算当前年龄
	 * @param birthday 格式"YYYY-MM-DD"
	 * @returns {*}
	 */
	'getAge': function(birth) {
		if (birth === null || birth === '') {
			return '';
		} else {
			let age;
			let today = new Date();
			let nowYear = today.getFullYear();
			let nowMonth = today.getMonth() + 1;
			let nowDate = today.getDate();
			let birthday = new Date(birth);
			let birthYear = birthday.getFullYear();
			let birthMonth = birthday.getMonth() + 1;
			let birthDate = birthday.getDate();

			if (nowMonth - birthMonth < 0) {
				age = nowYear - birthYear - 1;
			} else {
				if (nowDate - birthDate >= 0) {
					age = nowYear - birthYear;
				} else {
					age = nowYear - birthYear - 1;
				}
			}
			return age;
		}
	}
};