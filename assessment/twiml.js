var twilio = require('twilio');
var resp = new twilio.TwimlResponse();

resp.sms({
	body:'I mean, maybe.'
});

console.log(resp.toString());