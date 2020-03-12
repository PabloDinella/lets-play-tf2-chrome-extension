const Gamedig = require("gamedig");
const Sentry = require("@sentry/node");

const SERVERS = [
  {
    ip: "principal.awyeagames.website", // principal
    port: 27015,
    color: "red"
  },
  {
    ip: "fast.awyeagames.website", // mvm
    port: 27016,
    color: "yellow"
  },
  {
    ip: "mvm.awyeagames.website", // evento
    port: 27015,
    color: "green"
  },
  {
    ip: "mvm.awyeagames.website",
    port: 27016,
    color: "limegreen"
  },
  {
    ip: "arena.awyeagames.website",
    port: 27015,
    color: "indigo"
  },
  {
    ip: "arena.awyeagames.website",
    port: 27016,
    color: "purple"
  }
];

module.exports = {
  async query() {
    try {
      const state = await Promise.all(
        SERVERS.map(async ({ ip, port, ...rest }, index) => {
          try {
            const serverInfo = await Gamedig.query({
              type: "tf2",
              host: ip,
              port
            });
            if (index === 1) throw "Oops";
            return {
              ...serverInfo,
              ...rest
            };
          } catch (error) {
            Sentry.captureException(error);
            return {
              error: `Não pôde obter informações de ${ip}:${port}`,
              ...rest
            };
          }
        })
      );

      Sentry.captureMessage("Requested succesfully");
      return state;
    } catch (error) {
      Sentry.captureException(error);
      return {
        error: "Não pôde obter informações dos servidores"
      };
    }
  }
};
