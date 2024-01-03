import { client } from "@/services/sanity/sanity";

type OAuthUser = {
  id: string;
  email: string;
  username: string;
  name: string;
  image?: string | null;
};

export async function addUser({ id, username, email, name, image }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    username,
    email,
    name,
    image,
  });
}
