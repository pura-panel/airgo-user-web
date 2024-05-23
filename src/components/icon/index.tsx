'use client';

import { icons as FlagPack } from '@iconify-json/flagpack';
import { addCollection, Icon as Iconify, IconProps } from '@iconify/react';
import Local from './local.json';

addCollection(Local);
addCollection(FlagPack);

export default function Icon(props: IconProps) {
  return <Iconify {...props} />;
}
