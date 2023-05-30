/**
 * A set of functions called "actions" for `create-personal-user`
 */

export default {
  createOrganizationUser: async (ctx, next) => {
    try {
      const payload = ctx.request.body;
      const data = await strapi
        .service("api::create-organization-user.create-organization-user")
        .createOrganizationUser(payload);
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  },
};
