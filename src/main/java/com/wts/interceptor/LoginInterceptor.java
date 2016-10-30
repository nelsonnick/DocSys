package com.wts.interceptor;

import javax.servlet.http.HttpSession;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;

public class LoginInterceptor implements Interceptor {

	public void intercept(Invocation inv) {
		
		HttpSession session = inv.getController().getSession();
		if(session.getAttribute("user") == null){
			inv.getController().redirect("/index");
		}
		else{
			inv.invoke();
		}
	}
}