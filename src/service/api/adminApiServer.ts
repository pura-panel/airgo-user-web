// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 获取当前版本 GET /api/admin/server/getCurrentVersion */
export async function getAdminServerGetCurrentVersion(options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/server/getCurrentVersion', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取最新版本 GET /api/admin/server/getLatestVersion */
export async function getAdminServerGetLatestVersion(options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/server/getLatestVersion', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取系统设置 GET /api/admin/server/getSetting */
export async function getAdminServerGetSetting(options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/server/getSetting', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 升级最新版本 GET /api/admin/server/updateLatestVersion */
export async function getAdminServerUpdateLatestVersion(options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/server/updateLatestVersion', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新系统设置 POST /api/admin/server/updateSetting */
export async function postAdminServerUpdateSetting(
  body: API.Server,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/server/updateSetting', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新主题 POST /api/admin/server/updateThemeConfig */
export async function postAdminServerUpdateThemeConfig(
  body: API.Theme,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/server/updateThemeConfig', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
