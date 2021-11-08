const { Strategy, ExtractJwt } = require('passport-jwt');

const { config } = require('../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromUrlQueryParameter('accessToken'), ExtractJwt.fromHeader(), ExtractJwt.fromAuthHeaderAsBearerToken()]),
  secretOrKey: config.jwtSecret
}

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload);
});

module.exports = JwtStrategy;
