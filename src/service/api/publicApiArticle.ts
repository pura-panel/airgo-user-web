// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 获取默认的首页弹窗和自定义内容 GET /api/public/article/getDefaultArticleList */
export async function getPublicArticleGetDefaultArticleList(options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/public/article/getDefaultArticleList', {
    method: 'GET',
    ...(options || {}),
  });
}
