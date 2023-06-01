export default {
  routes: [
    {
      method: "GET",
      path: "/resend-otp/:phone",
      handler: "resend-otp.resendOtp",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
