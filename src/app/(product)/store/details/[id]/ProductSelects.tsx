"use client";
import { useState } from "react";
import { ProductOption } from "@/type/products";
import { useDispatch, useSelector } from "react-redux";
import {
  setColor,
  setSize,
  resetOptions,
  selectColor,
  selectSize,
} from "@/redux/slice/productOptionsSlice";

const ProductSelects = ({ options }: { options: ProductOption[] }) => {
  const dispatch = useDispatch();
  const selectedColor = useSelector(selectColor);
  const selectedSize = useSelector(selectSize);

  const handleColorChange = (colorName: string) => {
    dispatch(setColor(colorName));
    // 색상이 변경되면 해당 색상의 첫 번째 사이즈로 자동 선택
    const selectedOption = options.find(
      opt => opt.color.colorName === colorName,
    );
    if (selectedOption?.sizes[0]) {
      dispatch(setSize(selectedOption.sizes[0].size));
    }
  };

  const handleSizeChange = (size: string) => {
    dispatch(setSize(size));
  };

  const getSelectedColorSizes = () => {
    return (
      options.find(opt => opt.color.colorName === selectedColor)?.sizes || []
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <select
        value={selectedColor || ""}
        onChange={e => handleColorChange(e.target.value)}
        className="select w-full h-12 border border-gray-300 rounded px-4"
      >
        <option value="" disabled>
          컬러 선택
        </option>
        {options.map(option => (
          <option key={option.color.colorName} value={option.color.colorName}>
            {option.color.colorName}
          </option>
        ))}
      </select>
      <select
        value={selectedSize || ""}
        onChange={e => handleSizeChange(e.target.value)}
        className="select w-full h-12 border border-gray-300 rounded px-4"
        disabled={!selectedColor}
      >
        <option value="" disabled>
          용량 선택
        </option>
        {getSelectedColorSizes().map(size => (
          <option key={size.size} value={size.size}>
            {size.size} - {size.price.toLocaleString()}원
            {size.discount > 0 && ` (${size.discount}% 할인)`}
          </option>
        ))}
      </select>
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
