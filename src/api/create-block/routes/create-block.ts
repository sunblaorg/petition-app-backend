export default {
  routes: [
    {
      method: "POST",
      path: "/create-block",
      handler: "create-block.createBlock",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
