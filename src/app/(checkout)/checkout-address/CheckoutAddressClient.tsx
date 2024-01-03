"use client";

import styles from "./CheckoutAddress.module.scss";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useNextRouter from "@/hooks/useNextRouter";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "@/redux/slice/checkoutSlice";
import Heading from "@/components/heading/Heading";
import Button from "@/components/button/Button";
import { useSession } from "next-auth/react";

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

const LABELSTYLE = "mt-[50px] mb-[22px] text-[20px] text-darkgray";
const INPUTSTYLE = "w-full text-[20px] px-2 border-b-2 border-black";

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
  const router = useNextRouter();

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
    router.push("/checkout");
  };

  return (
    <section className={styles.checkout}>
      <Heading title={"상세주문"} fontSize={"3xl"} />
      <form onSubmit={handleSubmit}>
        <div className={styles.card}>
          <h3>배송지 주소</h3>
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

          <div>
            <div className={"flex justify-between items-center mr-3"}>
              <label>우편번호</label>
              <Button onClick={ZipCodeSearch} style="py-3 px-12">
                우편번호 검색
              </Button>
            </div>
            <input
              required
              readOnly
              name={"postalCode"}
              // value={ shippingAddress.postalCode }
              value={zipCode}
              // onChange={ (e) => handleShipping(e) }
              placeholder="우편번호 입력"
              type="text"
            />
          </div>

          <label>주소</label>
          <input
            required
            readOnly
            name={"city"}
            // value={ shippingAddress.city }
            value={roadAddress}
            // onChange={ (e) => handleShipping(e) }
            placeholder="도시"
            type="text"
          />

          <label>상세 주소 입력</label>
          <input
            required
            name={"line"}
            value={shippingAddress.line}
            onChange={e => handleShipping(e)}
            placeholder="상세 주소 입력"
            type="text"
          />
          <label>연락처</label>
          <input
            required
            name={"phone"}
            value={shippingAddress.phone}
            onChange={e => handleShipping(e)}
            placeholder="연락처를 입력하세요"
            type="text"
          />
        </div>

        <div className={styles.card}>
          <h3>주문하신 분</h3>
          <label className={LABELSTYLE}>보내는 사람 이름</label>
          <input
            required
            name={"name"}
            value={billingAddress.name}
            onChange={e => handleBilling(e)}
            placeholder="주문자 성명"
            type="text"
          />

          <label>연락처</label>
          <input
            required
            name={"phone"}
            value={billingAddress.phone}
            onChange={e => handleBilling(e)}
            placeholder="연락처를 입력하세요"
            type="text"
          />
          <label>배송 요청 사항</label>
          <input
            required
            name={"memo"}
            value={billingAddress.memo}
            onChange={e => handleBilling(e)}
            placeholder="배송 요청 사항 입력"
            type="text"
          />

          <Button type={"submit"} style="py-3 px-12">
            주문하기
          </Button>
        </div>
      </form>
    </section>
  );
}
