// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 修改头像 POST /api/customer/user/changeUserAvatar */
export async function postCustomerUserChangeUserAvatar(
  body: API.UserChangeAvatarRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/customer/user/changeUserAvatar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改密码 POST /api/customer/user/changeUserPassword */
export async function postCustomerUserChangeUserPassword(
  body: API.UserChangePasswordRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/customer/user/changeUserPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 打卡 GET /api/customer/user/clockIn */
export async function getCustomerUserClockIn(options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/customer/user/clockIn', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取自身信息 GET /api/customer/user/getUserInfo */
export async function getCustomerUserGetUserInfo(options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/customer/user/getUserInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 设置用户通知 POST /api/customer/user/setUserNotice */
export async function postCustomerUserSetUserNotice(
  body: API.User,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/customer/user/setUserNotice', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
