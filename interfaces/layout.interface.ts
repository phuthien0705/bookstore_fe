import { NextPageWithLayout } from '@/pages/page';
import { AppProps } from 'next/app';

export interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}
