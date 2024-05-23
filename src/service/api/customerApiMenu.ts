// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 获取用户菜单 GET /api/customer/menu/getMenuList */
export async function getCustomerMenuGetMenuList(options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/customer/menu/getMenuList', {
    method: 'GET',
    ...(options || {}),
  });
}
