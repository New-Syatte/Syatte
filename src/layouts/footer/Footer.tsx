import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.footer}>
        <div className="font-semibold mb-[10px]">Columbia Tools</div>
        <div className="mb-[10px]">주소 기입</div>
        <div className="flex mb-[30px]">
          <div className="font-semibold">고객센터</div>
          <div className="font-normal ml-[19px]">
            1566-1000 ㅣ AM 09:00 - PM 06:00
          </div>
        </div>
        <div className="mb-[10px]">
          (주)회사명ㅣ대표:홍길동ㅣ호스팅 서비스:건식벽 도구회사ㅣ통신판매업
          신고번호:신고번호ㅣ사업자 등록번호:156-66-100004
        </div>
        <div className="mb-[10px]">개인정보 처리방침ㅣ서비스 이용약관</div>
        <div>Copyright (c) 2023 Columbia Tools. All rights reserved.</div>
      </div>
    </footer>
  );
}
