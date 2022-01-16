import React from "react";
import Server from "./Server";

import "./App.css";
import Axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

window._gaq = window._gaq || [];

const mock = {
  normal: [
    {
      name: "Aww Yeaa Principal",
      map: "workshop/pd_degroot.ugc63390666",
      password: false,
      maxplayers: 24,
      players: [],
      bots: [],
      connect: "principal.awyeagames.website:27015",
      ping: 119,
      color: "red",
    },
    {
      error:
        "Não pôde obter informações de principal2.awyeagames.website:27015",
      color: "orange",
    },
    {
      name: "Aww Yeaa London",
      map: "cp_5gorge",
      password: false,
      maxplayers: 24,
      players: [{ name: "", raw: {} }],
      bots: [],
      connect: "euro.awyeagames.website:27015",
      ping: 89,
      color: "#B95F89",
    },
    {
      error: "Não pôde obter informações de balance.awyeagames.website:27016",
      color: "#D5E2BC",
    },
    {
      name: "Aww Yeaa FAST RESPAWN Hightower+2fort+Turbine",
      map: "cp_altitude",
      password: false,
      maxplayers: 24,
      players: [
        { name: "reinilson007", raw: { score: 5, time: 8393.681640625 } },
        { name: "!*Mini-Sentry*!", raw: { score: 7, time: 979.5341186523438 } },
        { name: "Hughster3", raw: { score: 15, time: 919.8761596679688 } },
        { name: "rsg", raw: { score: 24, time: 868.9661865234375 } },
        {
          name: "ｍｏｌｔｉ ☯（囲ぱ雲",
          raw: { score: 8, time: 794.9408569335938 },
        },
        { name: "ford sierra", raw: { score: 10, time: 593.6859741210938 } },
        { name: "Lincoln", raw: { score: 3, time: 177.9895782470703 } },
        { name: "pigs", raw: { score: 0, time: 29.05474090576172 } },
      ],
      bots: [],
      connect: "fast.awyeagames.website:27016",
      ping: 118,
      color: "yellow",
    },
  ],
  mvm: [
    {
      name: "Aww Yeaa MvM #1",
      map: "mvm_mannworks",
      password: false,
      maxplayers: 6,
      players: [],
      bots: [],
      connect: "mvm.awyeagames.website:27015",
      ping: 120,
      color: "green",
    },
    {
      name: "Aww Yeaa MvM #2",
      map: "mvm_ghost_town",
      password: false,
      maxplayers: 6,
      players: [
        { name: "L3m0nIc", raw: { score: 67, time: 2266.793701171875 } },
        { name: "Combarco", raw: { score: 0, time: 2083.538330078125 } },
        { name: "Tobey Maquire", raw: { score: 13, time: 408.0283203125 } },
        { name: "among us 2", raw: { score: 4, time: 374.27459716796875 } },
        { name: "aranlu27", raw: { score: 25, time: 324.50927734375 } },
      ],
      bots: [],
      connect: "mvm.awyeagames.website:27016",
      ping: 120,
      color: "limegreen",
    },
  ],
  arena: [
    {
      name: "Aww Yeaa ARENA #1",
      map: "arena_lumberyard_event",
      password: false,
      maxplayers: 18,
      players: [{ name: "Polarr", raw: { score: 0, time: 1490.68359375 } }],
      bots: [],
      connect: "arena.awyeagames.website:27015",
      ping: 119,
      color: "indigo",
    },
    {
      name: "Aww Yeaa ARENA #2",
      map: "workshop/arena_seize_final.ugc2",
      password: false,
      maxplayers: 18,
      players: [],
      bots: [],
      connect: "arena.awyeagames.website:27016",
      ping: 120,
      color: "purple",
    },
  ],
};

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      setData(JSON.parse(localStorage.getItem("tf2")));
      return;
    }

    Axios.get(process.env.REACT_APP_API)
      .then(({ data }) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });

    // setData(mock);
    return;
  }, []);

  React.useEffect(() => {
    (function () {
      const ga = document.createElement("script");
      ga.type = "text/javascript";
      ga.async = true;
      ga.src = "https://ssl.google-analytics.com/ga.js";
      const s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(ga, s);
      window._gaq.push(["_setAccount", "UA-157950328-1"]);
      window._gaq.push(["_trackPageview"]);
      window._gaq.push(["_trackEvent", "popup", "open"]);
    })();
  }, []);

  const renderServers = (data) =>
    data.map((serverInfo) => {
      return (
        <div
          className="server"
          key={serverInfo.connect}
          style={{ borderColor: serverInfo.color }}
        >
          {!!serverInfo.error ? (
            <p style={{ margin: "auto", paddingRight: 20, paddingLeft: 20 }}>
              {serverInfo.error}
            </p>
          ) : (
            <Server serverInfo={serverInfo} />
          )}
        </div>
      );
    });

  return (
    <div className="App" style={{ padding: 16 }}>
      {data === null && <p>Carregando...</p>}

      {data && data.error && <p>Sem informações sobre os servidores :(</p>}

      {data && !data.error && (
        <Tabs>
          <TabList>
            <Tab>Normal</Tab>
            <Tab>MvM</Tab>
            <Tab>Arena</Tab>
          </TabList>

          <TabPanel>
            <div className="tabContent">{renderServers(data.normal)}</div>
          </TabPanel>
          <TabPanel>
            <div className="tabContent">{renderServers(data.mvm)}</div>
          </TabPanel>
          <TabPanel>
            <div className="tabContent">{renderServers(data.arena)}</div>
          </TabPanel>
        </Tabs>
      )}

      {/* {data &&
        !data.error &&
        data.map((serverInfo) => {
          return (
            <div
              className="server"
              key={serverInfo.connect}
              style={{ borderColor: serverInfo.color }}
            >
              {!!serverInfo.error ? (
                <center>{serverInfo.error}</center>
              ) : (
                <Server serverInfo={serverInfo} />
              )}
            </div>
          );
        })} */}
    </div>
  );
}

export default App;
