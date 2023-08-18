export default {
  routes: [
    {
      method: "POST",
      path: "/create-report",
      handler: "create-report.createReport",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
