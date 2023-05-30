export default {
  routes: [
    {
      method: "POST",
      path: "/create-organization-user",
      handler: "create-organization-user.createOrganizationUser",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
