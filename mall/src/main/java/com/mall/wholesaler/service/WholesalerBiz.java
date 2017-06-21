package com.mall.wholesaler.service;

import com.mall.wholesaler.pojo.Shop;
import com.mall.wholesaler.pojo.User;

public interface WholesalerBiz {
    int createWholesaler(User user, Shop shop);
}
