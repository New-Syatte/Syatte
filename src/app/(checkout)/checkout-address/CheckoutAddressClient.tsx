"use client";

import { ChangeEvent, FormEvent, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
  selectBillingAddress,
  selectShippingAddress,
} from "@/redux/slice/checkoutSlice";
import Heading from "@/components/heading/Heading";
import Button from "@/components/button/Button";
import { useSession } from "next-auth/react";
import URLS from "@/constants/urls";
import CartInfoArticleWrapper from "@/app/(cart)/cart/CartInfoArticleWrapper";
import { Mobile } from "@/hooks/useMediaQuery";

const id = "daum-postcode"; // script가 이미 rendering 되어 있는지 확인하기 위한 ID
const src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

export default function CheckoutAddressClient() {
  const { data: user } = useSession();
  const formRef = useRef<HTMLFormElement>(null);

  // const postcodeRef = useRef<HTMLDivElement | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
  const [roadAddress, setRoadAddress] = useState<string>("");
  const [zipCode, setZipCode] = useState("");

  // Redux에서 값을 가져오되, 기본값 제공하여 undefined 방지
  const initialShippingAddress = useSelector(selectShippingAddress) || {
    name: "",
    phone: "",
    postalCode: "",
    city: "",
    line: "",
    memo: ""
  };
  
  const initialBillingAddress = useSelector(selectBillingAddress) || {
    name: "",
    phone: "",
    userEmail: user?.user?.email || ""
  };
  
  const [shippingAddress, setShippingAddress] = useState(initialShippingAddress);
  const [billingAddress, setBillingAddress] = useState(initialBillingAddress);
  const [formInitialized, setFormInitialized] = useState(false);

  const isMobile = Mobile();

  const [isSame, setIsSame] = useState<boolean>(true);

  const dispatch = useDispatch();
  const router = useRouter();

  // 크롬 자동완성 감지 및 처리
  useEffect(() => {
    // 약간의 지연을 두어 브라우저 자동완성이 적용된 후에 실행
    const timeoutId = setTimeout(() => {
      if (formRef.current && !formInitialized) {
        // 폼 요소 내의 모든 입력 필드 확인
        const nameInput = formRef.current.querySelector('input[name="name"]') as HTMLInputElement;
        const phoneInput = formRef.current.querySelector('input[name="phone"]') as HTMLInputElement;
        
        // 자동완성된 값이 있는지 확인하고 상태 업데이트
        if (nameInput && nameInput.value && !shippingAddress.name) {
          const newShippingAddress = {...shippingAddress, name: nameInput.value};
          setShippingAddress(newShippingAddress);
          
          if (isSame) {
            setBillingAddress({...billingAddress, name: nameInput.value});
          }
        }
        
        if (phoneInput && phoneInput.value && !shippingAddress.phone) {
          const newShippingAddress = {...shippingAddress, phone: phoneInput.value};
          setShippingAddress(newShippingAddress);
          
          if (isSame) {
            setBillingAddress({...billingAddress, phone: phoneInput.value});
          }
        }
        
        setFormInitialized(true);
      }
    }, 500); // 500ms 지연
    
    return () => clearTimeout(timeoutId);
  }, [formInitialized, shippingAddress, billingAddress, isSame]);

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

  const handleShipping = async (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
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

  const hypenTel = (target: any) => {
    target.value = target.value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  };

  const LABELSTYLE = "block font-bold mt-[50px] mb-3 text-[20px] text-darkgray";
  const INPUTSTYLE =
    "block w-full h-10 text-xl sm:text-sm font-light p-4 mx-auto my-0 border border-lightGray rounded-md outline-none";

  return (
    <section className="w-[80%] sm:w-full h-auto mx-auto sm:my-0 my-24 min-h-[80vh] font-kor">
      <div className="w-full flex flex-col items-start justify-start py-16 pt-24">
        <Heading
          title={"배송지 입력"}
          center={isMobile}
          fontSize="6xl sm:text-3xl"
        />
        <form
          ref={formRef}
          className="flex w-full sm:flex-col sm:justify-center sm:items-center mt-10 gap-20"
          onSubmit={handleSubmit}
        >
          <div className="w-2/3 sm:w-[90%]">
            <div className="w-full flex flex-col">
              <div className="w-full p-4 border-t border-lightGray">
                <div className="w-full flex gap-8">
                  <div className="w-1/3 sm:w-full">
                    <label className={LABELSTYLE}>이름(주문자)</label>
                    <input
                      required
                      className={INPUTSTYLE}
                      name={"name"}
                      value={billingAddress?.name || ""}
                      onChange={e => handleBilling(e)}
                      type="text"
                      disabled={isSame}
                      autoComplete="name"
                    />
                  </div>
                  <div className="w-1/3 sm:w-full">
                    <label className={LABELSTYLE}>연락처</label>
                    <input
                      required
                      className={INPUTSTYLE}
                      name={"phone"}
                      value={billingAddress?.phone || ""}
                      onChange={e => handleBilling(e)}
                      type="tel"
                      pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                      disabled={isSame}
                      onInput={e => hypenTel(e.target)}
                      autoComplete="tel"
                    />
                  </div>
                </div>
                <div className="flex justify-start items-center mt-10">
                  <input
                    id="same"
                    type="checkbox"
                    className="appearance-none w-5 h-5 border border-lightGray checked:bg-[url('/checkmark_io.svg')] bg-no-repeat bg-center checked:bg-primaryBlue"
                    onChange={() => setIsSame(!isSame)}
                    checked={isSame}
                  />
                  <label htmlFor="same" className="text-lg font-bold ml-2">
                    수령자와 동일합니다.
                  </label>
                </div>
              </div>
              <div className="w-full p-4">
                <div className="w-full flex gap-8">
                  <div className="w-1/3 sm:w-full">
                    <label className={LABELSTYLE}>이름(수령자)</label>
                    <input
                      required
                      name={"name"}
                      className={INPUTSTYLE}
                      value={shippingAddress?.name || ""}
                      onChange={e => {
                        handleShipping(e);
                        if (isSame) {
                          handleBilling(e);
                        }
                      }}
                      type="text"
                      autoComplete="shipping name"
                    />
                  </div>
                  <div className="w-1/3 sm:w-full">
                    <label className={LABELSTYLE}>연락처</label>
                    <input
                      required
                      className={INPUTSTYLE}
                      name={"phone"}
                      value={shippingAddress?.phone || ""}
                      onChange={e => {
                        handleShipping(e);
                        if (isSame) {
                          handleBilling(e);
                        }
                      }}
                      type="tel"
                      pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                      onInput={e => hypenTel(e.target)}
                      autoComplete="shipping tel"
                    />
                  </div>
                </div>
                <div className="flex sm:flex-col w-full">
                  <div className="w-1/4 mr-3 sm:w-full">
                    <label className={LABELSTYLE}>우편번호</label>
                    {!isMobile && (
                      <input
                        required
                        readOnly
                        className={INPUTSTYLE}
                        name={"postalCode"}
                        value={zipCode || ""}
                        type="text"
                        autoComplete="postal-code"
                      />
                    )}
                    {isMobile && (
                      <div className="flex justify-center items-center gap-7">
                        <input
                          required
                          readOnly
                          className={INPUTSTYLE}
                          name={"postalCode"}
                          value={zipCode || ""}
                          type="text"
                          autoComplete="postal-code"
                        />
                        <div className="w-1/2 h-10">
                          <Button onClick={ZipCodeSearch} styleType="primary">
                            주소 검색
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="w-3/4 sm:w-full">
                    <label className={LABELSTYLE}>주소</label>
                    <div className="flex gap-2">
                      <input
                        required
                        readOnly
                        className={INPUTSTYLE}
                        name={"city"}
                        value={roadAddress || ""}
                        type="text"
                        autoComplete="address-level2"
                      />
                      {!isMobile && (
                        <div className="w-1/5">
                          <Button onClick={ZipCodeSearch} styleType="primary">
                            우편번호 검색
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <label className={LABELSTYLE}>상세 주소 입력</label>
                <input
                  required
                  className={INPUTSTYLE}
                  name={"line"}
                  value={shippingAddress?.line || ""}
                  onChange={e => handleShipping(e)}
                  type="text"
                  autoComplete="address-line1"
                />
                <label className={LABELSTYLE}>배송 요청 사항</label>
                <textarea
                  required
                  className={INPUTSTYLE + "mb-6 h-20 focus:outline-none"}
                  name={"memo"}
                  value={shippingAddress?.memo || ""}
                  onChange={e => handleShipping(e)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start items-start w-1/4 gap-5 sm:w-[90%]">
            <CartInfoArticleWrapper />
            <div className="flex w-full gap-2">
              <div className="w-1/2 h-14">
                <Button
                  onClick={() => {
                    history.back();
                  }}
                  style="text-xl font-bold"
                  styleType="secondary"
                >
                  이전으로
                </Button>
              </div>
              <div className="w-1/2 h-14">
                <Button type="submit" style="text-xl font-bold">
                  다음
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
