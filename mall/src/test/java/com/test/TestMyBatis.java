package com.test;



import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.alibaba.fastjson.JSON;
@RunWith(SpringJUnit4ClassRunner.class)
// 表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = { "classpath:spring-mybatis.xml" })
public class TestMyBatis {
	private static Logger logger = Logger.getLogger(TestMyBatis.class);
	// private ApplicationContext ac = null;


	@Test
	public void test1() {
		
		//logger.info("返回值:"+count);
		
		/*
		 * XwUser user = iXwUserService.getUserById(1);
		 * System.out.println("user:"+JSON.toJSONString(user)); //
		 * System.out.println(user.getUserName()); //
		 * logger.info("值："+user.getUserName());
		 * logger.info(JSON.toJSONString(user));
		 */

		
		/*  Pages<XwUser> pages= iXwUserService.findPageUser(1);
		  System.out.println("XXXXXXXXXXXXXX:"+JSON.toJSON(pages).toString());
		  logger.info(JSON.toJSON(pages));*/
		
		
		/*System.out.println("count:"+iXwUserService.getAllUserCount());
		logger.info(iXwUserService.getAllUserCount());*/

	}
}
