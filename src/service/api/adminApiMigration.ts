// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** 数据迁移 POST /api/admin/migration/migrationData */
export async function postAdminMigrationMigrationData(
  body: API.Migration,
  options?: { [key: string]: any },
) {
  return request<API.ResponseStruct>('/api/admin/migration/migrationData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
