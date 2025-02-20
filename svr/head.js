require('dotenv').config();
const genid = require('./namegen.js');
const dev = process.env.DEV == 1;
const port = process.env.PORT;
let svr = null;
let on = {};
let token = {};

if (dev) {
	const static = new (require('node-static')).Server('./src');

	svr = require('http').createServer((req, res) => {
		req.addListener('end', () => {
			if (req.url == '/env.js') {
				res.writeHead(200, { 'Content-Type': 'application/javascript' });
				res.end('const api = "ws' + (process.env.SECURE == '1' ? 's' : '') +
					'://' + process.env.URL + '";');
			} else {
				static.serve(req, res);
			}
		}).resume();
	});
}

function send(ws, type, data = "") {
	console.log(ws.id + ' > ' + type + ':', data);
	ws.send(type + ',' + JSON.stringify(data));
}

const wss = new (require('ws')).Server(dev ? { server: svr } : { port });
wss.on('connection', (ws, req) => {
	let cookie = req.headers.cookie;
	ws.id = cookie && cookie.match(/token=.*(;|$)/) && token[ws.token = cookie.match(/(?<=token=).*(?=;|$)/)[0]];
	if (!ws.id) {
		ws.id = genid();
		ws.token = Math.floor(Math.random() * 2176782336).toString(36);
		token[ws.token] = ws.id;
	}
	console.log(token, ws.id, ws.token, cookie)
	ws.on('message', msg => {
		let y = msg.toString().split(',');
		let x = y.shift();
		y = JSON.parse(y.join(','));
		console.log(ws.id + ' < ' + x + ':', y);
		if (on.message) on.message(ws, x, y);
	});
	ws.on('close', () => {
		console.log(ws.id + ' disconnected');
		if (on.disconnect) on.disconnect(ws);
	})
	console.log(ws.id + ' connected');
	if (on.connect) on.connect(ws);
});

if (dev)
	svr.listen(port)

process.on('uncaughtException', x => console.error(x));
process.on('unhandledRejection', x => console.error(x));

module.exports = {
	wss,
	send,
	on,
	get cli() {
		let x = [];
		wss.clients.forEach(y => x.push(y));
		return x;
	}
};