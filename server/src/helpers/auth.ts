import { User } from '../database/models/user';
import passport from 'passport';
import LocalStrategy from 'passport-local';

export default (req, res, next) => {
  console.log('executing auth function');
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  next();
};
