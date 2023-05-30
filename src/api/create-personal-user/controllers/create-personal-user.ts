/**
 * A set of functions called "actions" for `create-personal-user`
 */

export default {
  createPersonalUser: async (ctx, next) => {
    const payload = ctx.request.body;
    const data = await strapi
      .service("api::create-personal-user.create-personal-user")
      .createPersonalUser(payload);
    ctx.body = data;
  },
};
