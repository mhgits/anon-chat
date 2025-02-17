const ws   = require('ws');
const http = require('http');
const fs   = require('fs');

const hostname = "127.0.0.1";
const port     = "8000";

function getFormat(url) {
	const check = x => url.endsWith(x);

	// :horror:
	// theres probably a better way but this works for now (forever)
	return check('js') ? 'application/javascript' :
		check('css') ? 'text/css' :
		check('jpg') ? 'image/jpeg' :
		check('svg') ? 'image/svg+xml' :
		check('png') ? 'image/png' :
		check('mp3') ? 'audio/mp3' :
		'text/html';
}

// The Part Where He Kills You
const svr = http.createServer(async (req, res) => {

	const url = req.url.replace(/\/$/, '/index.html')
	req.on('error', console.error);

	res.statusCode = 200;

	const reqFormat = getFormat(url);
	res.setHeader('Content-Type', reqFormat);

	// give this spoiled fuck his file!!!!
	fs.readFile('../src/' + url, null, (err, data) => {
		if (err) {
			res.writeHead(404);
			res.write("404: Page not found");
		} else res.write(data);
		res.end();
	});

});

/*
const wss = new ws.Server({ server: svr })
wss.on('connection', async(sock, req) => {
	ws.on('message', async (msg) => {
		console.log(`Received message: ${msg}`);

	});
});
*/

// start server
svr.listen(port, hostname, () => {
	console.log(`Server has started at http://${hostname}:${port}/`);
});
