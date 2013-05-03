var twilio = require('twilio');
var resp = new twilio.TwimlResponse();

resp.sms({
	to:'+16037690318',
	from:'+16034216104',
	body:'I mean, maybe.'
});

console.log(resp.toString());