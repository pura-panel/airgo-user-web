'use client';

import { getCustomerFinanceGetCommissionSummary } from '@/service/api/customerApiFinance';
import { useUserInfo } from '@/stores/userInfo';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Copy, CreditCard, Landmark, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import WalletBalance from './balance';
import WalletCommission from './commission';
import WalletInvitation from './invitation';

export default function Wallet() {
  const { userInfo } = useUserInfo();
  const { data } = useSuspenseQuery({
    queryKey: ['getCustomerFinanceGetCommissionSummary'],
    queryFn: async () => {
      const result = await getCustomerFinanceGetCommissionSummary();
      return result.data.data || {};
    },
  });
  return (
    <div className='flex flex-col-reverse gap-6 align-top lg:flex-row'>
      <div className='min-h-[calc(100vh-64px-58px-32px)] w-full flex-auto gap-6 overflow-hidden'>
        <Tabs defaultValue='balance'>
          <TabsList className='flex h-auto w-full flex-wrap *:flex-1'>
            <TabsTrigger value='balance'>余额</TabsTrigger>
            <TabsTrigger value='commission'>佣金</TabsTrigger>
            <TabsTrigger value='invitation'>邀请用户</TabsTrigger>
          </TabsList>
          <TabsContent value='balance'>
            <WalletBalance />
          </TabsContent>
          <TabsContent value='commission'>
            <WalletCommission />
          </TabsContent>
          <TabsContent value='invitation'>
            <WalletInvitation />
          </TabsContent>
        </Tabs>
      </div>
      <div className='relative flex min-w-52 shrink-0 flex-col gap-4 lg:sticky lg:top-[89px] lg:h-full'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>账户余额</CardTitle>
            <CreditCard className='size-5 text-muted-foreground' />
          </CardHeader>
          <CardContent className='text-2xl font-bold'>{userInfo?.balance.toFixed(2)}</CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>邀请人数</CardTitle>
            <Users className='size-5 text-muted-foreground' />
          </CardHeader>
          <CardContent className='text-2xl font-bold'>{data?.total_invitation}</CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>邀请总收益</CardTitle>
            <Landmark className='size-5 text-muted-foreground' />
          </CardHeader>
          <CardContent className='text-2xl font-bold'>{data?.total_commission_amount}</CardContent>
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
