const CautionNotice = () => {
  return (
    <div className="w-[830px] h-[263px] relative">
      <div className="left-0 top-0 absolute text-neutral-800 text-2xl font-bold font-['Helvetica']">
        주의사항
      </div>
      <div className="w-[830px] h-[215px] left-0 top-[48px] absolute flex-col justify-start items-start gap-[13px] inline-flex">
        <div className="w-[830px] text-neutral-800 text-lg font-normal leading-[27px]">
          전자상거래 등에서의 소비자보호법에 관한 법률에 의거하여 미성년자가
          물품을 구매하는 경우, 법정대리인이 동의하지 않으면 미성년자 본인 또는
          법정대리인이 구매를 취소할 수 있습니다.
        </div>
        <div className="w-[830px] text-neutral-800 text-lg font-normal leading-[27px]">
          스토어에 등록된 판매 상품과 상품의 내용, 거래 정보 및 가격은 판매자가
          등록한 것으로 스토어는 해당 내용에 대하여 일체의 책임을 지지 않습니다.
        </div>
        <div className="w-[830px] text-neutral-800 text-lg font-normal leading-[27px]">
          스토어 결제시스템을 이용하지 않고 판매자와 직접 거래하실 경우 상품을
          받지 못하거나 구매한 상품과 상이한 상품을 받는 등 피해가 발생할 수
          있으니 유의 바랍니다. 직거래로 인해 발생한 피해에 대해 샤뜨는 책임을
          지지 않습니다.
        </div>
      </div>
    </div>
  );
};

export default CautionNotice;
