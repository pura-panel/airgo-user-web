// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 获取文章列表 POST /api/customer/article/getArticleList */
export async function postCustomerArticleGetArticleList(
  body: API.QueryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/customer/article/getArticleList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
