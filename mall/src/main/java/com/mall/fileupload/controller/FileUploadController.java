package com.mall.fileupload.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.mall.fileupload.bean.FileModel;
import com.mall.fileupload.biz.impl.FileUploadBizImpl;
import com.mall.sso.constrants.SingleSignOn;

/**
 * <p>
 * Description: 文件上传 提供单文件多文件 h5 multiple 上传<br>
 * 既能用form提交也可以ajax formdata提交 返回 List<FileModel>
 * </p>
 * 
 * @author wliu 33185
 * @date 2016年7月7日 下午4:15:34
 */
@Controller
@RequestMapping("fileUploadController")
public class FileUploadController {

	private static Logger log = Logger.getLogger(FileUploadController.class);

	@Resource
	FileUploadBizImpl fileUploadBizImpl;

	@Resource
	private SingleSignOn singleSignOn;

	private static String[] allowFiles = { ".rar", ".doc", ".docx", ".zip",
			".pdf", ".txt", ".swf", ".wmv", ".gif", ".png", ".jpg", ".jpeg",
			".bmp" };

	private static List<String> allowFilesList;

	static {
		allowFilesList = new ArrayList<String>();
		for (String item : allowFiles) {
			allowFilesList.add(item);
		}
	}
	// kb
	private long defaultSize = 2048;

	private final static int ERR_TYPE = 1;

	private final static int ERR_SIZE = 2;

	public void setAllowFiles(String[] allowFiles) {
		allowFilesList.clear();
		for (String item : allowFiles) {
			allowFilesList.add(item);
		}
		FileUploadController.allowFiles = allowFiles;
	}

	@RequestMapping("fileUpload")
	@ResponseBody
	public String fileUpload(CommonsMultipartResolver multipartResolver,
			HttpServletRequest request, HttpSession session) throws IOException {
		List<FileModel> list = new ArrayList<FileModel>();
		int result = 0;
		if (multipartResolver.isMultipart(request)) {
			// 路径
			String path = singleSignOn.getFileUploadUrl();
			// 图片类型
			String allowFiles = request.getParameter("allowFiles");
			// 图片大小
			String allowSize = request.getParameter("allowSize");
			
			if (allowFiles != null && !allowFiles.isEmpty()) {
				JSONArray arr = JSONArray.parseArray(allowFiles);
				for (int i = 0; i < arr.size(); i++) {
					allowFilesList.clear();
					allowFilesList.add(arr.getString(i));
				}
			}
			if (allowSize != null && !allowSize.isEmpty()) {
				defaultSize = Integer.parseInt(allowSize);
			}
			// 图片大小
			MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
			// 获取名称
			Iterator<String> iterator = multiRequest.getFileNames();
			while (iterator.hasNext()) {
				List<MultipartFile> files = multiRequest.getFiles(iterator
						.next());
				for (MultipartFile file : files) {
					String oriFileName = file.getOriginalFilename();
					if (oriFileName != null && !"".equals(oriFileName)) {
						FileModel fModel = new FileModel();
						fModel.setAllowFiles(allowFilesList.toString());
						fModel.setAllowSize(String.valueOf(defaultSize));
						fModel.setFlag(result);
						list.add(fModel);
						String suffix = oriFileName.substring(oriFileName
								.lastIndexOf("."));
						// 大小 文件类型限制 给出默认大小和类型限制
						if (!allowFilesList.contains(suffix.toLowerCase())) {
							fModel.setFlag(ERR_TYPE);
							result = ERR_TYPE;
							continue;
						}
						if (file.getSize() / 1024 > defaultSize) {
							fModel.setFlag(ERR_SIZE);
							result = ERR_SIZE;
							continue;
						}

						String newName = UUID.randomUUID().toString()
								.replace("-", "")
								+ suffix;
						// 增加以当天时间命名的文件夹  如:20160802
						String format = "yyyyMMdd";
						SimpleDateFormat sdf = new SimpleDateFormat(format);
						String temp = sdf.format(new Date());
						
						String newFilePath = path +File.separator+ temp + File.separator + newName;
						String relativePath = File.separator+ temp + File.separator + newName;
						
						File newFile = new File(newFilePath);
						if(!newFile.exists()){
							newFile.mkdirs();
						}
						long startTime = System.currentTimeMillis();
						// 比常规写的输入输出流效率高的不只一点半点
						file.transferTo(newFile);
						long finalTime = System.currentTimeMillis();
						double uploadTime = ((double) finalTime - (double) startTime)
								/ (double) 1000;
						log.debug(oriFileName + "文件大小:" + file.getSize()
								+ " 上传耗时(s):" + uploadTime);
						fModel.setName(oriFileName);
						fModel.setOriginalName(newName);
						fModel.setUrl(relativePath);
						fModel.setSize(file.getSize() / 1024);
						fModel.setCost(uploadTime);
						fModel.setType(file.getContentType());
						// 具体信息入库
						fileUploadBizImpl.insertFileInfo(fModel);
						log.debug("fModel:\n" + fModel.toString());
					}
				}
			}
		}
		return JSONObject.toJSONString(list);
	}

	@RequestMapping("file")
	public void file(@RequestParam(value = "id", required = true) String id,
			HttpServletRequest request, HttpServletResponse response) {
		Map<String, String> fileInfo = fileUploadBizImpl.selectFileInfo(id);
		String prefix = singleSignOn.getFileUploadUrl();
		String url = prefix + fileInfo.get("url");
		String contentType = fileInfo.get("type");
		FileInputStream is = null;
		try {
			is = new FileInputStream(url);
			int i = is.available();
			byte data[] = new byte[i];
			is.read(data);
			response.setContentType(contentType);
			OutputStream ops = response.getOutputStream();
			ops.write(data);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (is != null) {
					is.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}

	public void setDefaultSize(long defaultSize) {
		this.defaultSize = defaultSize;
	}

}
