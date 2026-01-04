// Validate required environment variables
const getRequiredEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`CRITICAL: ${name} environment variable is required. Generate one with: openssl rand -base64 32`);
  }
  if (name === 'JWT_SECRET' && value.length < 32) {
    throw new Error(`CRITICAL: ${name} must be at least 32 characters for security`);
  }
  return value;
};

export const authConfig = {
  // JWT_SECRET is now required - server will not start without it
  get jwtSecret(): string {
    return getRequiredEnv('JWT_SECRET');
  },
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  bcryptSaltRounds: 10
};
