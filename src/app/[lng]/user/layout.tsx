'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Book, Bot, Home, ListOrdered, Store, User, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UserLayout({
  params: { lng },
  children,
}: {
  params: { lng: string };
  children: React.ReactNode;
}) {
  const navs = [
    {
      title: '主页',
      icon: <Home className='mr-2 size-5' />,
      href: `/${lng}/user`,
    },
    {
      title: '购买订阅',
      icon: <Store className='mr-2 size-5' />,
      href: `/${lng}/user/store`,
    },
    {
      title: '我的订单',
      icon: <ListOrdered className='mr-2 size-5' />,
      href: `/${lng}/user/orders`,
    },
    {
      title: '个人信息',
      icon: <User className='mr-2 size-5' />,
      href: `/${lng}/user/profile`,
    },
    {
      title: '使用文档',
      icon: <Book className='mr-2 size-5' />,
      href: `/${lng}/user/docs`,
    },
    {
      title: '我的工单',
      icon: <Bot className='mr-2 size-5' />,
      href: `/${lng}/user/tickets`,
    },
    {
      title: '财务中心',
      icon: <Wallet className='mr-2 size-5' />,
      href: `/${lng}/user/wallet`,
    },
  ];
  const pathname = usePathname();
  const currentHref = pathname.includes(lng) ? pathname : `/${lng}${pathname}`;

  return (
    <div className='container flex gap-6 align-top'>
      <nav className='sticky top-[84px] hidden h-96 w-52 shrink-0 flex-col gap-2 text-muted-foreground md:flex lg:flex'>
        {navs.map((nav, index) => (
          <Link href={nav.href} key={index}>
            <Button
              variant={currentHref === nav.href ? 'default' : 'ghost'}
              size='lg'
              className='w-full justify-start'
            >
              {nav.icon}
              {nav.title}
            </Button>
          </Link>
        ))}
      </nav>
      <div className='min-h-[calc(100vh-65px-85px)] w-full flex-auto gap-6 py-6'>{children}</div>
    </div>
  );
}
