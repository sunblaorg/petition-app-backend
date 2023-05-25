/**
 * A set of functions called "actions" for `create-personal-user`
 */

export default {
  createPetition: async (ctx, next) => {
    try {
      const payload = ctx.request.body;
      const data = await strapi
        .service("api::create-petition.create-petition")
        .createPetition(payload);
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  },
};
