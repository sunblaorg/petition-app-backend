interface CreateBlock {
  userId: number;
  blockId: number;
}

module.exports = {
  createBlock: async (payload: CreateBlock) => {
    const { userId, blockId } = payload;
    console.log("🟥  userId, blockId:", userId, blockId);
    try {
      const personalUser = await strapi
        .query("api::personal-user.personal-user")
        .findOne({ where: { id: userId }, populate: true });

      const blockUser = await strapi
        .query("plugin::users-permissions.user")
        .findOne({ where: { id: blockId }, populate: true });

      const report = await strapi.entityService.create(
        "api::blocked-user.blocked-user",
        {
          data: {
            blocked_user: blockUser.id,
            blocked_by: personalUser.owner.id,
          },
        }
      );
      return report;
    } catch (err) {
      console.log(err);

      return err;
    }
  },
};
