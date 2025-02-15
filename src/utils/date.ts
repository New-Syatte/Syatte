import { format } from "date-fns";
import { ko } from "date-fns/locale";

export function formatDate(dateString: string) {
  return format(new Date(dateString), "yyyy년 MM월 dd일", {
    locale: ko,
  });
}
