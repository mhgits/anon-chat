let un = null;

function init() {
  $('#h-skip').onclick = () => switchUser(false);

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
  }
}