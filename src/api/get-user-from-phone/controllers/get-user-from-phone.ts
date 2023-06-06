/**
 * A set of functions called "actions" for `get-user-from-phone`
 */

export default {
  getUserFromPhone: async (ctx, next) => {
    const data = await strapi
      .service("api::get-user-from-phone.get-user-from-phone")
      .getUserFromPhone(ctx.params.phone, ctx.params.macAddress);
    ctx.body = data;
  },
};
