declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NSH_API_URL: string;
      NSH_AUTH_TOKEN: string;
    }
  }
}

export {}
