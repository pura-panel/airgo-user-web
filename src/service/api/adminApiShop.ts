// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 删除商品 DELETE /api/admin/shop/deleteGoods */
export async function deleteAdminShopDeleteGoods(
  body: API.Goods,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/shop/deleteGoods', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询全部商品 GET /api/admin/shop/getGoodsList */
export async function getAdminShopGetGoodsList(options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/shop/getGoodsList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 商品排序 POST /api/admin/shop/goodsSort */
export async function postAdminShopGoodsSort(body: API.Goods[], options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/shop/goodsSort', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新建商品 POST /api/admin/shop/newGoods */
export async function postAdminShopNewGoods(body: API.Goods, options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/shop/newGoods', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新商品 POST /api/admin/shop/updateGoods */
export async function postAdminShopUpdateGoods(body: API.Goods, options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/shop/updateGoods', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
