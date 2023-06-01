export default {
  verifyOtp: async (ctx, next) => {
    const data = await strapi
      .service("api::verify-otp.verify-otp")
      .verifyOtp(ctx.params.phone, ctx.params.otp);
    ctx.body = data;
  },
};
