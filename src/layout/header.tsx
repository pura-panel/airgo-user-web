'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage, useTranslation } from '@/i18n';
import { userLogout, useUserInfo } from '@/stores/userInfo';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Book, Bot, Home, ListOrdered, LogOut, Store, User, Wallet } from 'lucide-react';
import { SITE_NAME } from '@/lib/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SwitchLanguage from './switch-language';

export function LayoutHeader() {
  const { lng } = useLanguage();
  const { t } = useTranslation(lng, 'header');
  const { userInfo } = useUserInfo();
  const router = useRouter();
  const navs = [
    {
      title: '主页',
      icon: <Home className='mr-2 size-4' />,
      href: `/${lng}/user`,
    },
    {
      title: '购买订阅',
      icon: <Store className='mr-2 size-4' />,
      href: `/${lng}/user/store`,
    },
    {
      title: '我的订单',
      icon: <ListOrdered className='mr-2 size-4' />,
      href: `/${lng}/user/orders`,
    },
    {
      title: '个人信息',
      icon: <User className='mr-2 size-4' />,
      href: `/${lng}/user/profile`,
    },
    {
      title: '使用文档',
      icon: <Book className='mr-2 size-4' />,
      href: `/${lng}/user/docs`,
    },
    {
      title: '我的工单',
      icon: <Bot className='mr-2 size-4' />,
      href: `/${lng}/user/tickets`,
    },
    {
      title: '财务中心',
      icon: <Wallet className='mr-2 size-4' />,
      href: `/${lng}/user/wallet`,
    },
  ];
  return (
    <header className='sticky top-0 z-40 w-full border-b backdrop-blur-md'>
      <div className='container flex h-16 items-center justify-between'>
        <div className='flex gap-6'>
          <Link href='/' className='flex items-center space-x-2'>
            <Image src='/favicon.svg' alt='logo' width={1024} height={1024} className='size-12' />
            <span className='inline-block font-bold'>{SITE_NAME}</span>
          </Link>
        </div>

        <div className='flex flex-1 items-center justify-end gap-4'>
          <div className='flex items-center gap-1'>
            <SwitchLanguage />
            {!userInfo && (
              <>
                <Link href={`/${lng}/auth/login`}>
                  <Button>{t('login')}</Button>
                </Link>
                <Link href={`/${lng}/auth/sign-up`}>
                  <Button variant='outline'>{t('sign-up')}</Button>
                </Link>
              </>
            )}

            {userInfo && (
              <>
                <Avatar className='mr-2 size-6'>
                  <AvatarImage src={userInfo.avatar} alt={userInfo.user_name} />
                  <AvatarFallback className='flex size-full items-center justify-center rounded-full bg-muted-foreground text-center'>
                    {userInfo.user_name.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' size='icon'>
                      <HamburgerMenuIcon className='size-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    {navs.map((nav, index) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={() => {
                          router.push(nav.href);
                        }}
                      >
                        {nav.icon}
                        {nav.title}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        userLogout();
                        router.push(`/${lng}`);
                      }}
                    >
                      <LogOut className='mr-2 size-4' />
                      退出登录
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
