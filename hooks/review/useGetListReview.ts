import { getBookReviews } from "@/apis/review.api";
import { BOOK_REVIEW } from "@/constants/queryKeyName";
import { useQuery } from "react-query";

const useGetListReview = (id: string) => {
    const getListQuery: any = useQuery(
      [BOOK_REVIEW, id],
      () => getBookReviews(id),
      {
        refetchOnMount: true,
        keepPreviousData: true,
      }
    );
  
    return getListQuery;
  };
  
  export default useGetListReview;