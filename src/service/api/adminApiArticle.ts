// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 删除文章 DELETE /api/admin/article/deleteArticle */
export async function deleteAdminArticleDeleteArticle(
  body: API.Article,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/article/deleteArticle', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取文章列表 POST /api/admin/article/getArticleList */
export async function postAdminArticleGetArticleList(
  body: API.QueryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/article/getArticleList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新建文章 POST /api/admin/article/newArticle */
export async function postAdminArticleNewArticle(
  body: API.Article,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/article/newArticle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新文章 POST /api/admin/article/updateArticle */
export async function postAdminArticleUpdateArticle(
  body: API.Article,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/article/updateArticle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
