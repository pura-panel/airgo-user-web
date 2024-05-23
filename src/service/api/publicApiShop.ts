// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 支付宝异步回调 POST /api/public/shop/alipayNotify */
export async function postPublicShopAlipayNotify(options?: { [key: string]: any }) {
  return request<any>('/api/public/shop/alipayNotify', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 易支付异步回调 GET /api/public/shop/epayNotify */
export async function getPublicShopEpayNotify(
  body: API.EpayResultResponse,
  options?: { [key: string]: any },
) {
  return request<string>('/api/public/shop/epayNotify', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
