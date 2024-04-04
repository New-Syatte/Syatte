"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "@/redux/slice/checkoutSlice";
import Heading from "@/components/heading/Heading";
import Button from "@/components/button/Button";
import { useSession } from "next-auth/react";
import URLS from "@/constants/urls";

const initialState = {
  name: "",
  line: "",
  city: "",
  postalCode: "",
  phone: "",
};

const initialState2 = {
  name: "",
  phone: "",
  userEmail: "",
  memo: "",
};

const id = "daum-postcode"; // script가 이미 rendering 되어 있는지 확인하기 위한 ID
const src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

export default function CheckoutAddressClient() {
  const { data: user } = useSession();

  // const postcodeRef = useRef<HTMLDivElement | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
  const [roadAddress, setRoadAddress] = useState<string>("");
  const [zipCode, setZipCode] = useState("");

  const [shippingAddress, setShippingAddress] = useState({
    ...initialState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialState2,
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const loadScript = () => {
    const script = document.createElement("script");
    script.src = src;
    script.id = id;
    script.async = true;
    script.onload = () => {
      setIsScriptLoaded(true);
    };
    document.body.appendChild(script);
  };

  // 버튼 클릭 시 주소 검색 스크립트 로드 또는 주소 검색창 열기
  const ZipCodeSearch = () => {
    if (!isScriptLoaded) {
      loadScript();
    } else {
      // 이미 스크립트가 로드되었을 때 주소 검색창 열기

      const postcode = new (window as any).daum.Postcode({
        oncomplete: function (data: any) {
          setRoadAddress(data.roadAddress);
          setZipCode(data.zonecode);
        },
      });
      postcode.open();
    }
  };

  const handleShipping = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleBilling = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingAddress({ ...billingAddress, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      SAVE_SHIPPING_ADDRESS({
        ...shippingAddress,
        postalCode: zipCode,
        city: roadAddress,
      }),
    );
    dispatch(
      SAVE_BILLING_ADDRESS({ ...billingAddress, userEmail: user?.user.email }),
    );
    router.push(URLS.CHECKOUT);
  };

  const LABELSTYLE =
    "block font-medium mt-[50px] mb-[22px] text-[20px] text-darkgray";
  const INPUTSTYLE =
    "block w-full text-2xl font-light p-4 mx-auto my-0 border border-black rounded-md outline-none";

  return (
    <section className="w-[1020px] mx-auto my-12">
      <Heading title={"상세주문"} fontSize={"3xl"} />
      <form className="w-full flex" onSubmit={handleSubmit}>
        <div className="w-full p-4">
          <h3 className="font-bold text-[1.4rem] mx-0 my-4">배송지 주소</h3>
          <label className={LABELSTYLE}>받는 사람 이름</label>
          <input
            required
            name={"name"}
            className={INPUTSTYLE}
            value={shippingAddress.name}
            onChange={e => handleShipping(e)}
            placeholder="받는 사람 이름"
            type="text"
          />
          <div className="flex justify-between items-center mr-3">
            <label className={LABELSTYLE}>우편번호</label>
            <Button
              onClick={ZipCodeSearch}
              styleType="blank"
              style={
                "mt-[46px] mb-[18px] bg-colorBlack text-white text-medium p-2"
              }
            >
              우편번호 검색
            </Button>
          </div>
          <input
            required
            readOnly
            className={INPUTSTYLE}
            name={"postalCode"}
            value={zipCode}
            placeholder="우편번호 입력"
            type="text"
          />

          <label className={LABELSTYLE}>주소</label>
          <input
            required
            readOnly
            className={INPUTSTYLE}
            name={"city"}
            value={roadAddress}
            placeholder="도시"
            type="text"
          />

          <label className={LABELSTYLE}>상세 주소 입력</label>
          <input
            required
            className={INPUTSTYLE}
            name={"line"}
            value={shippingAddress.line}
            onChange={e => handleShipping(e)}
            placeholder="상세 주소 입력"
            type="text"
          />
          <label className={LABELSTYLE}>연락처</label>
          <input
            required
            className={INPUTSTYLE}
            name={"phone"}
            value={shippingAddress.phone}
            onChange={e => handleShipping(e)}
            placeholder="연락처를 입력하세요"
            type="text"
          />
        </div>

        <div className="w-full p-4">
          <h3 className="font-bold text-[1.4rem] mx-0 my-4">주문하신 분</h3>
          <label className={LABELSTYLE}>보내는 사람 이름</label>
          <input
            required
            className={INPUTSTYLE}
            name={"name"}
            value={billingAddress.name}
            onChange={e => handleBilling(e)}
            placeholder="주문자 성명"
            type="text"
          />

          <label className={LABELSTYLE}>연락처</label>
          <input
            required
            className={INPUTSTYLE}
            name={"phone"}
            value={billingAddress.phone}
            onChange={e => handleBilling(e)}
            placeholder="연락처를 입력하세요"
            type="text"
          />
          <label className={LABELSTYLE}>배송 요청 사항</label>
          <input
            required
            className={INPUTSTYLE + " mb-6"}
            name={"memo"}
            value={billingAddress.memo}
            onChange={e => handleBilling(e)}
            placeholder="배송 요청 사항 입력"
            type="text"
          />

          <Button type={"submit"}>주문하기</Button>
        </div>
      </form>
    </section>
  );
}
