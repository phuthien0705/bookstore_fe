export const orderStatus = (order: any) => {
  if (!order || order?.isDeleted) return;
  switch (order.status) {
    case 'pending':
      return 'Pending';
    case 'processing':
      return 'Processing';
  }
};
