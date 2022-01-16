import Axios from "axios";
// var Axios = require('axios')

chrome.browserAction.setBadgeBackgroundColor({ color: "#b05326" });

chrome.alarms.create("refresh", { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener((alarm) => {
  fetchInfo();
});

function updateInfo(info) {
  localStorage.setItem("tf2", JSON.stringify(info));

  if (Array.isArray(info)) {
    chrome.browserAction.setBadgeText({
      text: info
        .filter(({ error }) => !error)
        .reduce((totalPlayers, item) => totalPlayers + item.players.length, 0)
        .toString(),
    });
    return;
  }

  chrome.browserAction.setBadgeText({
    text: Object.keys(info)
      .reduce((final, group) => {
        return [...final, ...info[group]];
      }, [])
      .filter(({ error }) => !error)
      .reduce((totalPlayers, item) => totalPlayers + item.players.length, 0)
      .toString(),
  });
  return;
}

function fetchInfo() {
  Axios.get(process.env.REACT_APP_API)
    .then(({ data }) => {
      updateInfo(data);
    })
    .catch((error) => {
      console.error(error);
      chrome.browserAction.setBadgeText({ text: "?" });
    });
}

fetchInfo();
