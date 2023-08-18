/**
 * A set of functions called "actions" for `create-personal-user`
 */

export default {
  createReport: async (ctx, next) => {
    try {
      const payload = ctx.request.body;
      const data = await strapi
        .service("api::create-report.create-report")
        .createReport(payload);
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  },
};
