import { getDiscountPrice } from "@/utils/getDiscount";

interface TempItemType {
  color: string;
  size: string;
  price: number;
  discount: number;
  quantity: number;
}

interface Props {
  item: TempItemType;
  onQuantityChange: (quantity: number) => void;
  onDelete: () => void;
  productName: string;
}

const TempItem = ({ item, onQuantityChange, onDelete, productName }: Props) => {
  const { color, size, price, discount, quantity } = item;
  const discountedPrice = getDiscountPrice(price, discount);

  return (
    <div className="flex flex-col justify-center w-full bg-bgWhiteSmoke rounded p-3 font-helvetica">
      {/* Product Name & Options */}
      <div className="flex items-center justify-between gap-2 min-h-[49px] border-b border-opacity-50">
        <div className="flex items-center gap-2 text-lg">
          <span>{productName}</span>
          <span className="text-sm text-gray-500">|</span>
          <span>{color}</span>
          <span className="text-sm text-gray-500">|</span>
          <span>{size}</span>
        </div>
        <button
          onClick={onDelete}
          className="ml-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
      {/* Quantity & Price */}
      <div className="flex items-end justify-between min-h-[49px]">
        <div className="flex items-center h-9 bg-white border border-zinc-300 rounded">
          <button
            onClick={() => onQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="w-8 h-full flex items-center justify-center disabled:text-gray-300"
          >
            -
          </button>
          <span className="w-8 h-full flex items-center justify-center">
            {quantity}
          </span>
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            className="w-8 h-full flex items-center justify-center"
          >
            +
          </button>
        </div>
        <div className="flex flex-col items-end min-w-[100px]">
          {discount > 0 && (
            <span className="text-xs text-gray-500 line-through">
              {(price * quantity).toLocaleString()}원
            </span>
          )}
          <span className="font-bold text-[22px]">
            {(discountedPrice * quantity).toLocaleString()}원
          </span>
        </div>
      </div>
    </div>
  );
};

export default TempItem;
