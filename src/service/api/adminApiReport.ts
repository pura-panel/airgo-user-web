// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 获取字段名,类型值 POST /api/admin/report/getColumn */
export async function postAdminReportGetColumn(
  body: API.DbTableReq,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/report/getColumn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取数据库的所有表名 POST /api/admin/report/getTables */
export async function postAdminReportGetTables(
  body: API.DbTableReq,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/report/getTables', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取报表 POST /api/admin/report/reportSubmit */
export async function postAdminReportReportSubmit(
  body: API.QueryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/report/reportSubmit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
