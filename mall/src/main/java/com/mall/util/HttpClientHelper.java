package com.mall.util;
import java.io.IOException;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;

/**
 * 
 * @author 33185
 *2016-3-3 10:55:06
 */
public class HttpClientHelper {
	
	private static Logger log = Logger.getLogger(HttpClientHelper.class);

	/**
	 * 发送 post请求访问本地应用并根据传递参数不同返回不同结果
	 */
	public static String post(String url, List<NameValuePair> params) {
		String returnResult = "";
		// 创建默认的httpClient实例.  
		CloseableHttpClient httpclient = HttpClients.createDefault();
		// 创建httppost  
		HttpPost httppost = new HttpPost(url);
		try {
			// httppost.setEntity(new StringEntity(paramsInfo, "UTF-8"));
			httppost.setEntity(new UrlEncodedFormEntity(params,"UTF-8"));
			log.debug("executing request " + httppost.getURI());
			CloseableHttpResponse response = httpclient.execute(httppost);
			try {
				HttpEntity entity = response.getEntity();
				if (entity != null) {
					returnResult = EntityUtils.toString(entity, "UTF-8");
					log.debug("--------------------------------------");
					log.debug("Response content: " + returnResult);
					log.debug("--------------------------------------");
				}
			} finally {
				response.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// 关闭连接,释放资源  
			try {
				httpclient.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return returnResult;
	}

}