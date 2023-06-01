import utils from "@strapi/utils";
const { ApplicationError } = utils.errors;

module.exports = {
  getUserFromPhone: async (phone: string) => {
    const user = await strapi.db
      .query("plugin::users-permissions.user")
      .findOne({ where: { phoneNumber: phone } });
    if (user) {
      strapi.service("api::get-user-from-phone.twilio").sendToWhatsapp(phone);
      if (user.userType === "personal") {
        const personalUser = await strapi
          .query("api::personal-user.personal-user")
          .findOne({
            where: { owner: user.id },
            populate: true,
          });
        return personalUser;
      }
      if (user.userType === "organization") {
        const organizationUser = await strapi
          .query("api::organization.organization")
          .findOne({
            where: { owner: user.id },
            populate: true,
          });
        return organizationUser;
      }
      return user;
    }
    throw new ApplicationError("User does not exist");
  },
};
