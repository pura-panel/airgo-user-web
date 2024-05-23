// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 上报节点状态 POST /api/public/airgo/node/AGReportNodeStatus */
export async function postPublicAirgoNodeAgReportNodeStatus(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postPublicAirgoNodeAGReportNodeStatusParams,
  body: API.AGNodeStatus,
  options?: { [key: string]: any },
) {
  return request<string>('/api/public/airgo/node/AGReportNodeStatus', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取节点配置信息 GET /api/public/airgo/node/getNodeInfo */
export async function getPublicAirgoNodeGetNodeInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPublicAirgoNodeGetNodeInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.Node>('/api/public/airgo/node/getNodeInfo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取用户列表 GET /api/public/airgo/user/AGGetUserlist */
export async function getPublicAirgoUserAgGetUserlist(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getPublicAirgoUserAGGetUserlistParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/public/airgo/user/AGGetUserlist', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 上报在线用户 POST /api/public/airgo/user/AGReportNodeOnlineUsers */
export async function postPublicAirgoUserAgReportNodeOnlineUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postPublicAirgoUserAGReportNodeOnlineUsersParams,
  body: API.AGOnlineUser,
  options?: { [key: string]: any },
) {
  return request<string>('/api/public/airgo/user/AGReportNodeOnlineUsers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 上报用户流量 POST /api/public/airgo/user/AGReportUserTraffic */
export async function postPublicAirgoUserAgReportUserTraffic(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postPublicAirgoUserAGReportUserTrafficParams,
  body: API.AGUserTraffic,
  options?: { [key: string]: any },
) {
  return request<string>('/api/public/airgo/user/AGReportUserTraffic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}
