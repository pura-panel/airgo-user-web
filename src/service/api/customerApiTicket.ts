// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 获取工单 POST /api/customer/ticket/firstTicket */
export async function postCustomerTicketFirstTicket(
  body: API.Ticket,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/customer/ticket/firstTicket', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取工单列表 POST /api/customer/ticket/getUserTicketList */
export async function postCustomerTicketGetUserTicketList(
  body: API.QueryParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/customer/ticket/getUserTicketList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新建工单 POST /api/customer/ticket/newTicket */
export async function postCustomerTicketNewTicket(
  body: API.Ticket,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/customer/ticket/newTicket', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发送工单消息 POST /api/customer/ticket/sendTicketMessage */
export async function postCustomerTicketSendTicketMessage(
  body: API.TicketMessage,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/customer/ticket/sendTicketMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新工单 POST /api/customer/ticket/updateUserTicket */
export async function postCustomerTicketUpdateUserTicket(
  body: API.Ticket,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/customer/ticket/updateUserTicket', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
