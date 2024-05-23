// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 删除角色 DELETE /api/admin/role/delRole */
export async function deleteAdminRoleDelRole(body: API.Role, options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/role/delRole', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取全部权限 GET /api/admin/role/getAllPolicy */
export async function getAdminRoleGetAllPolicy(options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/role/getAllPolicy', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取权限列表ByRoleId POST /api/admin/role/getPolicyByID */
export async function postAdminRoleGetPolicyById(
  body: API.CasbinInfo,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/role/getPolicyByID', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取角色列表 GET /api/admin/role/getRoleList */
export async function getAdminRoleGetRoleList(options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/role/getRoleList', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 新建角色 POST /api/admin/role/newRole */
export async function postAdminRoleNewRole(body: API.Role, options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/role/newRole', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改角色信息 POST /api/admin/role/updateRole */
export async function postAdminRoleUpdateRole(body: API.Role, options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/role/updateRole', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
