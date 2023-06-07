import { IEachBookData } from '../book.interface';
import { IPaginationResponse } from '../general.interface';

export interface IProductInfo {
  data: any;
  isLoading: boolean;
}
export interface IProductSlides {
  slideData: IPaginationResponse<IEachBookData> | undefined;
  detailData: IEachBookData | undefined;
  isSlideLoading: boolean;
  isSlideFetching: boolean;
}
