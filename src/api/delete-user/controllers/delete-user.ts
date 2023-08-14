/**
 * A set of functions called "actions" for `delete-user`
 */

export default {
  deleteUser: async (ctx, next) => {
    const payload = ctx.request.body;
    const data = await strapi
      .service("api::delete-user.delete-user")
      .deleteUser(payload);
    ctx.body = data;
  },
};
