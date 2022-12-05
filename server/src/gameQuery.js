const Gamedig = require("gamedig");
const Sentry = require("@sentry/node");

const SERVERS = [
  {
    ip: "principal.awyeagames.website",
    port: 27015,
    color: "red",
  },
  {
    ip: "principal2.awyeagames.website",
    port: 27015,
    color: "orange",
  },
  {
    ip: "euro.awyeagames.website",
    port: 27015,
    color: "#B95F89",
  },
  {
    ip: "balance.awyeagames.website",
    port: 27016,
    color: "#D5E2BC",
  },
  {
    ip: "fast.awyeagames.website",
    port: 27016,
    color: "yellow",
  },
  {
    ip: "mvm.awyeagames.website",
    port: 27015,
    color: "green",
  },
  {
    ip: "mvm.awyeagames.website",
    port: 27016,
    color: "limegreen",
  },
  {
    ip: "arena.awyeagames.website",
    port: 27015,
    color: "indigo",
  },
  {
    ip: "arena.awyeagames.website",
    port: 27016,
    color: "purple",
  },
];

const SERVERS_V2 = {
  normal: [
    {
      ip: "principal.awyeagames.website",
      port: 27015,
      color: "red",
    },
    {
      ip: "fast.awyeagames.website",
      port: 27016,
      color: "yellow",
    },
    {
      ip: "london.awyeagames.website",
      port: 27015,
      color: "#1F0F28",
    },
    {
      ip: "miami.awyeagames.website",
      port: 27015,
      color: "#ef62b2",
    },
    {
      ip: "sydney.awyeagames.website",
      port: 27015,
      color: "#f77247",
    },
    {
      ip: "singapore.awyeagames.website",
      port: 27015,
      color: "#e62937",
    },
  ],
  mvm: [
    {
      ip: "mvm.awyeagames.website",
      port: 27015,
      color: "green",
    },
    {
      ip: "mvm.awyeagames.website",
      port: 27016,
      color: "limegreen",
    },
  ],
  arena: [
    {
      ip: "arena.awyeagames.website",
      port: 27015,
      color: "indigo",
    },
    {
      ip: "arena.awyeagames.website",
      port: 27016,
      color: "purple",
    },
  ],
};

module.exports = {
  async query() {
    try {
      const state = await Promise.all(
        SERVERS.map(async ({ ip, port, ...rest }, index) => {
          try {
            const { raw, ...serverInfo } = await Gamedig.query({
              type: "tf2",
              host: ip,
              port,
            });
            return {
              ...serverInfo,
              ...rest,
            };
          } catch (error) {
            Sentry.captureException(error);
            return {
              error: `Não pôde obter informações de ${ip}:${port}`,
              ...rest,
            };
          }
        })
      );

      Sentry.captureMessage("Requested succesfully");
      return state;
    } catch (error) {
      Sentry.captureException(error);
      return {
        error: "Não pôde obter informações dos servidores",
      };
    }
  },

  async queryV2() {
    try {
      const state = await Promise.all(
        Object.keys(SERVERS_V2).map(async (group) => {
          return {
            [group]: await Promise.all(
              SERVERS_V2[group].map(async ({ ip, port, ...rest }, index) => {
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
