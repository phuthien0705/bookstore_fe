import Cookies from 'js-cookie';
import { useInfiniteQuery } from 'react-query';
// import { getNotiList } from '../apis/profile.api';

let page = 1;
let count = 0;
let limit = 20;

export default function useNotifications() {
  return useInfiniteQuery(
    'notifications',
    async ({ pageParam = 1 }) => {
      const accessToken = Cookies.get('accessToken');
      if (accessToken) {
        // console.log('pageParam', pageParam)
        page = pageParam;
        // let res = (await getNotiList({ page: pageParam, limit })) as any;
        let res = { data: { count: 0, list: [] } };
        const data = res.data;
        count = data.count;
        return data.list;
      }
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      getPreviousPageParam: (_firstPage) => {
        // console.log('first',firstPage);
        return page > 1 ? page - 1 : 1;
      },
      getNextPageParam: (_nextPage) => {
        // console.log('next', nextPage)
        // console.log('count', count)
        // console.log('page', page)
        return limit * page < count ? page + 1 : undefined;
      },
    }
  );
}
