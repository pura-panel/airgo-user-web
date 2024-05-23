// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 查询已启用商品列表 GET /api/customer/shop/getEnabledGoodsList */
export async function getCustomerShopGetEnabledGoodsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCustomerShopGetEnabledGoodsListParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/customer/shop/getEnabledGoodsList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 支付主逻辑 POST /api/customer/shop/purchase */
export async function postCustomerShopPurchase(body: API.Order, options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/customer/shop/purchase', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
