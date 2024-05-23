// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 删除工单 DELETE /api/admin/ticket/deleteTicket */
export async function deleteAdminTicketDeleteTicket(
  body: API.Ticket,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/ticket/deleteTicket', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取工单 POST /api/admin/ticket/firstTicket */
export async function postAdminTicketFirstTicket(
  body: API.Ticket,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/ticket/firstTicket', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取工单列表 POST /api/admin/ticket/getTicketList */
export async function postAdminTicketGetTicketList(
  body: API.QueryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/ticket/getTicketList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发送工单消息 POST /api/admin/ticket/sendTicketMessage */
export async function postAdminTicketSendTicketMessage(
  body: API.TicketMessage,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/ticket/sendTicketMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新工单 POST /api/admin/ticket/updateTicket */
export async function postAdminTicketUpdateTicket(
  body: API.Ticket,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/ticket/updateTicket', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
