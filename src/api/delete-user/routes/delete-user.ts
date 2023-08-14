export default {
  routes: [
    {
      method: "POST",
      path: "/delete-user",
      handler: "delete-user.deleteUser",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
