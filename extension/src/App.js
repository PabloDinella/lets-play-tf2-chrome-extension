import React from "react";
import Axios from "axios";

import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    Axios.get(process.env.REACT_APP_API || "http://localhost:3001/").then(
      ({ data }) => {
        setData(data);
      }
    );
  }, []);

  console.log(data);

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
              <header>
                <h2>{serverInfo.name}</h2>
                <p>connect {serverInfo.connect}</p>
                <p>
                  <strong>mapa: </strong>
                  {serverInfo.map}
                </p>
              </header>

              {serverInfo.players.length === 0 && (
                <p className="noPlayers">
                  <em>Nenhum jogador :(</em>
                </p>
              )}

              {serverInfo.players.length > 0 && (
                <table>
                  <thead>
                    <tr>
                      <th>nickname</th>
                      <th>score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serverInfo.players
                      .sort(
                        ({ score: scoreA }, { score: scoreB }) =>
                          scoreB - scoreA
                      )
                      .map(({ name, score, time }) => (
                        <tr key={name + time}>
                          <td>{name}</td>
                          <td>{score}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default App;
