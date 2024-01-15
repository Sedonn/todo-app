import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import { getUserByID } from '../Models/user.js';
import { JWT_TOKEN_SECRET } from '../config.js';

const strategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_TOKEN_SECRET,
};

const todoAppJWTStrategy = new JWTStrategy(strategyOptions, async ({ id }, done) => {
  const user = await getUserByID(id);

  if (!user) {
    return done(new Error('Ошибка аутентификации'), undefined);
  }

  return done(null, { id: user.id });
});

export default todoAppJWTStrategy;
