declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_PORT: string;
    }
  }
}

export {};
