interface CreatePetition {
  title: string;
  governorate: number;
  category: number;
  hideName: boolean;
  image?: string;
  creator: number;
  description: string;
}

module.exports = {
  createPetition: async (payload: CreatePetition) => {
    const { title, governorate, category, hideName, creator, description } =
      payload;
    try {
      const petitionStat = await strapi.entityService.create(
        "api::petition-stat.petition-stat",
        {
          data: {
            views: 0,
            shares: 0,
          },
          populate: "*",
        }
      );
      const { id: petitionStatId } = petitionStat;

      const petition = await strapi.entityService.create(
        "api::petition.petition",
        {
          data: {
            title,
            governorate,
            category,
            hideName,
            creator,
            description,
            petition_stat: petitionStatId,
          },
          populate: "*",
        }
      );
      return petition;
    } catch (err) {
      return err;
    }
  },
};
