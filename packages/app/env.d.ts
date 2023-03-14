declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NSH_API_URL: string;
      NSH_API_KEY: string;
      NSH_API_SOURCE: string;
    }
  }
}

export {}
