export const authConfig = {
  secret: process.env.JWT_KEY,
  expiration: 1200,
  saltLength: 10
};
