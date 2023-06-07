import httpRequest from '@/services/httpRequest';

export const getBookReviews = async (bookId: string) => {
  return httpRequest.get(`/reviews/book/${bookId}`)
}

export const addReview = async (data: any) => {
  return httpRequest.post('/reviews', data);
};
