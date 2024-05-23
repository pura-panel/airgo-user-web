// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 获取公共系统设置 GET /api/public/server/getPublicSetting */
export async function getPublicServerGetPublicSetting(options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/public/server/getPublicSetting', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取主题 GET /api/public/server/getThemeConfig */
export async function getPublicServerGetThemeConfig(options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/public/server/getThemeConfig', {
    method: 'GET',
    ...(options || {}),
  });
}
