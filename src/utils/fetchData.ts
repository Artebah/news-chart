import { formatDate } from "../helpers/formatDate";

export async function fetchData(dateFrom: Date, dateTo: Date, keywordFilter: string) {
  const token = "";
  const channelids = "";

  const params = new URLSearchParams({
    //token,
    //channelids,
    dateFrom: formatDate(dateFrom, "part"),
    dateTo: formatDate(dateTo, "part"),
    keywordFilter,
  });

  const url = `/data?${params.toString()}`;

  const res = await fetch(url);
  const json = await res.json();

  return json;
}

// використання
fetchData(new Date("2023-04-12"), new Date(), "keyword");
