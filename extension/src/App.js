import React from "react";
import Server from "./Server";

import "./App.css";

window._gaq = window._gaq || [];

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    setData(JSON.parse(localStorage.getItem("tf2")));
  }, []);

  React.useEffect(() => {
    (function() {
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

  return (
    <div className="App">
      {data === null && <p>Carregando...</p>}

      {data && data.error && <p>Sem informações sobre os servidores :(</p>}

      {data &&
        !data.error &&
        data.map(serverInfo => {
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
        })}
    </div>
  );
}

export default App;
