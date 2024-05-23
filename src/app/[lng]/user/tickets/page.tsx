'use client';

import { Fragment, useRef, useState } from 'react';
import {
  postCustomerTicketFirstTicket,
  postCustomerTicketGetUserTicketList,
  postCustomerTicketNewTicket,
  postCustomerTicketSendTicketMessage,
  postCustomerTicketUpdateUserTicket,
} from '@/service/api/customerApiTicket';
import { useUserInfo } from '@/stores/userInfo';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { MessageSquareX, MessagesSquare, Send, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Empty from '@/components/empty';
import InfiniteScroll from '@/components/infinite-scroll';

const FormSchema = z.object({
  title: z.string(),
  details: z.string(),
});

export default function Tickets() {
  const { userInfo } = useUserInfo();
  const { data, fetchNextPage, hasNextPage, isFetching, refetch } = useSuspenseInfiniteQuery({
    queryKey: ['postCustomerTicketGetUserTicketList', 'ticket'],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const res = await postCustomerTicketGetUserTicketList({
        table_name: 'ticket',
        field_params_list: [
          {
            field: 'id',
            field_type: '',
            condition: '<>',
            condition_value: '',
            operator: '',
          },
        ],
        pagination: {
          page_num: pageParam || 1,
          page_size: 30,
          order_by: 'id DESC',
        },
      });
      return res.data?.data || {};
    },
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (lastPageParam * 10 >= lastPage.total) return undefined;
      return lastPageParam + 1;
    },
  });
  const dataSource = data?.pages.flatMap((page) => page?.data!).filter((item) => item) || [];

  const [ticket, setTicket] = useState({} as any);
  const Ticket = useQuery({
    enabled: !!ticket?.id,
    queryKey: ['postCustomerTicketFirstTicket', ticket?.id],
    queryFn: async () => {
      const res = await postCustomerTicketFirstTicket(ticket);
      return res.data?.data || {};
    },
  });
  const [message, setMessage] = useState('');
  const ButtonRef = useRef<HTMLButtonElement>(null);

  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      details: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await postCustomerTicketNewTicket({
      ...data,
      status: 'TicketProcessing',
      ticket_message: [],
      user_id: userInfo.id,
    });
    if (result.data.code === 0) {
      setOpen(false);
      refetch();
    }
  }

  return (
    <Fragment>
      <div className='mb-4 flex items-center justify-between gap-2 text-lg'>
        <h2 className='font-semibold tracking-tight'>工单列表</h2>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button size='sm'>新增工单</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className='text-center'>新增工单</AlertDialogTitle>
              <AlertDialogDescription>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <FormField
                      control={form.control}
                      name='title'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>标题</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='details'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>标题</FormLabel>
                          <FormControl>
                            <Textarea className='resize-none' {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className='flex items-center justify-center gap-4'>
                      <AlertDialogCancel>取消</AlertDialogCancel>
                      <Button type='submit'>创建</Button>
                    </div>
                  </form>
                </Form>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {dataSource.length === 0 ? (
        <Empty />
      ) : (
        <InfiniteScroll
          dataSource={dataSource}
          hasMore={hasNextPage}
          loadMore={fetchNextPage}
          loading={isFetching}
          className='flex flex-col gap-4'
          renderItem={(item) => (
            <Card key={item.id} className='overflow-hidden'>
              <CardHeader
                className={cn(
                  'flex flex-col items-start justify-between bg-muted/50 px-6 py-3 md:flex-row md:items-center',
                  {
                    'bg-green-500/20': item.status === 'TICKET_PROCESSING',
                  },
                )}
              >
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className='text-xs text-muted-foreground'>
                  创建时间{' '}
                  <time dateTime={item.created_at}>
                    {format(new Date(item.created_at), 'yyyy-MM-dd HH:mm:ss')}
                  </time>
                </CardDescription>
              </CardHeader>
              <CardContent className='p-6 text-sm'>{item.details}</CardContent>
              <CardFooter className='flex flex-row items-center justify-between border-t bg-muted/50 px-6 py-3'>
                <span className='text-xs text-muted-foreground'>
                  更新时间{' '}
                  <time dateTime={item.updated_at}>
                    {format(new Date(item.updated_at), 'yyyy-MM-dd HH:mm:ss')}
                  </time>
                </span>
                {item.status === 'TICKET_PROCESSING' && (
                  <div className='flex gap-2'>
                    <Button
                      size='sm'
                      variant='destructive'
                      onClick={async () => {
                        const result = await postCustomerTicketUpdateUserTicket({
                          id: item.id,
                          status: 'TICKET_CLOSED',
                        });
                        if (result.data.code === 0) {
                          Ticket.refetch();
                        }
                      }}
                    >
                      <MessageSquareX className='mr-2 size-5' /> 关闭工单
                    </Button>
                    <Button
                      size='sm'
                      onClick={() => {
                        setTicket(item);
                      }}
                    >
                      <MessagesSquare className='mr-2 size-5' /> 联系客服
                    </Button>
                  </div>
                )}
                {item.status === 'TICKET_CLOSED' && (
                  <div className='flex gap-2'>
                    <Button size='sm' variant='ghost' className='text-muted-foreground'>
                      已结束
                    </Button>
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={() => {
                        setTicket(item);
                      }}
                    >
                      <MessagesSquare className='mr-2 size-5' /> 查看工单
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          )}
        />
      )}

      <Drawer
        open={!!ticket?.id}
        onOpenChange={(open) => {
          if (!open) setTicket(null);
        }}
      >
        <DrawerContent className='container h-screen'>
          <DrawerHeader className='border-b'>
            <DrawerTitle>{Ticket.data?.title || ticket?.title}</DrawerTitle>
            <DrawerDescription>{Ticket.data?.details || ticket?.details}</DrawerDescription>
            <DrawerClose className='absolute right-4 top-4'>
              <X />
            </DrawerClose>
          </DrawerHeader>
          <div className='flex flex-col gap-4 p-4'>
            {Ticket.data?.ticket_message?.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className={cn('flex items-center gap-4', {
                    'flex-row-reverse': !item.is_admin,
                  })}
                >
                  <Avatar className='size-14'>
                    <AvatarFallback
                      className={cn('bg-green-500 text-primary-foreground', {
                        'bg-primary': !item.is_admin,
                      })}
                    >
                      {item.is_admin ? 'A' : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn('flex flex-col gap-1', {
                      'items-end': !item.is_admin,
                    })}
                  >
                    <p className='text-sm text-muted-foreground'>
                      {format(new Date(item.created_at), 'yyyy-MM-dd HH:mm:ss')}
                    </p>
                    <p
                      className={cn('w-fit rounded-lg bg-accent p-2 font-medium', {
                        'bg-primary text-primary-foreground': !item.is_admin,
                      })}
                    >
                      {item.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          {ticket?.status === 'TICKET_PROCESSING' && (
            <DrawerFooter className='flex w-full flex-row items-center gap-2'>
              <Input
                placeholder='请在此输入您的问题，我们会尽快回复您。'
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || (e.keyCode === 13 && message.trim())) {
                    ButtonRef?.current?.click();
                  }
                }}
              />
              <Button
                ref={ButtonRef}
                onClick={async () => {
                  if (!message) return;
                  const result = await postCustomerTicketSendTicketMessage({
                    ticket_id: ticket.id,
                    message: message,
                  });
                  if (result.data.code === 0) {
                    setMessage('');
                    Ticket.refetch();
                  }
                }}
              >
                <Send />
              </Button>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}
