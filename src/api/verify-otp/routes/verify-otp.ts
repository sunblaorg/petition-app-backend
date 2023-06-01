export default {
  routes: [
    {
      method: "GET",
      path: "/verify-otp/:phone/:otp",
      handler: "verify-otp.verifyOtp",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
