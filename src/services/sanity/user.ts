import { writeClient } from "@/services/sanity/sanity";

type OAuthUser = {
  id: string;
  email: string;
  username: string;
  name: string;
  image?: string | null;
};

export async function addUser({ id, username, email, name, image }: OAuthUser) {
  try {
    return await writeClient.createIfNotExists({
      _id: id,
      _type: "user",
      username,
      email,
      name,
      image,
    });
  } catch (error: any) {
    console.error(`사용자 생성 실패: ${error.message}`);
    throw error;
  }
}
