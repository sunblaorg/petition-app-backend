/**
 * A set of functions called "actions" for `get-user-from-phone`
 */

export default {
  resendOtp: async (ctx, next) => {
    const data = await strapi
      .service("api::resend-otp.resend-otp")
      .resendOtp(ctx.params.phone);
    ctx.body = data;
  },
};
