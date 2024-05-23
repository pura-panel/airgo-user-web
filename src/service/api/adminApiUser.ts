// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 删除用户 DELETE /api/admin/user/deleteUser */
export async function deleteAdminUserDeleteUser(body: API.User, options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/user/deleteUser', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户列表 POST /api/admin/user/getUserlist */
export async function postAdminUserGetUserlist(
  body: API.QueryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/user/getUserlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新建用户 POST /api/admin/user/newUser */
export async function postAdminUserNewUser(body: API.User, options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/user/newUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑用户信息 POST /api/admin/user/updateUser */
export async function postAdminUserUpdateUser(body: API.User, options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/user/updateUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户统计 POST /api/admin/user/userSummary */
export async function postAdminUserUserSummary(
  body: API.QueryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/user/userSummary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
