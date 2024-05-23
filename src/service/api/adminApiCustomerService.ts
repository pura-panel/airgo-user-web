// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 删除客户服务 DELETE /api/admin/customerService/deleteCustomerService */
export async function deleteAdminCustomerServiceDeleteCustomerService(
  body: API.CustomerService,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/customerService/deleteCustomerService', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户服务列表 POST /api/admin/customerService/getCustomerServiceList */
export async function postAdminCustomerServiceGetCustomerServiceList(
  body: API.CustomerService,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/customerService/getCustomerServiceList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新客户服务 POST /api/admin/customerService/updateCustomerService */
export async function postAdminCustomerServiceUpdateCustomerService(
  body: API.CustomerService,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/customerService/updateCustomerService', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
