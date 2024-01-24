import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import AppDataSource from '../data-source';
import User from '../Models/User';
import { JWT_TOKEN_SECRET } from '../config';

const strategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_TOKEN_SECRET,
};

const todoAppJWTStrategy = new JWTStrategy(strategyOptions, async ({ id }, done) => {
  const userRepository = AppDataSource.getRepository(User);

  if (!(await userRepository.existsBy({ id }))) {
    return done(new Error('Ошибка аутентификации'), undefined);
  }

  return done(null, { id });
});

export default todoAppJWTStrategy;
