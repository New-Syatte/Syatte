import Image from "next/image";
import styles from "./Footer.module.scss";

export default function Footer() {
  const personalData = [
    "개인정보 처리방침",
    "서비스 이용약관",
    "이용안내",
    "협회 소개",
  ];

  const pagesData = [
    {
      title: "SYATT",
      manu1: "협회 소개",
      manu2: "교육 소개",
      manu3: "마이페이지",
    },
    {
      title: "모던마스터즈",
      manu1: "브랜드 소개",
      manu2: "브랜드 상품 스토어",
      manu3: null,
    },
    {
      title: "마이다스메탈",
      manu1: "브랜드 소개",
      manu2: "브랜드 상품 스토어",
      manu3: null,
    },
  ];

  return (
    <footer className="w-full flex items-center justify-center text-white h-footerHeight bg-black">
      <div className="w-full flex px-10 justify-between">
        {/* 왼쪽 메뉴 */}
        <div className="flex flex-col w-[30%]">
          <div className="flex items-center mb-6">
            <div className="flex flex-col mr-3">
              <div className="text-[30px]">문의전화</div>
              <div className="text-[9px] tracking-[0.9px]">
                AM 09:00 ~ PM 05:00
              </div>
            </div>
            <div className="flex text-[56px] my-auto leading-10">1566-1000</div>
          </div>
          <div className="text-[18px] font-bold mb-3">SYATT</div>
          <div className="text-[12px] mb-6">
            사업자 등록번호 : 150-66-100004 | 대표 : 김OO
            <br />
            호스팅 서비스 : 서버회사 | 통신판매업 신고번호 : 신고번호
            <br />
            주소 기입 고객센터 : 고객센터 기입
          </div>
          <div className="flex gap-6 font-bold">
            {personalData.map(data => (
              <>
                <div className="cursor-pointer">{data}</div>
              </>
            ))}
          </div>
        </div>

        {/* 중앙 메뉴 */}
        <div className="flex w-[35%] px-6 justify-between">
          {pagesData.map(data => (
            <>
              <ul className="flex flex-col">
                <li className="text-[18px] font-bold mb-[12px]">
                  {data.title}
                </li>
                <li className="cursor-pointer">
                  {data.manu1 === null ? "" : "• " + data.manu1}
                </li>
                <li className="cursor-pointer">
                  {data.manu2 === null ? "" : "• " + data.manu2}
                </li>
                <li className="cursor-pointer">
                  {data.manu3 === null ? "" : "• " + data.manu3}
                </li>
              </ul>
            </>
          ))}
        </div>

        {/* 오른쪽 메뉴 */}
        <div className="flex flex-col w-[25%] items-end justify-end">
          <div>
            <Image
              src="/syatt_footer_logo.svg"
              width={170}
              height={130}
              alt={"푸터로고"}
            />
          </div>
          <div className="flex gap-6 mb-4">
            <div>
              <Image
                src="/social_youtube.svg"
                width={40}
                height={40}
                alt={"푸터로고"}
              />
            </div>
            <div>
              <Image
                src="/social_facebook.svg"
                width={40}
                height={40}
                alt={"푸터로고"}
              />
            </div>
            <div>
              <Image
                src="/social_instagram.svg"
                width={40}
                height={40}
                alt={"푸터로고"}
              />
            </div>
          </div>
          <div className="text-[12px]">© 2023. SYATT All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
