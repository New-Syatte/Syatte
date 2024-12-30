// 할인 가격 계산
export const getDiscountPrice = (price: number, discount: number) => {
  return Math.floor(price - price * (discount / 100));
};
