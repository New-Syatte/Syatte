import Image from "next/image";

type Props = {
  title: string;
  onClick: () => void;
};

type LoginButtonData = {
  img: string;
  title: string;
  fontColor: string;
  bgColor: string;
  border?: string | undefined;
};

const LoginButton = ({ title, onClick }: Props) => {
  let data: LoginButtonData;

  switch (title) {
    case "kakao":
      data = {
        img: "/kakao-logo.png",
        title: "카카오 로그인",
        fontColor: "text-black",
        bgColor: "bg-[#FDDC3F]",
        border: "",
      };
      break;
    case "google":
      data = {
        img: "/google-logo.png",
        title: "Google 로그인",
        fontColor: "text-black",
        bgColor: "bg-[#F2F2F2]",
        border: "border",
      };
      break;
    case "credentials":
      // credentials 버튼은 표시하지 않음
      return null;
    default:
      // 알 수 없는 로그인 제공자는 표시하지 않음
      console.warn(`알 수 없는 로그인 제공자: ${title}`);
      return null;
  }

  return (
    <div className="flex justify-center">
      <div
        onClick={onClick}
        className={`flex h-[50px] w-[320px] rounded-[4px] cursor-pointer overflow-hidden ${data.bgColor} ${data.fontColor} ${data.border}`}
      >
        <div className="flex pl-3">
          <div className="flex ">
            <Image
              src={data.img}
              alt={data.title}
              width={50}
              height={50}
              style={{ width: "50px", height: "auto" }}
            />
          </div>
          <div className="flex text-[16px] w-[220px] justify-center my-auto">
            {data.title}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginButton;
