import { getListPost } from '@/apis/post.api';
import { POST } from '@/constants/queryKeyName';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function useGetListPost() {
  const [page, setPage] = useState<number>(1);
  const limit = 10;
  const queryReturn = useQuery({
    queryKey: [POST, page, limit],
    queryFn: getListPost,
    refetchOnMount: true,
  });

  return { queryReturn, page, setPage };
}
