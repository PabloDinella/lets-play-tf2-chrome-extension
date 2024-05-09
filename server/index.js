const functions = require("firebase-functions");
const { queryServersData } = require("./gameQuery");

exports.serversInfo = functions.https.onRequest(async (request, response) => {
  const data = await queryServersData();
  response.set("Access-Control-Allow-Origin", "*");
  response.send(data);
});
