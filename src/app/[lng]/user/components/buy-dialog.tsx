'use client';

import { useEffect, useState } from 'react';
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
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import useMounted from '@/hooks/useMounted';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export default function BuyDialog({
  order,
  setOrder,
  loading,
  setLoading,
}: {
  order: any;
  setOrder: (order: any) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}) {
  const [pay_id, setPayId] = useState<any>(1);

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
    setLoading(true);
    const result = await postCustomerOrderGetOrderInfo({
      ...order,
      ...params,
    });
    if (result.data.code === 0) {
      setOrder(result.data.data);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (order?.order_type === 'New') {
      getOrderInfo({
        goods_id: order.goods_id,
        duration: order.duration,
        order_type: 'New',
      });
    }
    if (order?.order_type === 'Renew') {
      getOrderInfo({
        goods_id: order.goods_id,
        customer_service_id: order.customer_service_id,
        order_type: 'Renew',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order?.order_type]);

  return (
    <Dialog
      open={order?.goods_id !== undefined}
      onOpenChange={(open) => {
        if (!open) setOrder(undefined);
      }}
    >
      {order && (
        <DialogContent className='flex h-full max-w-screen-lg flex-col overflow-hidden md:h-auto'>
          <DialogHeader>
            <DialogTitle>{order.subject || '商品标题'}</DialogTitle>
            <DialogDescription>
              {data.find((item: any) => item.id === order.goods_id).description}
            </DialogDescription>
          </DialogHeader>
          <div className='grid w-full gap-6 lg:grid-cols-2'>
            <Card className='border-transparent shadow-none md:border-inherit md:shadow'>
              <CardContent className='grid gap-3 p-0 text-sm md:p-6'>
                <div className='font-semibold'>商品详情</div>
                <ul className='grid grid-cols-2 gap-3 *:flex *:items-center *:justify-between lg:grid-cols-1'>
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
                <Separator />
                <div className='font-semibold'>商品账单</div>
                <ul className='grid grid-cols-2 gap-3 *:flex *:items-center *:justify-between lg:grid-cols-1'>
                  <li>
                    <span className='text-muted-foreground'>套餐时长</span>
                    <span>{order.duration}个月</span>
                  </li>
                  <li>
                    <span className='text-muted-foreground'>单月价格</span>
                    <span>¥ {order.original_amount / order.duration}</span>
                  </li>
                  <li>
                    <span className='text-muted-foreground'>折扣码优惠</span>
                    <span>¥ {order.coupon_amount}</span>
                  </li>
                </ul>
                <Separator />
                <div className='flex items-center justify-between font-semibold'>
                  <span className='text-muted-foreground'>总价</span>
                  <span>¥ {order.total_amount}</span>
                </div>
              </CardContent>
            </Card>
            <div className='flex flex-col justify-between text-sm'>
              <div className='grid gap-3'>
                <div className='flex items-center justify-between font-semibold md:block'>
                  用户余额 <span>¥ {order.balance_amount || '0.00'}</span>
                </div>
                <div className='flex'>
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
  );
}
