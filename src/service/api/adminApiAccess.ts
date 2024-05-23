// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 删除访问控制 DELETE /api/admin/access/deleteAccess */
export async function deleteAdminAccessDeleteAccess(
  body: API.Access,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/access/deleteAccess', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询路由控制列表 POST /api/admin/access/getAccessList */
export async function postAdminAccessGetAccessList(
  body: API.QueryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/access/getAccessList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新建访问控制 POST /api/admin/access/newAccess */
export async function postAdminAccessNewAccess(body: API.Access, options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/access/newAccess', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改路由控制 POST /api/admin/access/updateAccess */
export async function postAdminAccessUpdateAccess(
  body: API.Access,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/access/updateAccess', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
