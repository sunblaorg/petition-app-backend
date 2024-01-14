/**
 * petition controller
 */

import { factories } from "@strapi/strapi";
// access an API service

export default factories.createCoreController(
  "api::petition.petition",
  ({ strapi }) => ({
    async findOne(ctx) {
      const sanitizedQueryParams = await this.sanitizeQuery(ctx);
      const results = await strapi
        .service("api::petition.petition")
        .findOne(ctx.params.id, sanitizedQueryParams);
      const hideName = results.hideName;
      const creator = results.creator;
      const adjusted = {
        ...results,
        signers: results.signers.length,
        updatedBy: null,
        createdBy: null,
        petition_stat: null,
        content_reports: null,
        creator: hideName ? null : creator,
      };

      return adjusted;
    },
  })
);
