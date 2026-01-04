export const authConfig = {
  jwtSecret: process.env.JWT_SECRET || 'yam is verY $w33t',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  bcryptSaltRounds: 10
};
