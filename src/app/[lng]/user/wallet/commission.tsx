'use client';

import { postCustomerFinanceGetCommissionStatementList } from '@/service/api/customerApiFinance';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Empty from '@/components/empty';
import InfiniteScroll from '@/components/infinite-scroll';

export default function WalletCommission() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useSuspenseInfiniteQuery({
    queryKey: ['postCustomerFinanceGetCommissionStatementList', 'commission_statement'],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const res = await postCustomerFinanceGetCommissionStatementList({
        table_name: 'commission_statement',
        pagination: {
          page_size: 20,
          page_num: pageParam || 1,
          order_by: 'id DESC',
        },
      });
      return res.data?.data || {};
    },
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (lastPageParam * 20 >= lastPage.total) return undefined;
      return lastPageParam + 1;
    },
  });
  const dataSource = data?.pages.flatMap((page) => page?.data!).filter((item) => item) || [];

  return (
    <InfiniteScroll
      hasMore={hasNextPage}
      loadMore={fetchNextPage}
      loading={isFetching}
      className='flex flex-col gap-4'
    >
      <Table className='table-fixed'>
        <TableHeader>
          <TableRow>
            <TableHead>主题</TableHead>
            <TableHead className='text-center'>用户名</TableHead>
            <TableHead className='text-center'>金额</TableHead>
            <TableHead className='text-right'>创建时间</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataSource.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell className='text-center'>{item.user_name}</TableCell>
              <TableCell className='text-center'>{item.amount}</TableCell>
              <TableCell className='text-right'>
                {format(new Date(item.create_time), 'yyyy-MM-dd HH:mm:ss')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>
          {dataSource.length === 0 ? <Empty /> : isFetching ? '加载中...' : '我是有底线的'}
        </TableCaption>
      </Table>
    </InfiniteScroll>
  );
}
