import { RequestHandler } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { User } from '../database/models/user';

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

const signInWithGoogleAsync = async () => {
  try {
    const result = await Google.logInAsync({
      iosClientId: process.env.GOOGLE_CLIENT_ID,
      scopes: ['profile', 'email'],
    });
    if (result.type === 'success') {
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  const accessToken = await signInWithGoogleAsync();
  if (!accessToken) {
    createUser(accessToken);
  } else {
    logUserIn(accessToken);
  }
};

const createUser = (accessToken: any) => {
  console.log(accessToken);
};

const logUserIn = (accessToken: any) => {
  console.log(accessToken);
};
