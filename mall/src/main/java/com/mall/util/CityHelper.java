package com.mall.util;

public class CityHelper {
    /**
     * 根据业务ID获得类实例
     * 
     * @param binName
     *            业务ID
     * @return
     */
    public static String getClassImpByBinName(char binName) {
	String imp = "";
	switch (binName) {
	case 'X':// 项目
	    imp = "ProjectService";
	    break;
	case 'Y':// 预售证
	    imp = "PreSellService";
	    break;
	case 'G':// 供应
	    imp = "SupplyService";
	    break;
	case 'C':// 成交
	    imp = "VolumeService";
	    break;
	case 'H':// 汇总
	    imp = "SummaryService";
	    break;
	case 'V':// 可售
	    imp = "VendibilityService";
	    break;
	default:
	    imp = "ProjectService";
	    break;
	}
	return imp;
    }
}
