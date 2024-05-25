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
      <div className='min-h-[calc(100vh-64px-58px-32px-114px)] w-full flex-auto gap-6 overflow-hidden'>
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
    </div>
  );
}
