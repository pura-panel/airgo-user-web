// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 获取订阅流量记录 POST /api/customer/traffic/getSubTrafficList */
export async function postCustomerTrafficGetSubTrafficList(
  body: API.CustomerService,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/customer/traffic/getSubTrafficList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
