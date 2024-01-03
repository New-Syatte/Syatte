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
    case "naver":
      data = {
        img: "/naver-logo.png",
        title: "네이버 로그인",
        fontColor: "text-white",
        bgColor: "bg-[#03C75A]",
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
    default:
      throw new Error(`Invalid title: ${title}`);
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
              style={{ width: "auto" }}
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
