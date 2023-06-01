import utils from "@strapi/utils";
const { ApplicationError } = utils.errors;

module.exports = {
  verifyOtp: async (phone: string, otp: string) => {
    const verify = await strapi
      .service("api::get-user-from-phone.twilio")
      .verify(phone, otp);
    return verify;
  },
};
