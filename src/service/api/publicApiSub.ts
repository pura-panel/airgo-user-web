// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 获取订阅 GET /api/public/sub/${param0}/${param1} */
export async function getPublicSubIdName(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPublicSubIdNameParams,
  options?: { [key: string]: any },
) {
  const { id: param0, name: param1, ...queryParams } = params;
  return request<string>(`/api/public/sub/${param0}/${param1}`, {
    method: 'GET',
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}
