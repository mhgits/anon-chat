const $ = (x, y = document) => y.querySelector(x);
window.addEventListener('DOMContentLoaded', init);

let ws = null;
let retries = 0;
let conn = null;

function send(type, data="") {
  console.log('> ' + type + ':', data);
  if (ws && ws.readyState == ws.OPEN) {
    ws.send(type + ',' + JSON.stringify(data));
  }
}

function initWs() {
  ws = new WebSocket(api);
  ws.onopen = () => {
    retries = 0;
    console.log('connect');
    if (conn === false)
      alert('Reconnected to server.');
    conn = true;
  };
  ws.onmessage = msg => {
    let y = msg.data.split(',');
    let x = y.shift();
    y = JSON.parse(y.join(','));
    console.log('< ' + x + ':', y);
    message(x, y);
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