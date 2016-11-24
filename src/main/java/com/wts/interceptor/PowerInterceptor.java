package com.wts.interceptor;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.wts.entity.model.User;

import javax.servlet.http.HttpSession;

public class PowerInterceptor implements Interceptor {

	public void intercept(Invocation inv) {
		
		HttpSession session = inv.getController().getSession();
		if(!((User)session.getAttribute("user")).getState().equals("系统")){
			inv.getController().redirect("/");
		}
		else{
			inv.invoke();
		}
	}
}