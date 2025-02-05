export default ({ env }) => ({
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: env("JWT_EXPIRES_IN", "10m"),
      },
    },
  },
});
