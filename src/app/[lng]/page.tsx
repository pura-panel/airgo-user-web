import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslation } from '@/i18n';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { ReactTyped } from '@/components/typed';

export default async function Home({ params: { lng } }: { params: { lng: string } }) {
  const { t } = await getTranslation(lng, 'index');
  return (
    <Fragment>
      <section className='container my-12 flex flex-col items-center text-center md:my-16 lg:my-24'>
        <h1 className='text-3xl font-bold !leading-snug md:text-4xl lg:text-7xl'>
          {t('title.1')}
          <br />
          <ReactTyped
            strings={[...Array(6)].map((_, index) => t(`title.2.${index}`))}
            typeSpeed={180}
            backSpeed={0}
            loop
            className='flex items-start justify-center bg-gradient-to-r from-green-500 to-primary bg-clip-text text-transparent'
          />
          {t('title.3')}
        </h1>
        <p className='mt-12 max-w-xl text-base font-medium md:text-lg lg:text-2xl'>
          {t('description')}
        </p>
        <div className='mt-12 flex flex-wrap justify-center gap-4'>
          <Link
            href={`/${lng}/auth/login`}
            className='flex items-center rounded bg-primary px-8 py-2 font-semibold text-primary-foreground'
          >
            {t('start')} <ArrowRightIcon className='ml-1 size-5' />
          </Link>
        </div>
      </section>
      <section className='container relative my-12 h-12 w-full overflow-hidden md:my-16 lg:my-24'>
        <div className='animate-scroll-x absolute left-0 top-0 flex'>
          {[
            'facebook',
            'google',
            'hbo',
            'instagram',
            'netflix',
            'primevideo',
            'reddit',
            'snapchat',
            'spotify',
            'twitch',
            'twitter',
            'whatsapp',
            'youtube',
            'facebook',
            'google',
            'hbo',
            'instagram',
            'netflix',
            'primevideo',
            'reddit',
            'snapchat',
            'spotify',
            'twitch',
            'twitter',
            'whatsapp',
            'youtube',
          ].map((item, index) => (
            <Image
              key={index}
              src={`/images/index/${item}.png`}
              alt={item}
              width={120}
              height={48}
              className='mx-8 h-12 w-auto'
            />
          ))}
        </div>
      </section>
      <section className='container my-12 flex flex-col justify-center gap-y-16 md:my-16 lg:my-24'>
        <div className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3'>
          <div className='space-y-4'>
            <svg
              id='start'
              width='72'
              height='72'
              viewBox='0 0 72 72'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle opacity='1' cx='36' cy='36' r='36' fill='rgba(0,229,153,.2)'></circle>
              <path
                d='M34 26.7351C34 23.4889 37.663 21.5947 40.3121 23.471L53.3919 32.7359C55.6424 34.3301 55.6424 37.6699 53.3919 39.2641L40.3121 48.529C37.663 50.4053 34 48.5111 34 45.2649V26.7351Z'
                fill='currentColor'
                className='start-path-1 text-green-500'
              ></path>
              <rect
                opacity='0.6'
                x='16'
                y='31'
                width='16'
                height='10'
                rx='5'
                fill='currentColor'
                className='start-path-2 text-green-400'
              ></rect>
              <style>
                {`
                    .start-path-1 {
                      animation: start-path-1 1.5s ease-in-out infinite;
                      animation-play-state: running;
                      transform-origin: center;
                    }
                    @keyframes start-path-1 {
                      0%, 20%, 80%, 100% {
                        transform: scale(.9) translate(0)
                      }
                      50% {
                        transform: scale(.9) translate(0.5rem)
                      }
                    }
                    .start-path-2 {
                      animation: start-path-2 1.5s ease-in-out infinite;
                      animation-play-state: running;
                    }
                    @keyframes start-path-2 {
                      0%, 20%, 80%, 100% {
                        transform: scaleX(1)
                      }
                      50% {
                        transform: scaleX(1.2)
                      }
                    }
                    `}
              </style>
            </svg>
            <h4 className='text-2xl font-semibold'>{t('features.0.title')}</h4>
            <p className='text-muted-foreground'>{t('features.0.description')}</p>
          </div>
          <div className='space-y-4'>
            <svg
              id='typography'
              width='72'
              height='72'
              viewBox='0 0 72 72'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle opacity='1' cx='36' cy='36' r='36' fill='rgba(255,211,51,.2)'></circle>
              <rect
                x='17'
                y='22'
                width='38'
                height='8'
                rx='4'
                fill='currentColor'
                className='typography-rect-1 text-yellow-400'
              ></rect>
              <rect
                opacity='0.8'
                x='17'
                y='32'
                width='22'
                height='8'
                rx='4'
                fill='currentColor'
                className='typography-rect-2 text-yellow-400/80'
              ></rect>
              <rect
                opacity='0.6'
                x='17'
                y='42'
                width='30'
                height='8'
                rx='4'
                fill='currentColor'
                className='typography-rect-3 text-yellow-400/60'
              ></rect>
              <style>
                {`
                    .typography-rect-1 {
                      animation: typography-rect-1 1.5s ease-in-out infinite;
                      animation-delay: .2s;
                    }
                    @keyframes typography-rect-1 {
                      0%, 100% {
                        transform: translateX(0)
                      }
                      50% {
                        transform: translateX(0.25rem)
                      }
                    }
                    .typography-rect-2 {
                      animation: typography-rect-2 1.5s ease-in-out infinite;
                      animation-delay: .2s;
                    }
                    @keyframes typography-rect-2 {
                      0%, 100% {
                        transform: translateX(0)
                      }
                      50% {
                        transform: translateX(1.25rem)
                      }
                    }
                    .typography-rect-3 {
                      animation: typography-rect-3 1.5s ease-in-out infinite;
                      animation-delay: .2s;
                    }
                    @keyframes typography-rect-3 {
                      0%, 100% {
                        transform: translateX(0)
                      }
                      50% {
                        transform: translateX(0.75rem)
                      }
                    }
                    `}
              </style>
            </svg>
            <h4 className='text-2xl font-semibold'>{t('features.1.title')}</h4>
            <p className='text-muted-foreground'>{t('features.1.description')}</p>
          </div>
          <div className='space-y-4'>
            <svg
              id='color'
              width='72'
              height='72'
              viewBox='0 0 72 72'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle opacity='1' cx='36' cy='36' r='36' fill='rgba(255,64,96,.2)'></circle>
              <path
                opacity='0.6'
                fillRule='evenodd'
                clipRule='evenodd'
                d='M50 53L32.7281 53L48.7281 37L50 37C52.2091 37 54 38.7908 54 41V49C54 51.2091 52.2091 53 50 53Z'
                fill='currentColor'
                className='color-path-1 text-red-500/60'
              ></path>
              <path
                opacity='0.8'
                fillRule='evenodd'
                clipRule='evenodd'
                d='M37.6703 23.0784C39.2324 21.5163 41.7651 21.5163 43.3272 23.0784L48.984 28.7353C50.5461 30.2974 50.5461 32.83 48.984 34.3921L37.0007 46.3755L37.0007 23.748L37.6703 23.0784Z'
                fill='currentColor'
                className='color-path-2 text-red-500/80'
              ></path>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M23 18C20.7909 18 19 19.7909 19 22V45C19 49.4183 22.5817 53 27 53C31.4183 53 35 49.4183 35 45V22C35 19.7909 33.2092 18 31 18H23ZM27 48C28.6569 48 30 46.6569 30 45C30 43.3431 28.6569 42 27 42C25.3432 42 24 43.3431 24 45C24 46.6569 25.3432 48 27 48Z'
                fill='currentColor'
                className='color-path-3 text-red-500'
              ></path>
              <style>
                {`
                      .color-path-1 {
                        animation: color-path-1 1.5s ease-in-out infinite;
                        transform-origin: 80% 100%;
                        animation-delay: .6s;
                      }
                      @keyframes color-path-1 {
                        0%, 100% {
                          transform: rotate(0deg) translateY(0)
                        }
                        50% {
                          transform: rotate(-5deg) translateY(-5px)
                        }
                      }
                      .color-path-2 {
                        animation: color-path-2 1.5s ease-in-out infinite;
                        transform-origin: 100% 50%;
                        animation-delay: .6s;
                      }
                      @keyframes color-path-2 {
                        0%, 100% {
                          transform: rotate(0deg) translateY(0)
                        }
                        50% {
                          transform: rotate(5deg) translateY(5px)
                        }
                      }
                     .color-path-3 {
                        animation: color-path-3 1.5s ease-in-out infinite;
                        transform-origin: 0% 100%;
                        animation-delay: .6s;
                      }
                      @keyframes color-path-3 {
                        0%, 100% {
                          transform: rotate(0deg) translateY(0)
                        }
                        50% {
                          transform: rotate(5deg) translateY(-5px)
                        }
                      }
                    `}
              </style>
            </svg>
            <h4 className='text-2xl font-semibold'>{t('features.2.title')}</h4>
            <p className='text-muted-foreground'>{t('features.2.description')}</p>
          </div>
          <div className='space-y-4'>
            <svg
              id='style'
              width='72'
              height='72'
              viewBox='0 0 72 72'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle opacity='1' cx='36' cy='36' r='36' fill='rgba(229,46,229,.2)'></circle>
              <g className='style-g'>
                <path
                  opacity='0.6'
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M24 34C26.2091 34 28 35.7909 28 38V39C28 41.7614 30.2386 44 33 44H34C36.2091 44 38 45.7909 38 48C38 50.2091 36.2091 52 34 52H33C25.8203 52 20 46.1797 20 39V38C20 35.7909 21.7909 34 24 34Z'
                  fill='currentColor'
                  className='text-purple-500/60'
                ></path>
                <path
                  opacity='0.6'
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M48 38C45.7909 38 44 36.2091 44 34V33C44 30.2386 41.7614 28 39 28H38C35.7909 28 34 26.2091 34 24C34 21.7909 35.7909 20 38 20H39C46.1797 20 52 25.8203 52 33V34C52 36.2091 50.2091 38 48 38Z'
                  fill='currentColor'
                  className='text-purple-500/60'
                ></path>
              </g>
              <rect
                x='40'
                y='40'
                width='16'
                height='16'
                rx='4'
                fill='currentColor'
                className='style-rect text-purple-500'
              ></rect>
              <rect
                x='16'
                y='16'
                width='16'
                height='16'
                rx='4'
                fill='currentColor'
                className='style-rect text-purple-500'
              ></rect>
              <style>
                {`
                      .style-g {
                        animation: style-g 3s ease-in-out infinite;
                        transform-origin: center;
                        animation-delay: .8s;
                      }
                      @keyframes style-g {
                        0%, 100% {
                          transform: rotate(0);
                        }
                        50% {
                          transform: rotate(180deg)
                        }
                      }
                     .style-rect {
                        animation: style-rect 1.5s ease-in-out infinite;
                        transform-origin: center;
                        animation-delay: .8s;
                      }
                      @keyframes style-rect {
                        0%, 100% {
                          transform: scale(1)
                        }
                        50% {
                          transform: scale(1.1)
                        }
                      }
                    `}
              </style>
            </svg>
            <h4 className='text-2xl font-semibold'>{t('features.3.title')}</h4>
            <p className='text-muted-foreground'>{t('features.3.description')}</p>
          </div>
          <div className='space-y-4'>
            <svg
              id='elements'
              width='72'
              height='72'
              viewBox='0 0 72 72'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle opacity='1' cx='36' cy='36' r='36' fill='rgba(0,170,255,.2)'></circle>
              <rect
                opacity='0.6'
                x='17'
                y='36'
                width='18'
                height='18'
                rx='4'
                fill='currentColor'
                className='elements-rect-1 text-blue-500/60'
              ></rect>
              <rect
                opacity='0.6'
                x='37'
                y='16'
                width='18'
                height='18'
                rx='4'
                fill='currentColor'
                className='elements-rect-2 text-blue-500/60'
              ></rect>
              <rect
                x='17'
                y='16'
                width='18'
                height='18'
                rx='4'
                fill='currentColor'
                className='elements-rect-3 text-blue-500'
              ></rect>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M41 36C38.7909 36 37 37.7909 37 40V51.1716C37 52.9534 39.1543 53.8457 40.4142 52.5858L44.1716 48.8284L49.1716 53.8284C50.7337 55.3905 53.2663 55.3905 54.8284 53.8284C56.3905 52.2663 56.3905 49.7337 54.8284 48.1716L49.8284 43.1716L53.5858 39.4142C54.8457 38.1543 53.9534 36 52.1716 36H41Z'
                fill='currentColor'
                className='elements-path text-blue-500'
              ></path>
              <style>
                {`
                    .elements-rect-1 {
                      animation: elements-rect-1 1.5s ease-in-out infinite;
                      transform-origin: center;
                      animation-delay: 1.2s;
                    }

                    @keyframes elements-rect-1  {
                      0%, 100% {
                        transform: translate(0)
                      }
                      50% {
                        transform: translateY(-18px)
                      }
                    }
                    .elements-rect-2 {
                      animation: elements-rect-2 1.5s ease-in-out infinite;
                      transform-origin: center;
                      animation-delay: 1.2s;
                    }

                    @keyframes elements-rect-2  {
                      0%, 100% {
                        transform: translate(0)
                      }
                      50% {
                        transform: translate(-20px)
                      }
                    }
                    .elements-rect-3 {
                      animation: elements-rect-3 1.5s ease-in-out infinite;
                      transform-origin: 30% 30%;
                      animation-delay: 1.2s;
                    }

                    @keyframes elements-rect-3 {
                      0%, 100% {
                        transform: scale(1)
                      }
                      50% {
                        transform: scale(1.2)
                      }
                    }
                    .elements-path {
                      animation: elements-path 1.5s ease-in-out infinite;
                      transform-origin: center;
                      animation-delay: 1.2s;
                    }

                    @keyframes elements-path {
                      0%, 100% {
                        transform: translate(0)
                      }
                      50% {
                        transform: translate(4px,4px)
                      }
                    }
                    `}
              </style>
            </svg>
            <h4 className='text-2xl font-semibold'>{t('features.4.title')}</h4>
            <p className='text-muted-foreground'>{t('features.4.description')}</p>
          </div>
          <div className='space-y-4'>
            <svg
              id='vault'
              width='60'
              height='60'
              viewBox='0 0 60 60'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle opacity='.2' cx='30' cy='30' r='30' fill='rgba(253,67,145,.8)'></circle>
              <path
                opacity='.6'
                d='M36 27v-7a6 6 0 00-6-6v0a6 6 0 00-6 6v7'
                stroke='currentColor'
                strokeWidth='6'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='vault-path-1 text-pink-500/60'
              ></path>
              <path
                d='M16 29a6 6 0 016-6h16a6 6 0 016 6v9a6 6 0 01-6 6H22a6 6 0 01-6-6v-9z'
                fill='currentColor'
                className='vault-path-2 text-pink-500'
              ></path>
              <style>
                {`
                    .vault-path-1 {
                      animation: vault-path-1 1.5s ease-in-out infinite;
                      animation-play-state: running;
                      transform-origin: center;
                    }

                    @keyframes vault-path-1 {
                      0%, 100% {
                        transform: translateY(0)
                      }
                      50% {
                        transform: translateY(-2px)
                      }
                    }

                    .vault-path-2 {
                      animation: vault-path-2 1.5s ease-in-out infinite;
                      animation-play-state: running;
                    }

                    @keyframes vault-path-2 {
                      0%, 100% {
                        transform: translate(0);
                        transform-origin: 0 0;
                      }
                      50% {
                        transform: translateY(2px);
                      }
                    }
                    `}
              </style>
            </svg>
            <h4 className='text-2xl font-semibold'>{t('features.5.title')}</h4>
            <p className='text-muted-foreground'>{t('features.5.description')}</p>
          </div>
        </div>
      </section>
      <section className='container my-12 flex flex-col justify-center gap-y-16 md:my-16 lg:my-24'>
        <div className='grid gap-4 *:space-y-4 md:gap-8 lg:grid-cols-2'>
          <div className='space-y-4'>
            <h4 className='text-2xl font-semibold'>{t('compared.1')}</h4>
            <Progress value={1.59} className='w-full' />
            <p className='text-muted-foreground'>1.59 s {t('compared.after')}</p>
            <Progress value={18.98} className='w-full' />
            <p className='text-muted-foreground'>18.98 s {t('compared.before')}</p>
          </div>
          <div className='space-y-4'>
            <h4 className='text-2xl font-semibold'>{t('compared.2')}</h4>
            <Progress value={3.6} className='w-full' />
            <p className='text-muted-foreground'>3.6 s {t('compared.after')}</p>
            <Progress value={120} className='w-full' />
            <p className='text-muted-foreground'>&gt; 2 mins {t('compared.before')}</p>
          </div>
          <div className='space-y-4'>
            <h4 className='text-2xl font-semibold'>{t('compared.3')}</h4>
            <Progress value={519.42} max={500} className='w-full' />
            <p className='text-muted-foreground'>519.42 Mbps {t('compared.after')}</p>
            <Progress value={10.07} max={500} className='w-full' />
            <p className='text-muted-foreground'>10.07 Mbps {t('compared.before')}</p>
          </div>
          <div className='space-y-4'>
            <h4 className='text-2xl font-semibold'>{t('compared.4')}</h4>
            <Progress value={28} max={200} className='w-full' />
            <p className='text-muted-foreground'>28 ms {t('compared.after')}</p>
            <Progress value={341} max={200} className='w-full bg-muted' />
            <p className='text-muted-foreground'>341 ms {t('compared.before')}</p>
          </div>
        </div>
      </section>
      <section className='container my-12 flex flex-col justify-center gap-y-16 md:my-16 lg:my-24'>
        <h2 className='text-center text-xl font-semibold lg:text-4xl'>{t('compatible.title')}</h2>
        <div className='flex w-fit flex-wrap items-start gap-4'>
          {t('compatible.description')}
          <span className='text-muted-foreground'>{t('compatible.statement')}</span>
        </div>
        <div className='flex flex-wrap items-center justify-around gap-4'>
          <Image
            src='/images/microsoft.webp'
            alt='windows'
            className='invert dark:invert-0'
            width={48}
            height={48}
          />
          <Image
            src='/images/apple.webp'
            alt='apple'
            className='invert dark:invert-0'
            width={48}
            height={48}
          />
          <Image
            src='/images/android.webp'
            alt='android'
            className='invert dark:invert-0'
            width={48}
            height={48}
          />
          <Image
            src='/images/router.webp'
            alt='router'
            className='invert dark:invert-0'
            width={48}
            height={48}
          />
          <Image
            src='/images/linux.webp'
            alt='linux'
            className='invert dark:invert-0'
            width={48}
            height={48}
          />
          <Image
            src='/images/surge.webp'
            alt='surge'
            className='invert dark:invert-0'
            width={48}
            height={48}
          />
          <Image
            src='/images/clash.webp'
            alt='clash'
            className='invert dark:invert-0'
            width={48}
            height={48}
          />
          <Image
            src='/images/quantumultx.webp'
            alt='quantumultx'
            className='invert dark:invert-0'
            width={48}
            height={48}
          />
          <Image
            src='/images/quantumult.webp'
            alt='quantumult'
            className='invert dark:invert-0'
            width={48}
            height={48}
          />
          <Image
            src='/images/surfboard.webp'
            alt='surfboard'
            className='invert dark:invert-0'
            width={48}
            height={48}
          />
        </div>
      </section>
      <section className='container my-12 flex flex-col justify-center gap-y-16 md:my-16 lg:my-24'>
        <h2 className='text-center text-xl font-semibold lg:text-4xl'>{t('problem.title')}</h2>
        <Accordion type='single' collapsible className='w-full'>
          {[...Array(5)].map((_, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{t(`problem.${index}.title`)}</AccordionTrigger>
              <AccordionContent>{t(`problem.${index}.description`)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </Fragment>
  );
}
