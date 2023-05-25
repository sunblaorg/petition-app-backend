export default {
  routes: [
    {
      method: "POST",
      path: "/create-petition",
      handler: "create-petition.createPetition",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
