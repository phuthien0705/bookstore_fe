export interface ICartSection {
  data: any;
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => void;
}
export interface IItemTable {
  items: any;
  handleIncreaseQuantity: Function;
  handleDecreaseQuantity: Function;
  handleDelete: Function;
  checkItem: Function;
  checkAllItem: Function;
  clearCart: Function;
}

export interface IItemTableMobile {
  items: any;
  handleIncreaseQuantity: Function;
  handleDecreaseQuantity: Function;
  handleDelete: Function;
  checkItem: Function;
  checkAllItem: Function;
  clearCart: Function;
}
export interface IOrderSummary {
  items: any;
}
export interface IProductAdded {
  amount: string | number;
}
export interface ISubmitCart {
  setCurrentIndex: Function;
  items: any;
}
