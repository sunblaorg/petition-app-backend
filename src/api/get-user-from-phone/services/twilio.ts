const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioService = process.env.TWILIO_SERVICE_ID;
const client = require("twilio")(accountSid, authToken);

const getFormattedNumber = (num: string) => `+964${num.slice(1)}`;

module.exports = {
  sendToWhatsapp(num: string) {
    client.verify.v2
      .services(twilioService)
      .verifications.create({
        to: getFormattedNumber(num),
        channel: "whatsapp",
      })
      .then((verification) => console.log(verification.accountSid));
  },
  sendSms(num: string) {
    client.verify.v2
      .services(twilioService)
      .verifications.create({ to: getFormattedNumber(num), channel: "sms" })
      .then((verification) => console.log(verification.sid));
  },
  verify(num: string, code: string) {
    return client.verify.v2
      .services(twilioService)
      .verificationChecks.create({ to: getFormattedNumber(num), code: code })
      .then((verification_check) => verification_check);
  },
};
