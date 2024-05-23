// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 删除折扣 DELETE /api/admin/coupon/deleteCoupon */
export async function deleteAdminCouponDeleteCoupon(
  body: API.Coupon,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/coupon/deleteCoupon', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取折扣列表 POST /api/admin/coupon/getCouponList */
export async function postAdminCouponGetCouponList(options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/coupon/getCouponList', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 新建折扣 POST /api/admin/coupon/newCoupon */
export async function postAdminCouponNewCoupon(body: API.Coupon, options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/coupon/newCoupon', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新折扣 POST /api/admin/coupon/updateCoupon */
export async function postAdminCouponUpdateCoupon(
  body: API.Coupon,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/coupon/updateCoupon', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
