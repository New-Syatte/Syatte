import Image from "next/image";
import Banner from "@/assets/education/img.png";
import TopBannerImage02 from "@/assets/education/topbanner-02.jpg";
import TopBannerImage01 from "@/assets/education/topbanner-01.jpg";
export default function TopBanner() {
  return (
    <section>
      <Image src={ Banner } alt="배너" width={ 1920 } height={ 400 } className={'relative'}/>
      <div className={'flex absolute bottom-[400px]'}>
        <div className={'flex gap-5 '}>
          <Image src={ TopBannerImage01 } alt="수업사진" width={ 286 } height={ 362}  />
          <Image
            src={ TopBannerImage02 }
            alt="수업사진"
            width={ 630 }
            height={ 362}
            className={'rounded-tr-3xl rounded-br-3xl'} />
        </div>
        <div className={'flex flex-col justify-center items-end ml-[129px]'}>
          <p className={'text-[24px] mb-[15px]'}>EDUCATION</p>
          <p className={'text-5xl font-bold mb-[38px]'}>포페인팅 교육</p>
          <p className={'text-[18px]'}>샤뜨는 세계적인 특수 페인트 회사인 모던마스터와 마이더스 메탈과</p>
          <p>협력하여 현대적이고 고급스러운 특수 페인트 및 금속</p>
          <p>마감 솔루션을 제공하고 있습니다.</p>
        </div>
      </div>
    </section>
  );
}
