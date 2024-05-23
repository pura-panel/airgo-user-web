'use client';

import { globalState } from '@/stores/global';
import { GlobalScrollbar } from 'mac-scrollbar';
import { useSnapshot } from 'valtio';
import 'mac-scrollbar/dist/mac-scrollbar.css';

export default function LayoutScroll() {
  const { systemMode } = useSnapshot(globalState);
  return (
    <GlobalScrollbar
      skin={systemMode}
      suppressScrollX={false}
      trackStyle={() => ({
        backgroundColor: 'transparent',
        border: 'none',
      })}
    />
  );
}
