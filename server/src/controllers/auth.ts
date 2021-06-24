import { RegisterUserReqBody, LoginUserReqBody } from './../interfaces/users';
import { RequestHandler } from 'express';
import { User } from '../database/models/user';
import { v4 as getId } from 'uuid';
import bcrypt from 'bcrypt';
import { Task } from '../database/models/task';
import { log } from 'console';

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

export const loginUser: RequestHandler = async (req, res): Promise<any> => {
  const { username, password } = req.body as LoginUserReqBody;
  const user = await validate(username, password);
  if (!user) {
    return false;
  }
  const tasks = await Task.findAll({ where: { user_id: user.id } });
  const mappedUser = {
    id: user.getDataValue('id'),
    username: user.getDataValue('username'),
  };
  const mappedTasks = tasks
    .filter((task) => {
      return (
        new Date(task.getDataValue('due_date')).getDate() >=
          new Date().getDate() || !task.getDataValue('is_complete')
      );
    })
    .map((task) => {
      return {
        id: task.getDataValue('id'),
        description: task.getDataValue('description'),
        due_date: task.getDataValue('due_date'),
        minutes_to_complete: task.getDataValue('minutes_to_complete'),
        is_important: task.getDataValue('is_important'),
        is_complete: task.getDataValue('is_complete'),
      };
    });
  const formattedUser = { ...mappedUser, tasks: mappedTasks };
  res.send(formattedUser);
};
