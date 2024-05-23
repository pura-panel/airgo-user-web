// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 获取已激活支付列表 GET /api/customer/pay/getEnabledPayList */
export async function getCustomerPayGetEnabledPayList(options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/customer/pay/getEnabledPayList', {
    method: 'GET',
    ...(options || {}),
  });
}
