// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 删除菜单 DELETE /api/admin/menu/delMenu */
export async function deleteAdminMenuDelMenu(body: API.Menu, options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/menu/delMenu', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取全部菜单列表 GET /api/admin/menu/getAllMenuList */
export async function getAdminMenuGetAllMenuList(options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/menu/getAllMenuList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 新建菜单 POST /api/admin/menu/newMenu */
export async function postAdminMenuNewMenu(body: API.Menu, options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/menu/newMenu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改菜单 POST /api/admin/menu/updateMenu */
export async function postAdminMenuUpdateMenu(body: API.Menu, options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/menu/updateMenu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
