import httpRequest from '@/services/httpRequest';

export const getBookReviews = async (bookId: string) => {
  return httpRequest.get('/reviews?bookId=' + bookId)
}

export const addReview = async (data: any) => {
  return httpRequest.post('/reviews', data);
};
