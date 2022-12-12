export const moneyFormat = (money: number) => {
  return money
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,')
    .slice(0, -3);
};
