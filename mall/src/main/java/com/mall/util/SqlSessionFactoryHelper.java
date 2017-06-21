package com.mall.util;

import java.io.IOException;
import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class SqlSessionFactoryHelper {

	public static final String RESOURCE = "spring-mybatis.xml";

	public static SqlSessionFactory getSqlSessionFactory() {
		Reader reader = null;
		try {
			reader = Resources.getResourceAsReader(RESOURCE);
		} catch (IOException e) {
			e.printStackTrace();
		}
		SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder()
				.build(reader);
		return sqlSessionFactory;
	}

}
