package com.mall.util;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

import com.alibaba.fastjson.JSONObject;
import com.mall.sso.bean.MCParamsBean;

/**
 * AES加减密帮助类
 * @author 33185
 *
 */
@SuppressWarnings("restriction")
public class AESHelper {

	private static String IV = "4JFNMgzkuf6lQeEU";

	public static String encrypt(String strKey, String strIn) throws Exception {
		SecretKeySpec skeySpec = getKey(strKey);
		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
		IvParameterSpec iv = new IvParameterSpec(IV.getBytes());
		cipher.init(Cipher.ENCRYPT_MODE, skeySpec, iv);
		byte[] encrypted = cipher.doFinal(strIn.getBytes("utf-8"));
		return new BASE64Encoder().encode(encrypted);
	}

	public static String decrypt(String strKey, String strIn) throws Exception {
		SecretKeySpec skeySpec = getKey(strKey);
		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
		IvParameterSpec iv = new IvParameterSpec(IV.getBytes());
		cipher.init(Cipher.DECRYPT_MODE, skeySpec, iv);
		byte[] encrypted1 = new BASE64Decoder().decodeBuffer(strIn);
		byte[] original = cipher.doFinal(encrypted1);
		String originalString = new String(original,"utf-8");
		return originalString;
	}

	private static SecretKeySpec getKey(String strKey) throws Exception {
		byte[] arrBTmp = strKey.getBytes("utf-8");
		byte[] arrB = new byte[16]; // 创建一个空的16位字节数组（默认值为0）

		for (int i = 0; i < arrBTmp.length && i < arrB.length; i++) {
			arrB[i] = arrBTmp[i];
		}

		SecretKeySpec skeySpec = new SecretKeySpec(arrB, "AES");

		return skeySpec;
	}

	public static void main(String[] args) throws Exception {
		String Code = "{key:'Tospur',userid:'33185',username:'刘文',time:'20150120'}";
		String key = "CtZNbADzfFgqvs6i";
		String codE;
		
		codE = AESHelper.encrypt(key, Code);

		System.out.println("原文：" + Code);
		System.out.println("密钥：" + key);
		System.out.println("密文：" + codE);
		System.out.println("解密：" + AESHelper.decrypt(key, codE));
		MCParamsBean bean = JSONObject.parseObject(Code,
				MCParamsBean.class);
		System.out.println(bean.getKey());
		System.out.println(bean.getUserid());
		System.out.println(bean.getUsername());
		System.out.println(bean.getTime());
	}
}