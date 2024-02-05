/** @fileoverview Setting up the app authorization. */

import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import { AppDataSource } from '@/data-source.ts';
import { User } from '@/Models/User.ts';
import { JWT_TOKEN_SECRET } from '@/config.ts';
import { APIError } from '@/utils/APIError.ts';

const strategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_TOKEN_SECRET,
};

export const todoAppJWTStrategy = new JWTStrategy(strategyOptions, async ({ id }: Express.User, done) => {
  const userRepository = AppDataSource.getRepository(User);

  if (!(await userRepository.existsBy({ id }))) {
    return done(new APIError(401, 'AUTHORIZATION_FAILED'), undefined);
  }

  return done(null, { id });
});
