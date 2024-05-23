import { Fragment } from 'react';
import Link from 'next/link';
import {
  DiscordLogoIcon,
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';
import {
  DISCORD_LINK,
  EMAIL,
  GITHUB_LINK,
  INSTAGRAM_LINK,
  LINKEDIN_LINK,
  TELEGRAM_LINK,
  TWITTER_LINK,
} from '@/lib/constants';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/icon';
import { SwitchMode } from './switch-mode';

const Links = [
  {
    icon: <EnvelopeClosedIcon className='size-4' />,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: <GitHubLogoIcon className='size-4' />,
    href: GITHUB_LINK,
  },
  {
    icon: <TwitterLogoIcon className='size-4' />,
    href: TWITTER_LINK,
  },
  {
    icon: <DiscordLogoIcon className='size-4' />,
    href: DISCORD_LINK,
  },
  {
    icon: <InstagramLogoIcon className='size-4' />,
    href: INSTAGRAM_LINK,
  },
  {
    icon: <LinkedInLogoIcon className='size-4' />,
    href: LINKEDIN_LINK,
  },
  {
    icon: <Icon icon='logos:telegram' className='size-4' />,
    href: TELEGRAM_LINK,
  },
];

export default function LayoutFooter() {
  return (
    <footer className='border-t'>
      <div className='container flex flex-col items-center justify-between gap-4 py-4 text-sm text-muted-foreground lg:flex-row'>
        <div className='flex flex-col gap-4'>
          <p>© 2024 All rights reserved.</p>
          <nav className='flex h-4 flex-wrap items-center gap-2'>
            {Links.filter((item) => Boolean(item.href?.replace('mailto:', ''))).map(
              (item, index) => (
                <Fragment key={index}>
                  {index !== 0 && <Separator orientation='vertical' />}
                  <Link href={item.href!}>{item.icon}</Link>
                </Fragment>
              ),
            )}
          </nav>
        </div>
        <SwitchMode />
      </div>
    </footer>
  );
}
