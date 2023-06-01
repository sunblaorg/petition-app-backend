import utils from "@strapi/utils";
const { ApplicationError } = utils.errors;

module.exports = {
  resendOtp: async (phone: string) => {
    strapi.service("api::get-user-from-phone.twilio").sendSms(phone);
  },
};
