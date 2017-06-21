package com.mall.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.Writer;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * @Version:1.0.0
 */
public class AddJsAndCssVersionToVm {
	/**
	 * 默认html 文件路径
	 */
	private static String path = "src/main/Webapp/views/";
	/**
	 * 默认js 文件路径
	 */
	private static String jspath = "src/main/Webapp/static/";

	/**
	 * 初始化
	 * 
	 * @Version:
	 */
	public static void execute() {
		Date date = new Date();
		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddhhmmss");
		String version = df.format(date);
		Map<String, String> map = getJsMap(jspath);
		addVersionToVm(path, version, map);
	}

	/**
	 * 获取js 与css 版本map
	 * 
	 * @Version:
	 * @param path
	 * @return
	 */
	public static Map<String, String> getJsMap(String path) {
		Map<String, String> map = new HashMap<String, String>();
		File dir = new File(path);
		File[] files = dir.listFiles();
		if (files == null)
			return map;
		for (int i = 0; i < files.length; i++) {
			if (files[i].isDirectory()) {
				getVersionMap(files[i].getAbsolutePath(), map);
			} else {
				String strFileName = files[i].getAbsolutePath().toLowerCase();
				files[i].getName();
				// 如果是符合条件的文件，则添加版本信息
				if (strFileName.endsWith(".js")) {
					try {
						String md5 = MD5FileUtil.getFileMD5String(files[i]);
						map.put(files[i].getName(), md5);
						System.out.println(strFileName + "---------------"
								+ md5 + "-----" + files[i].getName());
						System.out.println(files[i].getPath());
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}
		}
		return map;
	}

	/**
	 * 遍历web目录中的vm文件，给js和css的引用加上版本号
	 * 
	 * @param path
	 *            路径
	 * @param version
	 *            默 认版本
	 * @param map
	 *            版本map
	 */
	private static void addVersionToVm(String path, String version,
			Map<String, String> map) {
		File dir = new File(path);
		File[] files = dir.listFiles();
		if (files == null) {
			return;
		}
		for (int i = 0; i < files.length; i++) {
			if (files[i].isDirectory()) {
				addVersionToVm(files[i].getAbsolutePath(), version, map);
			} else {
				String strFileName = files[i].getAbsolutePath().toLowerCase();
				// 如果是符合条件的文件，则添加版本信息
				if (strFileName.endsWith(".vm")
						|| strFileName.endsWith(".html")
						|| strFileName.endsWith(".jsp")) {
					// RandomAccessFile raf = null;
					InputStream is = null;
					OutputStream os = null;
					List<String> contentList = new ArrayList<String>();

					// 读文件
					try {
						is = new FileInputStream(files[i]);
						Reader r = new InputStreamReader(is);
						BufferedReader br = new BufferedReader(r);
						String line = null;
						while ((line = br.readLine()) != null) {
							String modLine = getModLine(line, version, map);
							if (modLine != null) {
								line = modLine;
							}
							line = line + "\r\n";
							contentList.add(line);
						}
						// 关闭流
						br.close();
						r.close();
					} catch (Exception e) {
						System.out.println("读文件失败");
						e.printStackTrace();
					} finally {
						if (null != is) {
							try {
								is.close();
							} catch (Exception e) {
								e.printStackTrace();
							}
						}

					}

					// 写文件
					try {
						os = new FileOutputStream(files[i]);
						Writer w = new OutputStreamWriter(os);
						BufferedWriter bw = new BufferedWriter(w);
						for (Iterator<String> it = contentList.iterator(); it
								.hasNext();) {
							String line = it.next();
							bw.write(line);
						}
						// 更新到文件
						bw.flush();
						// 关闭流
						bw.close();
						w.close();
					} catch (Exception e) {
						System.out.println("写文件失败");
						e.printStackTrace();
					} finally {
						if (null != os) {
							try {
								os.close();
							} catch (Exception e) {
								e.printStackTrace();
							}
						}
					}
				}
			}
		}
	}

	/**
	 * 获取js 与css map key 文件名 value md5值
	 * 
	 * @Version:
	 * @param path
	 *            路径
	 * @param map
	 *            map
	 */
	public static void getVersionMap(String path, Map<String, String> map) {
		File dir = new File(path);
		File[] files = dir.listFiles();
		if (files == null) {
			return;
		}
		for (int i = 0; i < files.length; i++) {
			if (files[i].isDirectory()) {
				getVersionMap(files[i].getAbsolutePath(), map);
			} else {
				String strFileName = files[i].getAbsolutePath().toLowerCase();
				// 如果是符合条件的文件，则添加版本信息
				if (strFileName.endsWith(".js") || strFileName.endsWith(".css")) {
					try {
						String md5 = MD5FileUtil.getFileMD5String(files[i]);
						map.put(strFileName, md5);
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}

	}

	/**
	 * 
	 * 查找文件需要的版本号的js 与css 行
	 * 
	 * @param line
	 *            行字符
	 * @param version
	 *            默认版本
	 * @param map
	 *            md5 map
	 * @return
	 */
	private static String getModLine(String line, String version,
			Map<String, String> map) {
		// 增加js版本
		line = line.trim();
		if (line != null && line.indexOf("nocache") > -1) {
			return null;
		} else if (line.startsWith("<script") && line.endsWith("</script>")) {
			int pos = line.indexOf(".js");
			if (pos > -1) {
				// 默认加时间为版本号
				System.out.println("许威添加：" + line);
				String modLine = line.substring(0, pos) + ".js?version="
						+ version + "\"></script>";
				String[] nameStr = line.split("/");
				for (int i = 0; i < nameStr.length; i++) {
					String jsname = nameStr[i];
					if (jsname.indexOf(".js") != -1) {
						int jsindex = jsname.indexOf(".js") + 3;
						String key = jsname.substring(0, jsindex);
						String md5 = map.get(key);
						if (md5 != null) {
							modLine = line.substring(0, pos) + ".js?version="
									+ md5 + "\"></script>";
						}
						System.out.println("--------------" + modLine);
					}
				}
				return modLine;
			} else {
				return null;
			}
		} else if (line.startsWith("<link")
		// && line.endsWith("rel=\"stylesheet\" type=\"text/css\"/>")
				&& line.endsWith("/>")) {
			int pos = line.indexOf(".css");
			String modLine = line.substring(0, pos) + ".css?version=" + version
					+ "\" rel=\"stylesheet\" type=\"text/css\"/>";
			String[] nameStr = line.split("/");
			for (int i = 0; i < nameStr.length; i++) {
				String jsname = nameStr[i];
				if (jsname.indexOf(".css") != -1) {
					int jsindex = jsname.indexOf(".js") + 4;
					String key = jsname.substring(0, jsindex);
					String md5 = map.get(key);
					if (md5 != null) {
						modLine = line.substring(0, pos) + ".css?version="
								+ md5
								+ "\" rel=\"stylesheet\" type=\"text/css\"/>";
					}
					System.out.println("--------------" + modLine);
				}
			}
			return modLine;
		} else {
			return null;
		}
	}

	public static void main(String[] str) {
		AddJsAndCssVersionToVm.execute();
	}
}
