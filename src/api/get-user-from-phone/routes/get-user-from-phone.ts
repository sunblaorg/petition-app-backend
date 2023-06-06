export default {
  routes: [
    {
      method: "GET",
      path: "/get-user-from-phone/:phone/:macAddress",
      handler: "get-user-from-phone.getUserFromPhone",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
