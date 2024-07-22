import { Request } from "../types/Request";

export function getResources(requests: Request[]) {
  return requests.flatMap((request) => request.Resources);
}
