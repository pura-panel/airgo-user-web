import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  return (
    <div className='fixed left-0 top-0 z-50 flex size-full flex-col items-center justify-center'>
      <LoaderCircle className='size-12 animate-spin text-primary' />
      <p className='ml-2 text-primary'>Loading...</p>
    </div>
  );
}
