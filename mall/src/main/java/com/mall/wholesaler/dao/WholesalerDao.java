package com.mall.wholesaler.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.mall.wholesaler.pojo.Shop;
import com.mall.wholesaler.pojo.User;

@Repository("wholesalerDao")
public interface WholesalerDao {
    // 创建批发商用户
    int CreateWlUser(@Param("user") User user);

    // 创建店铺
    int CreateShop(@Param("shop") Shop shop);

    // 修改批发商店铺
    int updateShop(@Param("shop") Shop shop);
}
