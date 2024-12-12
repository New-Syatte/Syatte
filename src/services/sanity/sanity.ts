import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// 읽기 전용 클라이언트
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2023-11-29",
  token: process.env.NEXT_PUBLIC_SANITY_SECRET_TOKEN,
});

// 쓰기 가능한 클라이언트 (서버 사이드 전용)
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: "2023-11-29",
  token: process.env.SANITY_EDITOR_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source).width(800).url();
}

export function urlForImage(source: SanityImageSource, width: number) {
  return builder.image(source).width(width).url();
}
