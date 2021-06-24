import { Task } from '../database/models/task';
import { RequestHandler } from 'express';
import { AddTaskReqBody } from '../interfaces/tasks';
import { User } from '../database/models/user';
import { List } from '../database/models/list';

export const getTasks: RequestHandler = async (req, res) => {
  const tasks = await Task.findAll();
  res.send(tasks);
};

export const addTask: RequestHandler = async (req, res) => {
  const {
    user_id,
    description,
    due_date,
    //minutes_to_complete,
    is_important,
    list_id,
  } = req.body as AddTaskReqBody;
  console.log(req.body)
  try {

    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      return res.send(`no user found with id of ${user_id}`);
    }

    // const list = await List.findOne({ where: { id: list_id } });
    // if (!list) {
    //   return res.send(`no list found with id of ${list_id}`);
    // }

    const newTask = await Task.create({
      user_id,
      description,
      due_date,
      // minutes_to_complete,
      is_important,
      is_complete: false,
      is_public: false,
      //list_id,
    });
    res.send(newTask);
  }
  catch (err) {
    console.log('entry submission error', err.message);
    res.sendStatus(500);
  }
};

export const removeTask: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;
  await Task.destroy({ where: { id } });
  res.send(`task with id of ${id} has been removed from db`);
};

export const markTaskAsComplete: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const { id } = req.params;
  await Task.update({ is_complete: true }, { where: { id } });
  res.send(`task with id of ${id} has been set to complete`);
};

export const markTaskAsIncomplete: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  const { id } = req.params;
  await Task.update({ is_complete: false }, { where: { id } });
  res.send(`task with id of ${id} has been set to incomplete`);
};
