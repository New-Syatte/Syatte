import { client } from "@/services/sanity/sanity";

export async function getEdu() {
  return await client.fetch('*[_type == "education"]');
}

/*
  eduname,
  eduStartDate,
  deuEndDate,
  eduType,
  count,
  money,*/
