const DEFAULT_PORT = 3003;

export type Config = {
  PORT: number;
  DATABASE_URL: string;
  OPEN_AI_API_KEY: string;
  AUTH0_AUDIENCE: string;
  AUTH0_ISSUER_URL: string;
};

export const config = (): Config => ({
  PORT: Number(process.env.PORT || DEFAULT_PORT),
  DATABASE_URL: process.env.DATABASE_URL,
  OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
  AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
  AUTH0_ISSUER_URL: process.env.AUTH0_ISSUER_URL,
});
