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
}

const TempItem = ({ item, onQuantityChange, onDelete }: Props) => {
  const { color, size, price, discount, quantity } = item;
  const discountedPrice = price - (price * discount) / 100;

  return (
    <div className="flex justify-between items-center border-b-2 gap-8 w-full h-[61px] bg-zinc-100 rounded p-3">
      <div className="flex items-center gap-2">
        <span className="text-sm">{color}</span>
        <span className="text-sm text-gray-500">|</span>
        <span className="text-sm">{size}</span>
      </div>
      <div className="flex items-center gap-4">
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
              {price.toLocaleString()}원
            </span>
          )}
          <span className="font-bold">
            {(discountedPrice * quantity).toLocaleString()}원
          </span>
        </div>
        <button
          onClick={onDelete}
          className="ml-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default TempItem;
