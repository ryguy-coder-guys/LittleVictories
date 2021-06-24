import { RegisterUserReqBody, LoginUserReqBody } from './../interfaces/users';
import { RequestHandler } from 'express';
import { User } from '../database/models/user';
import { v4 as getId } from 'uuid';
import bcrypt from 'bcrypt';

const getHash = async (password: string): Promise<string> =>
  await bcrypt.hash(password, 12);

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
    return res.send(false);
  }
  const newUser = await User.create({
    id: getId(),
    username,
    hash: await getHash(password),
  });
  res.send(newUser);
};

export const loginUser: RequestHandler = async (req, res): Promise<void> => {
  const { username, password } = req.body as LoginUserReqBody;
  const user = await validate(username, password);
  // const tasks = await Task.findAll({where: {user_id: user.id}});
  // return {...user, tasks}
  res.send(user);
};
