import utils from "@strapi/utils";
const { ApplicationError } = utils.errors;
interface CreatePersonalUser {
  phoneNumber: string;
  userType: "personal" | "organization";
  lat: number;
  long: number;
  name: string;
  birthdateYear: string;
  gender: number;
  governorate: number;
  ip: string;
}

module.exports = {
  createPersonalUser: async (payload: CreatePersonalUser) => {
    const { phoneNumber, lat, long, name, birthdateYear, gender, ip } = payload;
    const users = await strapi.db
      .query("plugin::users-permissions.user")
      .findMany({ where: { ipAddress: ip } });
    if (users?.length > 2) {
      throw new ApplicationError("Multiple requests from same ip address");
    }
    const user = await strapi.plugins["users-permissions"].services.user.add({
      username: phoneNumber,
      email: `${phoneNumber}@petition.com`,
      role: 2, // public
      isPrivileged: false,
      phoneVerified: false,
      phoneNumber: phoneNumber,
      userType: "personal",
      lat: lat,
      long: long,
      arName: name,
      enName: name,
      ipAddress: ip,
    });

    const { id } = user;
    const personalUser = await strapi.entityService.create(
      "api::personal-user.personal-user",
      {
        data: {
          name: name,
          birthdateYear: birthdateYear,
          gender: gender,
          owner: id,
        },
        populate: "*",
      }
    );
    return personalUser;
  },
};
