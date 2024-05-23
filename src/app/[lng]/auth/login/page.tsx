'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { postPublicUserLogin } from '@/service/api/publicApiUser';
import { setUser, userLogin } from '@/stores/userInfo';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
  user_name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string(),
});

export default function Login({ params: { lng } }: { params: { lng: string } }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      user_name: 'admin@oicq.com',
      password: 'test',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await postPublicUserLogin(data);
    if (result.data.code === 0) {
      toast.success('登录成功');
      userLogin(result.data.data.token);
      setUser(result.data.data.user);
      router.replace(`/${lng}/user`);
    }
  }
  return (
    <div className='flex min-h-[calc(100vh-64px-58px-32px)] items-center justify-center '>
      <Card className='mx-auto max-w-md flex-1 text-center'>
        <CardHeader>
          <CardTitle className='text-2xl'>登录</CardTitle>
          <CardDescription>立刻开启激动的极致互联网体验</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-6'>
              <FormField
                control={form.control}
                name='user_name'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type='email' placeholder='电子邮箱' required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type='password' placeholder='密码' required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='mx-auto w-2/3'>
                登录
              </Button>
              <Link href={`/${lng}/auth/reset`} className='inline-block text-sm text-primary'>
                忘记密码?
              </Link>
              <div className='text-sm'>
                还没有账户?{' '}
                <Link href={`/${lng}/auth/sign-up`} className='text-primary'>
                  点击注册
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
