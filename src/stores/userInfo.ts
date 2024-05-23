import { getCustomerUserGetUserInfo } from '@/service/api/customerApiUser';
import { getPublicServerGetPublicSetting } from '@/service/api/publicApiServer';
import { useQuery } from '@tanstack/react-query';
import { proxy, useSnapshot } from 'valtio';
import { subscribeKey } from 'valtio/utils';
import { deleteCookie, getCookie, setCookie } from '@/lib/cookies';

export interface IUserInfo {
  token: string;
  user: any;
  publicConfig: any;
}

export const userInfo = proxy<IUserInfo>({
  token: getCookie('Authorization') || '',
  user: getLocalStorage('user'),
  publicConfig: getLocalStorage('publicConfig'),
});

function getLocalStorage(key: string) {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : null;
}

subscribeKey(userInfo, 'publicConfig', () => {
  localStorage.setItem('publicConfig', JSON.stringify(userInfo.user));
});

subscribeKey(userInfo, 'user', () => {
  localStorage.setItem('user', JSON.stringify(userInfo.user));
});

export function userLogin(token: string) {
  setCookie('Authorization', token);
  userInfo.token = token;
}

export function setUser(user: any) {
  userInfo.user = user;
}

export function setConfig(publicConfig: any) {
  userInfo.publicConfig = publicConfig;
}

export function userLogout() {
  userInfo.token = '';
  userInfo.user = null;
  deleteCookie('Authorization');
}

export function useUserInfo() {
  const { user, token } = useSnapshot(userInfo);
  const { refetch, isFetching } = useQuery({
    enabled: Boolean(token && !user?.id),
    queryKey: ['getCustomerUserGetUserInfo'],
    queryFn: async () => {
      const result = await getCustomerUserGetUserInfo();
      setUser(result.data?.data);
      return result.data?.data || {};
    },
  });

  return {
    userInfo: user,
    getUserInfo: refetch,
    isFetching,
  };
}

export function usePublicConfig() {
  const { publicConfig } = useSnapshot(userInfo);

  useQuery({
    queryKey: ['getPublicServerGetPublicSetting'],
    queryFn: async () => {
      const result = await getPublicServerGetPublicSetting();
      const data = result.data?.data;
      const config = {
        ...data,
        acceptable_email_suffixes: data.acceptable_email_suffixes.split('\n'),
        backend_url: data.backend_url.split('\n'),
      };
      userInfo.publicConfig = config;
      return config || {};
    },
  });

  return publicConfig;
}
