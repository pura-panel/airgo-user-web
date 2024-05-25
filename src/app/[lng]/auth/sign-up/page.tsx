'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { getPublicCodeGetBase64Captcha } from '@/service/api/publicApiCode';
import { postPublicUserRegister } from '@/service/api/publicApiUser';
import { usePublicConfig } from '@/stores/userInfo';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
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
  email_suffix: z.string().optional(),
  email_code: z.string().optional(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  re_password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  captcha: z.string().optional(),
  referrer_code: z.string().optional(),
});

export default function SignUp({ params: { lng } }: { params: { lng: string } }) {
  const config = usePublicConfig();

  const searchParams = useSearchParams();

  const Captcha = useQuery({
    enabled: config?.enable_base64_captcha,
    queryKey: ['getPublicCodeGetBase64Captcha'],
    queryFn: async () => {
      const result = await getPublicCodeGetBase64Captcha();
      return result.data?.data || {};
    },
  });

  // const EmailCode = useQuery({
  //   queryKey: ['postPublicCodeGetEmailCode'],
  //   queryFn: async ({ data }: { data: { email: string } }) => {
  //     const result = await postPublicCodeGetEmailCode();
  //     return result.data?.data || {};
  //   },
  // });

  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      user_name: '',
      password: '',
      referrer_code: searchParams.get('aff') || '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await postPublicUserRegister({
      user_name: data.user_name.split('@')[0],
      password: data.password,
      re_password: data.re_password,
      email_suffix: `@${data.user_name.split('@')[1]}`,
      email_code: data.email_code,
      base64_captcha: {
        b64s: data.captcha,
        id: Captcha.data?.id,
      },
    });
    if (result.data.code === 0) {
      toast.success('注册成功');
      router.push(`/${lng}/auth/login`);
    }
  }
  return (
    <div className='flex min-h-[calc(100vh-64px-58px-32px)] items-center justify-center '>
      <Card className='mx-auto max-w-md flex-1 text-center'>
        <CardHeader>
          <CardTitle className='text-2xl'>快速注册</CardTitle>
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
              {/* <FormField
                control={form.control}
                name="email_code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center">
                        <Input placeholder="邮件验证码"  {...field} />
                        <Button
                          onClick={() => {
                            EmailCode.refetch({
                              data: {
                                email: form.getValues('user_name'),
                              },
                            });
                          }}
                        >
                          获取
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
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
              <FormField
                control={form.control}
                name='re_password'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type='password' placeholder='重复密码' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {config?.enable_base64_captcha && (
                <FormField
                  control={form.control}
                  name='captcha'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className='flex items-center gap-2'>
                          <Input placeholder='验证码' {...field} />
                          <Button type='button' variant='ghost' className='w-2/3 border'>
                            <Image
                              src={Captcha.data?.b64s}
                              width={100}
                              height={36}
                              alt='captcha'
                              onClick={() => {
                                Captcha.refetch();
                              }}
                            />
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name='referrer_code'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='注册邀请码（可选）' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='mx-auto w-2/3'>
                注册新账户
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
