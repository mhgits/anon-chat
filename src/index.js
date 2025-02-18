let un = null;

function init() {
  $('#h-skip').onclick = () => switchUser(false);
  $('#msgin').onkeypress = e => {
    if (e.key == 'Enter' && $('#msgin').value.trim().length > 0) {
      sendMsg($('#msgin').value);
      $('#msgin').value = '';
    }
  };

  initWs();
}

function switchUser(from) {
  if (!from) 
    send('switch');
}

function message(type, data) {
  switch(type) {
    case 'un':
      $('#h-user').innerText = un = data;
      break;
    case 'msg':
      createMessage(data.from, data.data);
      break;
  }
}

function sendMsg(val) {
  createMessage(un, val);
  send('msg', {data: val});
}

function createMessage(name, msg) {
  let x = document.createElement('span');
  x.innerText = msg;
  $('#msgs').innerHTML += `${name}: ${x.innerHTML}<br>`;
}