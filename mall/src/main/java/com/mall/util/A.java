package com.mall.util;

import java.util.Date;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import sun.misc.BASE64Encoder;

@SuppressWarnings("restriction")
public class A {

	public static void main(String[] args) throws Exception {
		String temString = "abcde\r\nfg";
		int b = temString.indexOf("\r\n");
		//System.out.println(b);
		System.out.println(temString.substring(0,b));
		
		long timeString = new Date().getTime() / 1000;
		String strKey = "CtZNbADzfFgqvs6i";
		String strIn = "{key:'Tospur',userid:'33185',username:'刘文',time:'"+timeString+"'}";
		//strIn = "{key:'Tospur',userid:'485',username:'日月光伯爵天地',time:'"+timeString+"'}";
		byte[] arrBTmp = strKey.getBytes();
		byte[] arrB = new byte[16]; // 创建一个空的16位字节数组（默认值为0）
		for (int i = 0; i < arrBTmp.length && i < arrB.length; i++) {
			arrB[i] = arrBTmp[i];
		}
		SecretKeySpec skeySpec = new SecretKeySpec(arrB, "AES");
		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
		String ivString = "4JFNMgzkuf6lQeEU";
		IvParameterSpec iv = new IvParameterSpec(ivString.getBytes());
		cipher.init(Cipher.ENCRYPT_MODE, skeySpec, iv);
		byte[] encrypted = cipher.doFinal(strIn.getBytes());
		String tempString = new BASE64Encoder().encode(encrypted);
		//encodeURIComponent();
		System.out.println("encodeURIComponent('"+tempString+"')");
	}
}
