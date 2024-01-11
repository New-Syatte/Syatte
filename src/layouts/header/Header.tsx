import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const session = await getServerSession(authOptions); // 서버에서 session 정보 호출
  const user = session?.user;

  return <HeaderClient user={user} />;
}
