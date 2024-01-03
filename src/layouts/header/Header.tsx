import Image from "next/image";
import NextLink from "@/components/NextLink/NextLink";
import Logo from "@/assets/columbia_tools_logo.svg";
import styles from "./Header.module.scss";
import { FiUser } from "react-icons/fi";
import { CgShoppingCart } from "react-icons/cg";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserBox from "@/components/userBox/UserBox";

export default async function Header() {
  const session = await getServerSession(authOptions); // 서버에서 session 정보 호출
  const user = session?.user;
  // console.log(user);

  return (
    <div className={styles.container}>
      <div className="flex">
        <Image src={Logo} alt="Logo" width={169} height={70} />
        <div className="text-xl flex text-white ml-6 items-center">
          <NextLink href="/" className="mx-6">
            Home
          </NextLink>
          <NextLink href="/about" className="mx-6">
            About
          </NextLink>
          <NextLink href="/products/all" className="mx-6">
            Product
          </NextLink>
          {/*<Link href="/education" className="mx-6">
          Education
        </Link>*/}
        </div>
      </div>
      <div className="text-xl flex text-white ml-6 text-[26px] gap-3 mr-4 items-center">
        <>
          {user ? (
            <>
              <UserBox data={user} />
            </>
          ) : (
            <NextLink
              href="/signin"
              className="flex gap-2 items-end hover:underline"
            >
              <p className="text-xs">로그인하기</p>
              <FiUser />
            </NextLink>
          )}
        </>
        <>
          <NextLink href={"/cart"}>
            <CgShoppingCart />
          </NextLink>
        </>
      </div>
    </div>
  );
}
