import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Sanity 프로젝트 ID와 데이터셋의 기본값 설정 (빌드 오류 방지)
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2023-11-29';

// 읽기 전용 클라이언트
export const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion,
  token: process.env.NEXT_PUBLIC_SANITY_SECRET_TOKEN,
});

// 쓰기 가능한 클라이언트 (서버 사이드 전용)
export const writeClient = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion,
  token: process.env.SANITY_EDITOR_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlForDetailImage(source: SanityImageSource) {
  if (!source) return null;
  return builder.image(source).format("webp").quality(100).url();
}
