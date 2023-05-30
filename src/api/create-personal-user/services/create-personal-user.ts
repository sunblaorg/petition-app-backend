interface CreatePersonalUser {
  phoneNumber: string;
  userType: "personal" | "organization";
  lat: number;
  long: number;
  name: string;
  birthdateYear: string;
  gender: number;
  governorate: number;
}

module.exports = {
  createPersonalUser: async (payload: CreatePersonalUser) => {
    const { phoneNumber, userType, lat, long, name, birthdateYear, gender } =
      payload;
    try {
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
    } catch (err) {
      return err;
    }
  },
};
