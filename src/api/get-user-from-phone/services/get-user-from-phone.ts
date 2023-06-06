import utils from "@strapi/utils";
const { ApplicationError } = utils.errors;

module.exports = {
  getUserFromPhone: async (phone: string, macAddress: string) => {
    const user = await strapi.db
      .query("plugin::users-permissions.user")
      .findOne({ where: { phoneNumber: phone } });
    if (user) {
      const verifiedUser = user?.macAddress === macAddress;
      if (!user?.macAddress || !verifiedUser) {
        strapi.service("api::get-user-from-phone.twilio").sendToWhatsapp(phone);
        await strapi.entityService.update(
          "plugin::users-permissions.user",
          user.id,
          {
            data: {
              macAddress: macAddress,
            },
          }
        );
      }
      if (user.userType === "personal") {
        const personalUser = await strapi
          .query("api::personal-user.personal-user")
          .findOne({
            where: { owner: user.id },
            populate: true,
          });
        return { ...personalUser, verifiedUser: verifiedUser };
      }
      if (user.userType === "organization") {
        const organizationUser = await strapi
          .query("api::organization.organization")
          .findOne({
            where: { owner: user.id },
            populate: true,
          });
        return { ...organizationUser, verifiedUser: verifiedUser };
      }
      return { ...user, verifiedUser: verifiedUser };
    }
    throw new ApplicationError("User does not exist");
  },
};
