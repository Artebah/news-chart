export function formatDate(
  date: Date | string | number,
  type: "full" | "byDay" | "byHour"
) {
  if (typeof date === "string") {
    date = new Date(date);
  }

  // timestamp
  if (typeof date === "number") {
    date = new Date(date);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  switch (type) {
    case "full":
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    case "byDay":
      return `${year}-${month}-${day}`;
    case "byHour":
      return `${year}-${month}-${day}-${hours}`;
  }
}
