import dayjs from "dayjs";

export function formatTime(time: Date | string, format = "YYYY.MM.DD") {
  return dayjs(time).format(format);
}
