var twilio = require('twilio');
var resp = new twilio.TwimlResponse();

resp.sms('I mean, I guess that will be okay.');

console.log(resp.toString());