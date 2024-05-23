// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 用户登录 POST /api/public/user/login */
export async function postPublicUserLogin(
  body: API.UserLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/public/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户注册 POST /api/public/user/register */
export async function postPublicUserRegister(
  body: API.UserRegister,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/public/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 重置密码 POST /api/public/user/resetUserPassword */
export async function postPublicUserResetUserPassword(
  body: API.UserLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/public/user/resetUserPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
