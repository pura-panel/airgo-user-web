'use client';

import { languages, useLanguage, useTranslation } from '@/i18n';
import { getCountry } from '@/lib/countries';
import useMounted from '@/hooks/useMounted';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import Icon from '@/components/icon';

export default function SwitchLanguage() {
  const mounted = useMounted();
  const { lng, changeLanguage } = useLanguage();
  const { t } = useTranslation(lng, 'language');
  const country = getCountry(lng);

  if (!mounted) return <Skeleton className='h-8 w-14 rounded-full' />;

  return (
    <Select value={lng} onValueChange={changeLanguage}>
      <SelectTrigger
        aria-label='Select Language'
        className='h-8 w-14 rounded-full border-none px-2 shadow-none'
      >
        <Icon icon={`flagpack:${country?.alpha2.toLowerCase()}`} className='size-5' />
      </SelectTrigger>
      <SelectContent align='end'>
        {languages.map(getCountry).map((item) => (
          <SelectItem key={`${item?.lang}-${item?.alpha2}`} value={`${item?.lang}-${item?.alpha2}`}>
            <div className='flex items-center gap-1'>
              <Icon icon={`flagpack:${item?.alpha2.toLowerCase()}`} />
              {t(`${item?.lang}-${item?.alpha2}`)}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
