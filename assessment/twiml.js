var twilio = require('twilio');
var resp = new twilio.TwimlResponse();

resp.sms({
	body:'I mean, maybe.'
});

resp.toString();
console.log(resp.toString());