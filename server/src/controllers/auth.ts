import { RegisterUserReqBody, LoginUserReqBody } from './../interfaces/users';
import { RequestHandler } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { User } from '../database/models/user';
import { v4 as getId } from 'uuid';
import bcrypt from 'bcrypt';

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

const getHash = async (password: string) => {
  const saltRounds = 12;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
};

const validate = async (username: string, password: string) => {
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return false;
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.hash);
  return !isPasswordCorrect ? false : user;
};

export const registerUser: RequestHandler = async (req, res) => {
  const { username, password } = req.body as RegisterUserReqBody;
  const user = await User.findOne({ where: { username } });
  if (user) {
    return res.send(`user with username of ${username} already exists`);
  }
  const newUser = await User.create({
    id: getId(),
    username,
    hash: await getHash(password),
  });
  res.send(newUser);
};

export const loginUser: RequestHandler = async (req, res) => {
  const { username, password } = req.body as LoginUserReqBody;
  const user = await validate(username, password);
  res.send(user);
};

// export const logoutUser: RequestHandler = async (req, res) => {
//   req.logout();
//   res.send(true);
// };

// const signInWithGoogleAsync = async () => {
//   try {
//     const result = await Google.logInAsync({
//       iosClientId: process.env.GOOGLE_CLIENT_ID,
//       scopes: ['profile', 'email'],
//     });
//     if (result.type === 'success') {
//       return result.accessToken;
//     } else {
//       return { cancelled: true };
//     }
//   } catch (e) {
//     return { error: true };
//   }
// };

// export const loginUser: RequestHandler = async (req, res) => {
//   const accessToken = await signInWithGoogleAsync();
//   if (!accessToken) {
//     createUser(accessToken);
//   } else {
//     logUserIn(accessToken);
//   }
// };

// const createUser = (accessToken: any) => {
//   console.log(accessToken);
// };

// const logUserIn = (accessToken: any) => {
//   console.log(accessToken);
// };
