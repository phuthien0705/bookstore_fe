import { ReactNode } from 'react';
import { IEachBookData } from '../book.interface';

export interface IProductCard {
  product: IEachBookData;
  slideMode?: boolean;
  isLoading?: boolean;
  index: number;
}

export interface IProductCardItem {
  product: IEachBookData;
  index: number;
}

export interface IProductCardItems {
  data: any;
  title?: ReactNode | string;
  titleIcon?: ReactNode;
  titleBackground?: string;
  isLoading?: boolean;
  slideToShow?: number;
  genreId?: string | null;
}

export interface IProductCardItemsByGenre {
  title?: string | ReactNode;
  titleIcon?: ReactNode;
  titleBackground?: string;
  slideToShow?: number;
  genreId?: string | null;
}

export interface IProductCardSkeleton {
  slideMode?: boolean;
}

export interface IMainCard {
  border?: boolean;
  boxShadow?: boolean;
  children: any;
  content?: boolean;
  contentClass?: string;
  contentSX?: any;
  darkTitle?: boolean;
  secondary?: any;
  shadow?: string;
  sx?: any;
  title?: any;
  elevation?: number;

  [others: string]: unknown;
}

export interface ISubCard {
  children: ReactNode;
  content: boolean;
  contentClass?: string;
  darkTitle?: boolean;
  secondary: any;
  sx?: any;
  contentSX?: any;
  title: any;

  [others: string]: unknown;
}
