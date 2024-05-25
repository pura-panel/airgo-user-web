'use client';

import Image from 'next/image';
import {
  getCustomerCustomerServiceGetCustomerServiceList,
  postCustomerCustomerServiceResetSubscribeUuid,
} from '@/service/api/customerApiCustomerService';
import { getPublicArticleGetDefaultArticleList } from '@/service/api/publicApiArticle';
import { usePublicConfig, useUserInfo } from '@/stores/userInfo';
import { useSuspenseQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { BellRing, Copy } from 'lucide-react';
import QRCode from 'qrcode.react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Store from './store/page';

function getSubApps(backend_url: string, sub_uuid: string, sub_name: string) {
  const sub_url = `${backend_url}/api/public/sub/${sub_uuid.replace(/-/g, '')}/${sub_name}`;
  return [
    {
      url: `shadowrocket://add/sub://${window.btoa(sub_url)}?remark=${encodeURI(sub_name)}`,
      img: '/images/subs/Shadowrocket.svg',
      name: 'Shadowrocket',
    },
    {
      url: `surge://install-config?url=${sub_url}`,
      img: '/images/subs/Surge.svg',
      name: 'Surge',
    },
    {
      url: `clash://install-config?url=${sub_url}`,
      img: '/images/subs/Nekoray.svg',
      name: 'NekoBox',
    },
    {
      url: `quantumult-x:///add-resource?remote-resource=${sub_url}`,
      img: '/images/subs/Quantumult X.svg',
      name: 'Quantumult X',
    },
    {
      url: `sing-box://import-remote-profile?url=${encodeURI(sub_url)}#${sub_name}`,
      img: '/images/subs/Sing Box.svg',
      name: 'Sing Box',
    },
    {
      url: `clash://install-config?url=${sub_url}&name=${sub_name}`,
      img: '/images/subs/Clash Verge.svg',
      name: 'Clash',
    },
  ];
}

/**
 * 获取下次流量重置时间
 * @returns string
 */
function getNextTrafficResetTime(day: number): string {
  const now = new Date();
  const currentDay = now.getDate();
  let nextTrafficResetTime;
  if (currentDay >= day) {
    nextTrafficResetTime = now.setMonth(now.getMonth() + 1);
  } else {
    nextTrafficResetTime = now.setMonth(now.getMonth());
  }
  nextTrafficResetTime = now.setDate(day);
  return format(nextTrafficResetTime, 'yyyy-MM-dd');
}

export default function User() {
  const config = usePublicConfig();
  const CustomerServiceList = useSuspenseQuery({
    queryKey: ['getCustomerCustomerServiceGetCustomerServiceList'],
    queryFn: async () => {
      const result = await getCustomerCustomerServiceGetCustomerServiceList();
      return (
        result.data?.data?.map((item: any) => ({
          ...item,
          used_up: item.used_up / 1024 / 1024 / 1024,
          used_down: item.used_down / 1024 / 1024 / 1024,
          total_bandwidth: item.total_bandwidth / 1024 / 1024 / 1024,
        })) || []
      );
    },
  });
  const { data } = useSuspenseQuery({
    queryKey: ['getPublicArticleGetDefaultArticleList'],
    queryFn: async () => {
      const result = await getPublicArticleGetDefaultArticleList();
      return result?.data?.data?.data || [];
    },
  });

  return (
    <div className='flex min-h-[calc(100vh-64px-58px-32px-114px)] w-full flex-col  gap-4 overflow-hidden'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle>最新公告</CardTitle>
          <BellRing className='size-5 text-muted-foreground' />
        </CardHeader>
        <CardContent className='pt-4 text-sm text-muted-foreground'>
          {data?.find((item: { type: string }) => item.type === 'dialog')?.content || '暂无公告'}
        </CardContent>
      </Card>
      {CustomerServiceList.data.length > 0 ? (
        <>
          <h2 className='font-semibold tracking-tight'>我的订阅</h2>
          {CustomerServiceList.data.map((item: any) => (
            <Card key={item.id}>
              <CardHeader className='flex flex-row items-center justify-between'>
                <CardTitle className='text-2xl font-medium'>{item.subject}</CardTitle>
                <div className='flex gap-2'>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size='sm' variant='destructive'>
                        重置订阅地址
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>提示</AlertDialogTitle>
                        <AlertDialogDescription>是否确认重置订阅地址?</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>取消</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async () => {
                            const result = await postCustomerCustomerServiceResetSubscribeUuid({
                              id: item.id,
                              sub_uuid: uuidv4(),
                            });
                            if (result.data.code !== 0) {
                              toast.error(result.data.msg);
                              return;
                            }
                            CustomerServiceList.refetch();
                            toast.success('重置成功');
                          }}
                        >
                          确认
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  {item.is_renew && <Button size='sm'>续费</Button>}
                </div>
              </CardHeader>
              <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5'>
                <CardContent>
                  <CardDescription>剩余</CardDescription>
                  <CardTitle className='text-3xl'>
                    {(item.total_bandwidth - item.used_up - item.used_down).toFixed(2)}
                    <span className='text-base'> GB</span>
                  </CardTitle>
                </CardContent>
                <CardContent>
                  <CardDescription>已用</CardDescription>
                  <CardTitle className='text-3xl'>
                    {(item.used_up + item.used_down).toFixed(2)}
                    <span className='text-base'> GB</span>
                  </CardTitle>
                </CardContent>
                <CardContent className='flex flex-col justify-between'>
                  <CardDescription>下次重置时间</CardDescription>
                  <CardTitle className='text-lg'>
                    {getNextTrafficResetTime(item.traffic_reset_day)}
                  </CardTitle>
                </CardContent>
                <CardContent className='flex flex-col justify-between'>
                  <CardDescription>开始时间</CardDescription>
                  <CardTitle className='text-lg'>
                    {format(item.service_start_at, 'yyyy-MM-dd')}
                  </CardTitle>
                </CardContent>
                <CardContent className='flex flex-col justify-between'>
                  <CardDescription>到期时间</CardDescription>
                  <CardTitle className='text-lg'>
                    {item?.service_end_at ? format(item?.service_end_at, 'yyyy-MM-dd') : '永久'}
                  </CardTitle>
                </CardContent>
              </div>
              <CardContent>
                <Separator />
                <Accordion type='single' collapsible defaultValue='0' className='w-full'>
                  {config?.backend_url?.map((url: string, index: number) => {
                    const subAddress = `${url}/api/public/sub/${item.sub_uuid.replace(/-/g, '')}/${config.sub_name}`;
                    return (
                      <AccordionItem value={index.toString()} key={index}>
                        <AccordionTrigger>
                          <div className='flex w-full flex-row items-center justify-between'>
                            <CardTitle className='text-sm font-medium'>
                              订阅地址 {index + 1}
                            </CardTitle>
                            <span
                              className='mr-4 flex cursor-pointer rounded p-2 text-sm text-primary hover:bg-accent'
                              onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(subAddress);
                                toast.success('复制成功');
                              }}
                            >
                              <Copy className='mr-2 size-5' />
                              复制
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className='grid grid-cols-3 gap-4 lg:grid-cols-7'>
                          {getSubApps(url, item.sub_uuid, config.sub_name).map((app) => (
                            <div
                              key={app.name}
                              className='flex size-full flex-col items-center justify-between gap-2 text-xs text-muted-foreground'
                            >
                              <span>{app.name}</span>
                              <Image src={app.img} alt={app.name} width={50} height={50} />

                              <div className='flex'>
                                <Button size='sm' variant='secondary' className='px-1.5 '>
                                  下载
                                </Button>
                                <Button
                                  size='sm'
                                  onClick={() => {
                                    navigator.clipboard.writeText(app.url);
                                    window.location.href = app.url;
                                  }}
                                  className='p-2'
                                >
                                  导入
                                </Button>
                              </div>
                            </div>
                          ))}
                          <div className='hidden size-full flex-col items-center justify-between gap-2 text-sm text-muted-foreground md:flex lg:flex'>
                            <span>二维码</span>
                            <QRCode
                              value={subAddress}
                              size={80}
                              bgColor='transparent'
                              fgColor='rgb(59, 130, 246)'
                            />
                            <span>扫描订阅</span>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </>
      ) : (
        <>
          <h2 className='font-semibold tracking-tight'>购买订阅</h2>
          <Store />
        </>
      )}
    </div>
  );
}
