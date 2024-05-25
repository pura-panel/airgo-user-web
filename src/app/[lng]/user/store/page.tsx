'use client';

import { useState } from 'react';
import { getCustomerShopGetEnabledGoodsList } from '@/service/api/customerApiShop';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Ban, CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Loading from '../../loading';
import BuyDialog from '../components/buy-dialog';

export default function Store() {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>();

  const [type, setType] = useState('1');

  const { data } = useSuspenseQuery({
    queryKey: ['getCustomerShopGetEnabledGoodsList', 'goods_type'],
    queryFn: async () => {
      const result = await getCustomerShopGetEnabledGoodsList({
        goods_type: 'subscribe',
      });
      const data =
        result.data?.data?.map((item: any) => ({
          ...item,
          node_speed_limit:
            item.node_speed_limit === 0 ? '无限制' : `${item.node_speed_limit / 1024 / 1024} Mbps`,
          total_bandwidth: `${item.total_bandwidth} GB`,
          description: item.des.split('\n')[0],
          descriptions: item.des
            .split('\n')
            .slice(1)
            .filter(Boolean)
            .map((des: string) => des.trim()),
        })) || [];

      return data;
    },
  });

  function getTabContent(type: string) {
    return (
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
        {data?.map((item: any) => {
          let price = item.price;
          let unit = '月';
          switch (type) {
            case '1':
              break;
            case '3':
              price = item.price_3_month;
              unit = '季';
              break;
            case '6':
              price = item.price_6_month;
              unit = '半年';
              break;
            case '12':
              price = item.price_12_month;
              unit = '年';
              break;
          }
          return (
            <Card className='overflow-hidden' key={item.id}>
              <CardHeader className='gap-2'>
                <h1 className='text-xl font-medium capitalize lg:text-2xl'>{item.subject}</h1>
                <p className='text-muted-foreground'>{item.description}</p>
                <h2 className='text-2xl font-semibold sm:text-3xl'>
                  ¥ {price} <span className='text-base font-medium'>/ {unit}</span>
                </h2>
                <Button
                  className='size-full'
                  onClick={() => {
                    setOrder({
                      goods_id: item.id,
                      duration: Number(type),
                      order_type: 'New',
                    });
                  }}
                >
                  购买
                </Button>
              </CardHeader>
              <Separator />
              <CardContent className='py-4 text-sm'>
                <div className='grid gap-3'>
                  <div className='font-semibold'>商品详情</div>
                  <ul className='grid gap-3'>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>可用流量</span>
                      <span>{item.total_bandwidth}</span>
                    </li>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>连接速度</span>
                      <span>{item.node_speed_limit}</span>
                    </li>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>同时连接 IP 数</span>
                      <span>{item.node_connector}</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <Separator />
              <CardContent className='py-4 text-sm'>
                <ul className='grid gap-3'>
                  {item.descriptions.map((description: string, index: number) => {
                    const icon = description.includes('[x]') ? (
                      <CircleCheck className='size-4 text-green-500' />
                    ) : (
                      <Ban className='size-4 text-red-500' />
                    );
                    const text = description.replace(/\[x\]|\[\]/g, '');
                    return (
                      <li className='flex items-center gap-2' key={index}>
                        {icon}
                        <span className='text-muted-foreground'>{text}</span>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }
  return (
    <>
      <Tabs defaultValue='1' value={type} onValueChange={setType}>
        <TabsList className='mb-4 flex h-auto w-full flex-wrap *:flex-1'>
          <TabsTrigger value='1'>月付</TabsTrigger>
          <TabsTrigger value='3' className='relative'>
            季付
          </TabsTrigger>
          <TabsTrigger value='6' className='relative'>
            半年付
          </TabsTrigger>
          <TabsTrigger value='12' className='relative'>
            年付
          </TabsTrigger>
        </TabsList>
        <TabsContent value='1'>{getTabContent('1')}</TabsContent>
        <TabsContent value='3'>{getTabContent('3')}</TabsContent>
        <TabsContent value='6'>{getTabContent('6')}</TabsContent>
        <TabsContent value='12'>{getTabContent('12')}</TabsContent>
      </Tabs>
      {loading && <Loading />}
      <BuyDialog order={order} setOrder={setOrder} loading={loading} setLoading={setLoading} />
    </>
  );
}
