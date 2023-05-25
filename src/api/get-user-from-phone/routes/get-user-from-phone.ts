export default {
  routes: [
    {
      method: "GET",
      path: "/get-user-from-phone/:phone",
      handler: "get-user-from-phone.getUserFromPhone",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
