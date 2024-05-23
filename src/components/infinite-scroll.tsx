'use client';

import { ReactNode, useEffect, useRef } from 'react';

interface InfiniteScrollProps<T> {
  className?: string;
  children?: ReactNode;
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  dataSource?: Array<T>;
  renderItem?: (data: T) => ReactNode;
  renderSkeleton?: () => ReactNode;
}

export default function InfiniteScroll<T>({
  loading,
  dataSource = [],
  renderItem,
  renderSkeleton,
  loadMore,
  hasMore,
  className,
  children,
}: InfiniteScrollProps<T>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let container = ref.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (!hasMore || loading) return;
        loadMore();
      }
    });

    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [hasMore, loadMore, loading]);

  return (
    <>
      <div className={className}>
        {children ||
          dataSource.map((data) => {
            return renderItem?.(data);
          })}
        {loading && renderSkeleton?.()}
      </div>
      <div ref={ref}></div>
    </>
  );
}
