// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** reality x25519 GET /api/admin/node/createx25519 */
export async function getAdminNodeCreatex25519(options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/node/createx25519', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 删除节点 DELETE /api/admin/node/deleteNode */
export async function deleteAdminNodeDeleteNode(body: API.Node, options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/node/deleteNode', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取节点列表 POST /api/admin/node/getNodeList */
export async function postAdminNodeGetNodeList(
  body: API.QueryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/node/getNodeList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取节点列表，带流量信息 POST /api/admin/node/getNodeListWithTraffic */
export async function postAdminNodeGetNodeListWithTraffic(
  body: API.QueryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/node/getNodeListWithTraffic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取节点服务器状态 GET /api/admin/node/getNodeServerStatus */
export async function getAdminNodeGetNodeServerStatus(options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/node/getNodeServerStatus', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 新建节点 POST /api/admin/node/newNode */
export async function postAdminNodeNewNode(body: API.Node, options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/node/newNode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增共享节点 POST /api/admin/node/newNodeShared */
export async function postAdminNodeNewNodeShared(
  body: API.Node[],
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/node/newNodeShared', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 节点排序 POST /api/admin/node/nodeSort */
export async function postAdminNodeNodeSort(body: API.Node[], options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/node/nodeSort', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 解析 POST /api/admin/node/parseUrl */
export async function postAdminNodeParseUrl(
  body: API.NodeSharedReq,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/node/parseUrl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新节点 POST /api/admin/node/updateNode */
export async function postAdminNodeUpdateNode(body: API.Node, options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/admin/node/updateNode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
