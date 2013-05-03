var Twilio = require('twilio');
	http = require('http');

http.createServer(function (req,res) {
	var resp = new Twilio.TwimlResponse();
	resp.sms('I mean, maybe.');
	res.writeHead(200, {'Content-Type':'text/xml'});
	res.end(resp.toString());
}).listen(process.envPORT || 8888);

console.log('Dumbass shit.');