"use client";
import { ProductOption } from "@/type/products";
import { useDispatch, useSelector } from "react-redux";
import { setColor, selectColor } from "@/redux/slice/productOptionsSlice";
import CustomSelect from "@/components/customSelect/CustomSelect";
import { toast } from "react-toastify";
import { addTempItem } from "@/redux/slice/productTempSlice";
import { useState } from "react";

const ProductSelects = ({ options }: { options: ProductOption[] }) => {
  const dispatch = useDispatch();
  const selectedColor = useSelector(selectColor);
  const [selectedSize, setSelectedSize] = useState("");

  const handleColorChange = (colorName: string) => {
    const selectedOption = options.find(
      opt => opt.color.colorName === colorName,
    );

    if (selectedOption) {
      dispatch(setColor(selectedOption.color));
      setSelectedSize(""); // 색상이 변경되면 size 선택 초기화
    }
  };

  const handleAddOption = (size: string) => {
    if (!selectedColor) {
      toast.error("컬러를 선택해주세요.");
      return;
    }

    const colorOption = options.find(
      opt => opt.color.colorName === selectedColor.colorName,
    );
    const sizeOption = colorOption?.sizes.find(
      sizeOpt => sizeOpt.size === size,
    );

    if (!sizeOption) return;

    const newItem = {
      color: selectedColor.colorName,
      colorCode: selectedColor.colorCode,
      size,
      price: sizeOption.price,
      discount: sizeOption.discount,
      quantity: 1,
    };

    dispatch(addTempItem(newItem));
  };

  const submitAddOption = (value: string) => {
    setSelectedSize(value);
    handleAddOption(value);
  };

  const getSelectedColorSizes = () => {
    return (
      options.find(opt => opt.color.colorName === selectedColor?.colorName)
        ?.sizes || []
    );
  };

  const colorOptions = options.map((option, index) => ({
    value: option.color.colorName,
    label: `${index + 1}) ${option.color.colorName}`,
  }));

  const sizeOptions = getSelectedColorSizes().map((size, index) => ({
    value: size.size,
    label: `${index + 1}) ${size.size} - ${size.price.toLocaleString()}원${
      size.discount > 0 ? ` (${size.discount}% 할인)` : ""
    }`,
  }));

  return (
    <div className="flex flex-col gap-4 font-helvetica text-sm">
      <CustomSelect
        id="color-select"
        value={selectedColor?.colorName || ""}
        onChange={handleColorChange}
        options={colorOptions}
        placeholder="컬러 선택"
      />
      <CustomSelect
        id="size-select"
        value={selectedSize}
        onChange={submitAddOption}
        options={sizeOptions}
        placeholder="용량 선택"
        disabled={!selectedColor}
      />
    </div>
  );
};

export default ProductSelects;
/*
options 형태
[
  {
    "color": {
      "colorName": "루비",
      "colorCode": "#E0115F"
    },
    "sizes": [
      {
        "size": "50ml",
        "price": 78000,
        "discount": 15,
        "_key": "3e94c8749c34",
        "stock": 5
      },
      {
        "size": "1L",
        "price": 250000,
        "discount": 15,
        "_key": "e8128aafb1d1",
        "stock": 8
      }
    ],
    "_key": "89e2684c19f4"
  },
  {
    "sizes": [
      {
        "stock": 9,
        "size": "946ml",
        "price": 95000,
        "discount": 0,
        "_key": "d4856614abfd"
      }
    ],
    "_key": "d16922d3ff8e",
    "color": {
      "colorName": "그린",
      "colorCode": "#599468"
    }
  }
]
*/
