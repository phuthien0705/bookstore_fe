import { IEachAuthorData } from './author.interface';
import { IEachGenreData } from './genres.interface';

export interface IEachBookData {
  authors: Array<IEachAuthorData>;
  genres: Array<IEachGenreData>;
  discounts: Array<any>;
  reviews: Array<any>;
  rating: number;
  hasDiscount: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  name: string;
  publisherId: string;
  publishedDate: string;
  description?: string;
  availableQuantity: number;
  totalPages: number;
  language: string;
  images: Array<{ url: string }>;
  isbn: string;
  price: number;
  priceDiscount: number;
  id: string;
}
