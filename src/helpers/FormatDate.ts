import { MONTHS } from "models/constants";

export function FormatDate(date: Date, show_month: boolean = false): string {
  const year = date.getFullYear();
  if (show_month) {
    const day = String(date.getDate());
    const month = MONTHS[date.getMonth()];
    return `${day} ${month} ${year}`;
  } else {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}-${month}-${year}`;
  }
}
