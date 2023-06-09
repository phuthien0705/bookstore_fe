export const sortOrdersByDate = (orders: any[]) => {
  if (!orders || orders?.length === 0) return [];
  return orders.sort(function (a: any, b: any) {
    let dateA = new Date(a.createdAt).getTime();
    let dateB = new Date(b.createdAt).getTime();
    return dateA < dateB ? 1 : -1;
  });
};
