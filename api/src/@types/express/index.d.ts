/* eslint-disable @typescript-eslint/consistent-type-definitions */

declare global {
  namespace Express {
    interface User {
      id: number;
    }
  }
}

export {};
