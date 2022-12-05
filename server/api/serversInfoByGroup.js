import gameQuery from "../src/gameQuery";

export default async function handler(request, response) {
  const serversInfo = await gameQuery.queryV2();

  response.status(200).json(serversInfo);
}
