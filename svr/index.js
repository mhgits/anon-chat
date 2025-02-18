const svr = require('./head.js');

svr.on.message = (ws, type, data) => {
  switch(type) {
    case 'switch':
      switchUser(ws);
      break;
		case 'msg':
			svr.cli.filter(x => x != ws).map(x => svr.send(x, 'msg', {from: ws.id, data: data.data}));
			break;
  }
}

svr.on.connect = ws => {
	svr.send(ws, 'un', ws.id);
}

svr.on.disconnect = ws => {
  
}

function switchUser() {

}