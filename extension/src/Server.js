import React from "react";

export default ({ serverInfo }) => (
  <>
    <header>
      <h2 title={serverInfo.name}>{serverInfo.name}</h2>
      <p
        onCopy={() => {
          window._gaq.push(["_trackEvent", "copy ip", serverInfo.name]);
        }}
      >
        <a href={`steam://connect/${serverInfo.connect}`}>
          connect {serverInfo.connect}
        </a>
      </p>
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
            .map((player) => ({ ...player, ...player.raw }))
            .sort(({ score: scoreA }, { score: scoreB }) => scoreB - scoreA)
            .map(({ name, score, time }) => (
              <tr key={name + time}>
                <td>{name}</td>
                <td>{score}</td>
              </tr>
            ))}
        </tbody>
      </table>
    )}
  </>
);
