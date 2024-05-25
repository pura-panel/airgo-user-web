'use client';

import { useEffect } from 'react';
import { checkMode, globalState, toggleMode, type GlobalState } from '@/stores/global';
import { LaptopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useSnapshot } from 'valtio';
import useMounted from '@/hooks/useMounted';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export function SwitchMode() {
  const mounted = useMounted();
  const { mode } = useSnapshot(globalState);

  useEffect(() => {
    if (mounted && !checkMode()) toggleMode(mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  return (
    <ToggleGroup
      type='single'
      size='sm'
      value={mounted ? mode : undefined}
      onValueChange={(value) => {
        if (value) toggleMode(value as GlobalState['mode']);
      }}
      className='w-fit rounded-full border p-0.5 *:rounded-full'
    >
      <ToggleGroupItem value='light' aria-label='Toggle light'>
        <SunIcon className='size-4' />
      </ToggleGroupItem>
      <ToggleGroupItem value='system' aria-label='Toggle system'>
        <LaptopIcon className='size-4' />
      </ToggleGroupItem>
      <ToggleGroupItem value='dark' aria-label='Toggle dark'>
        <MoonIcon className='size-4' />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
