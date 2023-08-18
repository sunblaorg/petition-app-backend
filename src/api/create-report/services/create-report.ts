interface CreateReport {
  userId: number;
  petitionId: number;
}

module.exports = {
  createReport: async (payload: CreateReport) => {
    const { userId, petitionId } = payload;
    try {
      const personalUser = await strapi
        .query("api::personal-user.personal-user")
        .findOne({ where: { id: userId }, populate: true });
      const petition = await strapi
        .query("api::petition.petition")
        .findOne({ where: { id: petitionId } });

      const report = await strapi.entityService.create(
        "api::content-report.content-report",
        {
          data: {
            petition: petition.id,
            user: personalUser.owner.id,
          },
          populate: "*",
        }
      );
      return report;
    } catch (err) {
      return err;
    }
  },
};
