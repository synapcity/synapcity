'use client';

import dynamic from 'next/dynamic';
import { Loading } from '@/components/loading';

const GlobalPage = dynamic(
  () => import('@/components/pages/GlobalPage/GlobalPage').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <Loading fullScreen />,
  }
);

export default function ClientGlobalPage() {
  return <GlobalPage />;
}