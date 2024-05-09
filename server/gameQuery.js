const Gamedig = require("gamedig");
const Sentry = require("@sentry/node");

const SERVERS = {
  normal: [
    {
      ip: "principal.awyeagames.website",
      port: 27015,
      color: "red",
      type: "normal",
    },
    {
      ip: "london.awyeagames.website",
      port: 27015,
      color: "#1F0F28",
      type: "normal",
    },
    {
      ip: "miami.awyeagames.website",
      port: 27015,
      color: "#ef62b2",
      type: "normal",
    },
  ],
  mvm: [
    {
      ip: "mvm.awyeagames.website",
      port: 27015,
      color: "green",
      type: "mvm",
    },
  ],
  arena: [
    {
      ip: "arena.awyeagames.website",
      port: 27015,
      color: "indigo",
      type: "arena",
    },
  ],
};

module.exports = {
  async queryServersData() {
    try {
      const state = await Promise.all(
        Object.keys(SERVERS).map(async (group) => {
          return {
            [group]: await Promise.all(
              SERVERS[group].map(async ({ ip, port, ...rest }, index) => {
                try {
                  const { raw, ...serverInfo } = await Gamedig.query({
                    type: "tf2",
                    host: ip,
                    port,
                  });
                  return { ...serverInfo, ...rest };
                } catch (error) {
                  Sentry.captureException(error);
                  console.log("error while fetching server data");
                  console.log(error);
                  return {
                    error: `Não pôde obter informações de ${ip}:${port}`,
                    ...rest,
                  };
                }
              })
            ),
          };
        })
      );

      Sentry.captureMessage("Requested succesfully");

      return state.reduce((final, group) => {
        return { ...final, ...group };
      }, {});
    } catch (error) {
      Sentry.captureException(error);
      return {
        error: "Não pôde obter informações dos servidores",
      };
    }
  },
};
