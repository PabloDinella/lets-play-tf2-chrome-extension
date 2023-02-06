const functions = require("firebase-functions");
const { queryV2 } = require("./gameQuery");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

exports.serversInfo = functions.https.onRequest(async (request, response) => {
  const data = await queryV2();
  response.set('Access-Control-Allow-Origin', '*');
  response.send(data);
});
