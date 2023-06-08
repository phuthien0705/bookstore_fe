import { IPaginationResponse } from '@/interfaces/general.interface';
import { IEachReviewData } from '@/interfaces/review.interface';
import httpRequest from '@/services/httpRequest';

export const getBookReviews = async (
  bookId: string,
  page: number,
  limit: number
) => {
  return httpRequest.get<IPaginationResponse<IEachReviewData>>(
    `/reviews?limit=${limit}&page=${page}&bookId=${bookId}`
  );
};

export const addReview = async (data: any) => {
  return httpRequest.post('/reviews', data);
};
