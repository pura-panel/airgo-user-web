'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  postCustomerOrderGetOrderInfo,
  postCustomerOrderGetOrderInfoWaitPay,
  postCustomerOrderPreCreateOrder,
} from '@/service/api/customerApiOrder';
import { getCustomerPayGetEnabledPayList } from '@/service/api/customerApiPay';
import {
  getCustomerShopGetEnabledGoodsList,
  postCustomerShopPurchase,
} from '@/service/api/customerApiShop';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Ban, CircleCheck, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import Loading from '../../loading';

export default function Store() {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('1');
  const [order, setOrder] = useState<any>();
  const [pay_id, setPayId] = useState<any>(2);

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

  const { data: PayList } = useSuspenseQuery({
    queryKey: ['getCustomerPayGetEnabledPayList'],
    queryFn: async () => {
      const result = await getCustomerPayGetEnabledPayList();
      return result.data.data || [];
    },
  });

  async function getOrderInfo(params?: any) {
    const result = await postCustomerOrderGetOrderInfo({
      ...order,
      ...params,
    });
    if (result.data.code === 0) {
      setOrder(result.data.data);
    }
  }

  function getTabContent(type: string) {
    return (
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
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
                    getOrderInfo({
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
      <Dialog
        open={order?.goods_id !== undefined}
        onOpenChange={(open) => {
          if (!open) setOrder(undefined);
        }}
      >
        {order && (
          <DialogContent className='flex h-screen max-w-screen-lg flex-col md:h-auto'>
            <DialogHeader>
              <DialogTitle>{order.subject}</DialogTitle>
              <DialogDescription>商品描述</DialogDescription>
            </DialogHeader>
            <div className='grid w-full gap-6 lg:grid-cols-2'>
              <Card className='border-transparent shadow-none md:border-inherit md:shadow'>
                <CardContent className='grid gap-1 p-0  text-sm md:gap-3 md:p-6'>
                  <div className='font-semibold'>商品详情</div>
                  <ul className='grid gap-3 *:flex *:items-center *:justify-between'>
                    <li>
                      <span className='text-muted-foreground'>可用流量</span>
                      <span>
                        {data.find((item: any) => item.id === order.goods_id).total_bandwidth}
                      </span>
                    </li>
                    <li>
                      <span className='text-muted-foreground'>连接速度</span>
                      <span>
                        {data.find((item: any) => item.id === order.goods_id).node_speed_limit}
                      </span>
                    </li>
                    <li>
                      <span className='text-muted-foreground'>同时连接 IP 数</span>
                      <span>
                        {data.find((item: any) => item.id === order.goods_id).node_connector}
                      </span>
                    </li>
                  </ul>
                  <Separator className='my-2 md:my-4' />
                  <ul className='grid gap-3'>
                    <div className='font-semibold'>商品账单</div>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>套餐时长</span>
                      <span>{order.duration}个月</span>
                    </li>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>单月价格</span>
                      <span>¥ {order.original_amount / order.duration}</span>
                    </li>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>折扣码优惠</span>
                      <span>¥ {order.coupon_amount}</span>
                    </li>
                    <li className='flex items-center justify-between font-semibold'>
                      <span className='text-muted-foreground'>总价</span>
                      <span>¥ {order.total_amount}</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <div className='flex flex-col justify-between text-sm'>
                <div className='grid gap-3'>
                  <div className='hidden font-semibold md:block'>用户余额</div>
                  <div className='flex items-center justify-between'>
                    <span>¥ {order.balance_amount}</span>
                  </div>
                  <div className='hidden font-semibold md:block'>折扣码</div>
                  <div className='flex '>
                    <Input
                      placeholder='请输入折扣码'
                      value={order?.coupon_name}
                      onChange={(e) => {
                        setOrder({ ...order, coupon_name: e.target.value });
                      }}
                    />
                    <Button
                      onClick={() => {
                        if (!order?.coupon_name) return;
                        getOrderInfo();
                      }}
                    >
                      验证
                    </Button>
                  </div>
                  <div className='font-semibold'>支付方式</div>
                  <ToggleGroup
                    type='single'
                    variant='outline'
                    className='justify-start *:size-24'
                    value={pay_id}
                    onValueChange={setPayId}
                  >
                    {PayList?.map((item: any) => (
                      <ToggleGroupItem
                        key={item.id}
                        value={item.id}
                        className='flex size-24 flex-col items-center justify-center gap-4 data-[state=on]:bg-primary data-[state=on]:text-white'
                      >
                        <Image src={item.pay_logo_url} alt={item.name} width={24} height={24} />
                        {item.name}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                </div>
                <Button
                  className='fixed bottom-0 left-0 w-full rounded-none md:relative md:mt-6'
                  disabled={loading}
                  onClick={async () => {
                    setLoading(true);
                    const detail = await postCustomerOrderPreCreateOrder({
                      ...order,
                      pay_id: 0,
                      pay_type: '',
                    }).then((res) => {
                      if (res.data.code !== 0) {
                        toast.error(res.data.msg);
                        return;
                      }
                      return res.data.data;
                    });
                    if (!detail) return setLoading(false);
                    const orderInfo = await postCustomerOrderGetOrderInfoWaitPay(detail).then(
                      (res) => {
                        if (res.data.code !== 0) return;
                        return res.data.data;
                      },
                    );
                    if (!orderInfo) return setLoading(false);
                    const purchase = await postCustomerShopPurchase({
                      ...orderInfo,
                      pay_id,
                    }).then((res) => {
                      if (res.data.code !== 0) setLoading(false);
                      return res.data.data;
                    });
                    switch (purchase.pay_type) {
                      case 'alipay':
                        window.location.href = purchase.pay_info.alipay_info.qr_code;
                        break;
                      case 'epay':
                        const href = new URL(purchase.pay_info.epay_info.epay_api_url);
                        Object.keys(purchase.pay_info.epay_info.epay_pre_create_pay).forEach(
                          (key) => {
                            href.searchParams.set(
                              key,
                              purchase.pay_info.epay_info.epay_pre_create_pay[key],
                            );
                          },
                        );
                        window.location.href = href.toString();
                        break;
                      default:
                        if (purchase.trade_status === 'TRADE_SUCCESS') {
                          toast.success('支付成功, 即将跳转到首页');
                          setTimeout(() => {
                            window.location.href = '/user';
                          }, 2000);
                        }
                        break;
                    }
                  }}
                >
                  {loading && <LoaderCircle className='mr-2 animate-spin' />}
                  立即购买
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
