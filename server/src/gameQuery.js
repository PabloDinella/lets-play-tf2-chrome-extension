const Gamedig = require("gamedig");
const Sentry = require("@sentry/node");

const SERVERS = [
  {
    ip: "principal.awyeagames.website",
    port: 27015,
    color: "red"
  },
  {
    ip: "principal2.awyeagames.website",
    port: 27015,
    color: "orange"
  },
  {
    ip: "euro.awyeagames.website",
    port: 27015,
    color: "#B95F89"
  },
  {
    ip: "balance.awyeagames.website",
    port: 27016,
    color: "#D5E2BC"
  },
  {
    ip: "fast.awyeagames.website",
    port: 27016,
    color: "yellow"
  },
  {
    ip: "mvm.awyeagames.website",
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
            const { raw, ...serverInfo } = await Gamedig.query({
              type: "tf2",
              host: ip,
              port
            });
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
