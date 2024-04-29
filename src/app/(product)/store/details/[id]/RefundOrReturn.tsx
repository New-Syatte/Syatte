const RefundOrReturn = () => {
  return (
    <div className="w-full h-full relative">
      <div className="w-full">
        <div className="text-neutral-800 text-2xl font-bold font-helvetica my-10">
          교환/반품
        </div>
        <div className="w-full flex-col justify-start items-start gap-[13px] inline-flex">
          <div className="w-full text-neutral-800 text-lg font-normal leading-[27px]">
            반품배송비(편도) : 3,000원 (최초 배송비 미결제시 6,000원 부과)
          </div>
          <div className="w-full text-neutral-800 text-lg font-normal leading-[27px]">
            교환배송비(왕복) : 6,000원
          </div>
          <div className="text-neutral-800 text-lg font-normal leading-[27px]">
            구매자 단순 변심 : 상품 수령 후 7일 이내(구매자 반품 배송비 부담)
          </div>
          <div className="text-neutral-800 text-lg font-normal leading-[27px]">
            표시/광고와 상이, 계약 내용과 다르게 이행된 경우 : 상품 수령 후
            3개월 이내 혹은 표시/광고와 다른 사실을 안 날로부터 30일 이내(판매자
            반품 배송비 부담)
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="text-neutral-800 text-2xl font-bold font-helvetica my-10">
          교환/반품 불가한 경우
        </div>
        <div className="w-full h-[147px] flex-col justify-start items-start gap-[13px] inline-flex">
          <div className="w-full text-neutral-800 text-lg font-normal leading-[27px]">
            교환/반품 요청이 기간이 지난 경우
          </div>
          <div className="w-full text-neutral-800 text-lg font-normal leading-[27px]">
            소비자의 책임 있는 사유로 상품 등이 분실/파손/훼손된 경우
          </div>
          <div className="text-neutral-800 text-lg font-normal leading-[27px]">
            소비자의 사용/소비에 의해 상품 등의 가치가 현저히 감소한 경우
          </div>
          <div className="text-neutral-800 text-lg font-normal leading-[27px]">
            제품을 설치 또는 사용하였거나 개통한 경우
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundOrReturn;
