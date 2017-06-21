package com.mall.util;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
import javax.crypto.spec.IvParameterSpec;

import org.apache.commons.codec.binary.Base64;

public class LoginDecryptHelper {

	// 初始向量
	private static byte[] IV = { 0x12, 0x34, 0x56, 0x78, (byte) 0x90,
			(byte) 0xAB, (byte) 0xCD, (byte) 0xEF };


	/**
	 * 加密
	 * 
	 * @param datasource
	 *            byte[]
	 * @param secretKey
	 *            String
	 * @return byte[]
	 */
	public static byte[] encrypt(byte[] datasource, String secretKey) {
		try {
			IvParameterSpec iv = new IvParameterSpec(IV);
			DESKeySpec desKey = new DESKeySpec(secretKey.getBytes());
			// 创建一个密匙工厂，然后用它把DESKeySpec转换成
			SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
			SecretKey securekey = keyFactory.generateSecret(desKey);
			// Cipher对象实际完成加密操作
			Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
			// 用密匙初始化Cipher对象
			cipher.init(Cipher.ENCRYPT_MODE, securekey, iv);
			// 现在，获取数据并加密
			// 正式执行加密操作
			return cipher.doFinal(datasource);
		} catch (Throwable e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static void main(String[] args) {
		String temp = "M5uJaf9CNpucMEidSSw4d/CnJZbsvKEtKuOknwoUBY+izhBh2guvEA==";
		
		try {
			// 解密
			byte[] input = Base64.decodeBase64(temp);
			byte[] dec = decrypt(input,"11111111");
			String decString = new String(dec, "UTF-8");
			String[] loginInfo = decString.split("┋");
			System.out.println(loginInfo[0]+","+loginInfo[1]+","+loginInfo[2]);
			// 解密
			byte[] encStrings = encrypt(decString.getBytes(),"11111111");
			byte[] base = Base64.encodeBase64(encStrings);
			String inString = new String(base,"UTF-8");
			System.out.println(inString);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * 解密
	 * 
	 * @param src
	 *            byte[]
	 * @param secretKey
	 *            String
	 * @return byte[]
	 * @throws Exception
	 */
	public static byte[] decrypt(byte[] src, String secretKey) throws Exception {
		IvParameterSpec iv = new IvParameterSpec(IV);
		// 创建一个DESKeySpec对象
		DESKeySpec desKey = new DESKeySpec(secretKey.getBytes());
		// 创建一个密匙工厂
		SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
		// 将DESKeySpec对象转换成SecretKey对象
		SecretKey securekey = keyFactory.generateSecret(desKey);
		// Cipher对象实际完成解密操作
		Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
		// 用密匙初始化Cipher对象
		cipher.init(Cipher.DECRYPT_MODE, securekey, iv);
		// 真正开始解密操作
		return cipher.doFinal(src);
	}
}
