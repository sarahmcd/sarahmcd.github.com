var twilio = require('twilio');
var resp = new twilio.TwimlResponse();

resp.sms('I mean, maybe.');

resp.toString();
console.log(resp.toString());