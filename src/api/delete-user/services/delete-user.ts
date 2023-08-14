import utils from "@strapi/utils";
const { ApplicationError } = utils.errors;
interface DeleteUser {
  userId: string;
}

module.exports = {
  deleteUser: async (payload: DeleteUser) => {
    const { userId } = payload;

    const personalUser = await strapi
      .query("api::personal-user.personal-user")
      .findOne({ where: { id: userId }, populate: true });

    if (personalUser) {
      if (personalUser.owner) {
        const petitions = await strapi
          .query("api::petition.petition")
          .findMany({ where: { creator: personalUser.owner.id } });

        try {
          await Promise.all(
            petitions.map((item) => {
              strapi
                .query("api::petition.petition")
                .delete({ where: { id: item.id } });
            })
          );
        } catch (e) {
          console.log(e);
        }

        try {
          await strapi
            .query("api::organization.organization")
            .delete({ where: { owner: personalUser.owner.id } });
        } catch (e) {
          console.log(e);
        }

        try {
          await strapi
            .query("plugin::users-permissions.user")
            .delete({ where: { id: personalUser.owner.id } });
        } catch (e) {
          console.log(e);
        }
      }
      try {
        await strapi
          .query("api::personal-user.personal-user")
          .delete({ where: { id: userId } });
      } catch (e) {
        console.log(e);
      }
      return "deleted";
    } else {
      throw new ApplicationError("User does not exist");
    }
  },
};
