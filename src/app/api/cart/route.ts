import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getCart } from "@/services/sanity/cart";
import { redirect } from "next/navigation";
import URLS from "@/constants/urls";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect(URLS.SIGNIN);
  }

  const cart = await getCart(user.username);
  return NextResponse.json(cart);
}
