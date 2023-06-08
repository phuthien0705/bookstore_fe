export enum EOrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELED = 'canceled',
}
// 0 1 2 3 4
// 0   1 2 3
// PENDING = 'pending', 0 

//   SHIPPED = 'shipped', 1
//   DELIVERED = 'delivered', 2 
//   CANCELED = 'canceled', 3