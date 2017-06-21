package com.mall.wholesaler.serivceImp;

import javax.annotation.Resource;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.mall.wholesaler.dao.WholesalerDao;
import com.mall.wholesaler.pojo.Shop;
import com.mall.wholesaler.pojo.User;
import com.mall.wholesaler.service.WholesalerBiz;

@Service("wholesalerBizImpl")
public class WholesalerBizImpl implements WholesalerBiz {

    @Resource
    WholesalerDao wholesalerDao;

    @Transactional
    public int createWholesaler(User user, Shop shop) {
	User aUser = user;
	int userId = wholesalerDao.CreateWlUser(aUser);
	shop.setUserId(user.getUerId());
	wholesalerDao.CreateShop(shop);
	// TODO Auto-generated method stub
	return 0;
    }

}
