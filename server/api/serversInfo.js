import gameQuery from "../src/gameQuery";

export default async function handler(request, response) {
  const serversInfo = await gameQuery.query();

  response.status(200).json(serversInfo);
}
