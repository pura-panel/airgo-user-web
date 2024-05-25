'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getCustomerFinanceGetCommissionSummary } from '@/service/api/customerApiFinance';
import { useUserInfo } from '@/stores/userInfo';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  Book,
  Bot,
  Copy,
  CreditCard,
  DollarSign,
  Home,
  Landmark,
  ListOrdered,
  Store,
  User,
  Users,
  Wallet,
} from 'lucide-react';
import { toast } from 'sonner';
import useMounted from '@/hooks/useMounted';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  const { userInfo } = useUserInfo();
  const { data } = useSuspenseQuery({
    queryKey: ['getCustomerFinanceGetCommissionSummary'],
    queryFn: async () => {
      const result = await getCustomerFinanceGetCommissionSummary();
      return result.data.data || {};
    },
  });
  const mounted = useMounted();
  if (!mounted) return null;
  return (
    <div className='container flex flex-wrap-reverse gap-6 align-top md:flex-nowrap'>
      <nav className='sticky top-[84px] hidden h-96 w-52 shrink-0 flex-col gap-2 text-muted-foreground lg:flex'>
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
      <div className='min-h-[calc(100vh-65px-85px)] w-full flex-auto gap-6 py-4 md:py-6'>
        {children}
      </div>
      <div className='top-[84px] mt-4 grid size-full min-w-52 shrink-0 grid-cols-2 gap-4 md:sticky md:w-auto md:grid-cols-1 md:flex-col '>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>账户余额</CardTitle>
            <CreditCard className='size-5 text-muted-foreground' />
          </CardHeader>
          <CardContent className='text-2xl font-bold'>
            {userInfo?.balance.toFixed(2) || '0.00'}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>佣金总额</CardTitle>
            <DollarSign className='size-5 text-muted-foreground' />
          </CardHeader>
          <CardContent className='text-2xl font-bold'>
            {data.total_commission_amount || '0.00'}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>邀请人数</CardTitle>
            <Users className='size-5 text-muted-foreground' />
          </CardHeader>
          <CardContent className='text-2xl font-bold'>{data?.total_invitation || 0}</CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>邀请总收益</CardTitle>
            <Landmark className='size-5 text-muted-foreground' />
          </CardHeader>
          <CardContent className='text-2xl font-bold'>
            {data?.total_commission_amount || '0.00'}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>邀请码</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant='ghost'
                    className='size-5 p-0'
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${location.origin}/auth/sign-up?aff=${userInfo?.invitation_code}`,
                      );
                      toast.success('邀请链接复制成功');
                    }}
                  >
                    <Copy className='size-5 text-primary' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>复制邀请链接</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent className='text-2xl font-bold'>{userInfo?.invitation_code}</CardContent>
        </Card>
      </div>
    </div>
  );
}
