const $ = (x, y = document) => y.querySelector(x);
window.addEventListener('DOMContentLoaded', init);

let ws = null;
let retries = 0;
let conn = false;

function send(type, data) {
  console.log('> ' + type, data);
  if (ws && ws.readyState == ws.OPEN) {
    ws.send(type + ',' + JSON.stringify(data));
  }
}

function initWs() {
  ws = new WebSocket(api);
  ws.onopen = () => {
    retries = 0;
    console.log('connect');
    conn = true;
  };
  ws.onmessage = x => {
    let y = x.data.split(',');
    y[1] = JSON.parse(y[1]);
    console.log('> ' + y[0], y[1]);
    message(...y);
  };
  ws.onerror = x => {
    console.error(x);
  };
  ws.onclose = () => {
    setTimeout(() => {
      if (retries++ < 5) 
        initWs();
      else if(conn)
        alert('Failed to reconnect.');
      else
        alert('Could not connect to server. Try again later.');
    }, 10e3);
    console.log('disconnect');
    if (conn) alert('Disconnected, attempting reconnect...');
    conn = false;
  };
}

function enableMsgbox(x) {
  
}