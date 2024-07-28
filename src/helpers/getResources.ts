import { Request } from "../types/Request";

export function getResources(requests: Request[]) {
  const resources = requests.flatMap((request) => request.Resources);
  resources.sort((a, b) => a.ResourceID - b.ResourceID);

  return resources;
}
