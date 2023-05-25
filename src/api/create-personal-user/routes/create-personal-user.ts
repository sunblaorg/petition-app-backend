export default {
  routes: [
    {
      method: "POST",
      path: "/create-personal-user",
      handler: "create-personal-user.createPersonalUser",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
