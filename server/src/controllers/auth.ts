import { RegisterUserReqBody, LoginUserReqBody } from './../interfaces/users';
import { RequestHandler } from 'express';
import { User } from '../database/models/user';
import { v4 as getId } from 'uuid';
import bcrypt from 'bcrypt';
import { Task } from '../database/models/task';
import { JournalEntry } from '../database/models/journalEntry'
import { log } from 'console';
import isPast from 'date-fns/isPast';

const getHash = async (password: string): Promise<string> =>
  await bcrypt.hash(password, 12);

// create user interface
// add return type Promise<false | User>
const validate = async (username: string, password: string) => {
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return false;
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.hash);
  return !isPasswordCorrect ? false : user;
};

// add return type Promise<false | user>
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

// create formatted user interface
// add return type Promise<false | FormattedUser>
export const loginUser: RequestHandler = async (req, res): Promise<any> => {
  const { username, password } = req.body as LoginUserReqBody;
  const user = await validate(username, password);
  if (!user) {
    return false;
  }
  const tasks = await Task.findAll({
    where: { user_id: user.id },
    order: [['due_date', 'ASC']],
  });
  const mappedUser = {
    id: user.getDataValue('id'),
    username: user.getDataValue('username'),
    points: user.getDataValue('points'),
    level: user.getDataValue('level'),
  };
  const mappedTasks = tasks
    .filter((task) => {
      return (
        (isPast(new Date(task.getDataValue('due_date'))) &&
          !task.getDataValue('is_complete')) ||
        !isPast(new Date(task.getDataValue('due_date')))
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

  const journals = await JournalEntry.findAll({ limit: 10, order: [['updatedAt', 'DESC']]});
  console.log(journals, 'line 67');
  console.log(formattedUser);
  res.send(formattedUser);
};
