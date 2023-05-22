interface CreatePersonalUser {
  phoneNumber: string;
  userType: "personal" | "organization";
  lat: number;
  long: number;
  name: string;
  birthdateYear: string;
  gender: number;
}

module.exports = {
  createPersonalUser: async (payload: CreatePersonalUser) => {
    const { phoneNumber, userType, lat, long, name, birthdateYear, gender } =
      payload;
    try {
      const user = await strapi.plugins["users-permissions"].services.user.add({
        username: phoneNumber,
        email: `${phoneNumber}@petition.com`,
        role: 2,
        isPrivileged: false,
        phoneVerified: false,
        phoneNumber: phoneNumber,
        userType: userType,
        lat: lat,
        long: long,
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
