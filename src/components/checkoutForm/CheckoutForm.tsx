"use client";

import { useSelector } from "react-redux";
import { selectCheckedCartItems } from "@/redux/slice/cartSlice";
import priceFormat from "@/utils/priceFormat";
import Image from "next/image";
import { Mobile } from "@/hooks/useMediaQuery";

export default function CheckoutForm() {
  const cartItems = useSelector(selectCheckedCartItems);
  const isMobile = Mobile();

  return (
    <div>
      <div>
        <div className="py-20 px-5 sm:py-10 sm:px-3 border-y border-lightGray flex flex-col gap-8">
          {cartItems.map((item, index) => {
            const { id, name, price, discount, cartQuantity, imageURL } = item;
            const discountedPrice = price - price * (discount / 100);
            if (isMobile)
              return (
                <div key={id}>
                  <div className="flex justify-start items-center gap-8">
                    <p>{index + 1}</p>
                    <div className="w-[77px] h-[77px] flex justify-center items-center border border-lightGray">
                      <Image
                        src={imageURL}
                        alt={name}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "80%", height: "auto" }}
                      />
                    </div>
                    <div className="w-1/2 h-[77px] flex flex-col justify-between">
                      <p className={"text-sm text-nomal w-full"}>{name}</p>
                      <div className="flex h-5 justify-between items-center">
                        <p className="text-lg font-bold">{cartQuantity}개</p>
                        <p className={"text-lg font-bold text-right"}>
                          {priceFormat(discountedPrice * cartQuantity)} 원
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            else
              return (
                <div
                  key={id}
                  className={
                    "flex justify-between items-center px-3 gap-3 text-[20px]"
                  }
                >
                  <p>{index + 1}</p>
                  <div className="w-[100px] h-[100px] flex justify-center items-center border border-lightGray">
                    <Image
                      src={imageURL}
                      alt={name}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "80%", height: "auto" }}
                    />
                  </div>
                  <div className="w-1/3">
                    <p className={"text-lg text-nomal w-full"}>{name}</p>
                  </div>
                  <p className="text-lg">{cartQuantity}</p>
                  <p className="font-bold text-[22px]">
                    {priceFormat(discountedPrice * cartQuantity)} 원
                  </p>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}
