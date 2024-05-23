// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 获取图片验证码 GET /api/public/code/getBase64Captcha */
export async function getPublicCodeGetBase64Captcha(options?: { [key: string]: any }) {
  return request<API.ResponseStruct>('/api/public/code/getBase64Captcha', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取邮箱验证码 POST /api/public/code/getEmailCode */
export async function postPublicCodeGetEmailCode(
  body: API.EmailRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/public/code/getEmailCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
