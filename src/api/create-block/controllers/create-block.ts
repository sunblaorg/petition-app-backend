/**
 * A set of functions called "actions" for `create-personal-user`
 */

export default {
  createBlock: async (ctx, next) => {
    try {
      const payload = ctx.request.body;
      const data = await strapi
        .service("api::create-block.create-block")
        .createBlock(payload);
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  },
};
