const Gamedig = require("gamedig");
const Sentry = require("@sentry/node");

const SERVERS = [
  {
    ip: "200.98.149.240", // principal
    color: "red"
  },
  {
    ip: "200.98.164.167", // mvm
    color: "#007eff"
  },
  {
    ip: "200.98.167.40", // evento
    color: "green"
  }
];

module.exports = {
  async query() {
    try {
      const state = await Promise.all(
        SERVERS.map(async ({ ip, ...rest }) => {
          const serverInfo = await Gamedig.query({
            type: "tf2",
            host: ip
          });
          return {
            ...serverInfo,
            ...rest
          };
        })
      );

      Sentry.captureMessage("Requested succesfully");
      return state;
    } catch (error) {
      Sentry.captureException(error);
      return {
        error: "Couldn't get info :(",
        originalError: error.message
      };
    }
  }
};
