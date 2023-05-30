import utils from "@strapi/utils";
const { ApplicationError } = utils.errors;
interface CreatePersonalUser {
  lat: number;
  long: number;
  EstablishedYear: string;
  gender: number;
  arName: string;
  enName: string;
  nearestLandmark: string;
  CEOName: string;
  ceoPhone: string;
  organizationPhone: string;
  facebookLink: string;
  instagramLink: string;
  websiteLink: string;
  permitNumber: string;
  governorate: number;
  logo: number;
  permitImage: number;
  ip: string;
}

module.exports = {
  createOrganizationUser: async (payload: CreatePersonalUser) => {
    const {
      lat,
      long,
      arName,
      enName,
      nearestLandmark,
      CEOName,
      ceoPhone,
      organizationPhone,
      facebookLink,
      instagramLink,
      websiteLink,
      permitNumber,
      governorate,
      logo,
      permitImage,
      ip,
    } = payload;

    const users = await strapi.db
      .query("plugin::users-permissions.user")
      .findMany({ where: { ipAddress: ip } });

    if (users?.length > 2) {
      throw new ApplicationError("Multiple requests from same ip address");
    }

    const user = await strapi.plugins["users-permissions"].services.user.add({
      username: ceoPhone,
      email: `${ceoPhone}@petition.com`,
      role: 2, // public
      isPrivileged: false,
      phoneVerified: false,
      phoneNumber: ceoPhone,
      userType: "organization",
      lat: lat,
      long: long,
      arName: arName,
      enName: enName,
      image: logo,
      ipAddress: ip,
    });

    const { id } = user;
    const organization = await strapi.entityService.create(
      "api::organization.organization",
      {
        data: {
          nearestLandmark,
          CEOName,
          organizationPhone,
          facebookLink,
          instagramLink,
          websiteLink,
          governorate,
          permitImage,
          permitNumber,
          owner: id,
          arName,
          enName,
          logo,
        },
        populate: "*",
      }
    );
    return organization;
  },
};
