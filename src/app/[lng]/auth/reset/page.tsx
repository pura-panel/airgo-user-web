'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { postPublicCodeGetEmailCode } from '@/service/api/publicApiCode';
import { postPublicUserResetUserPassword } from '@/service/api/publicApiUser';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
  user_name: z.string().email({
    message: 'Email must be a valid email address.',
  }),
  email_code: z.string().optional(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

export default function SignUp({ params: { lng } }: { params: { lng: string } }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      user_name: '',
      password: '',
      email_code: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await postPublicUserResetUserPassword({
      user_name: data.user_name,
      password: data.password,
      email_code: data.email_code,
    });
    if (result.data.code === 0) {
      toast.success('重置成功');
      router.push(`/${lng}/auth/login`);
    }
  }

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <div className='flex min-h-[calc(100vh-64px-58px-32px)] items-center justify-center '>
      <Card className='mx-auto max-w-md flex-1 text-center'>
        <CardHeader>
          <CardTitle className='text-2xl'>重置密码</CardTitle>
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
                      <Input type='email' placeholder='电子邮箱' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email_code'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <div className='flex items-center'>
                          <Input placeholder='邮件验证码' {...field} />
                          <Button
                            disabled={
                              !/^\w+(-+.\w+)*@\w+(-.\w+)*.\w+(-.\w+)*$/.test(
                                form.getValues('user_name'),
                              ) || count > 0
                            }
                            onClick={async (e) => {
                              e.preventDefault();
                              const target_email = form.getValues('user_name');
                              const result = await postPublicCodeGetEmailCode({
                                email_type: 'EMAIL_TYPE_USER_RESETPWD',
                                target_email,
                              });
                              if (result.data.code === 0) {
                                toast.success('邮件已发送');
                                setCount(60);
                              } else {
                                toast.error(result.data.msg);
                              }
                            }}
                          >
                            {count > 0 ? `${count}s` : '获取'}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type='password' placeholder='密码' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='mx-auto w-2/3'>
                重置密码
              </Button>
              <div className='text-sm'>
                已有账户？{' '}
                <Link href={`/${lng}/auth/login`} className='text-primary'>
                  点击登录
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
