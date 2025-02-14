const $ = (x, y = document) => y.querySelector(x);
window.addEventListener('DOMContentLoaded', init);

let ws = null;

function send(type, data) {
  if (ws && ws.readyState == ws.OPEN) {
    ws.send(type + ',' + JSON.stringify(data))
  }
}

function initWs() {
  ws = new WebSocket(api);
  ws.onmessage(x => {

  });
}