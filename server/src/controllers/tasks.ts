import sequelize from 'sequelize';
import { Task } from '../database/models/task';
import { RequestHandler } from 'express';
import { AddTaskReqBody } from '../interfaces/tasks';
import { User } from '../database/models/user';
import { List } from '../database/models/list';
import { Like } from '../database/models/like';
import { Comment } from '../database/models/comment';

export const getTasks: RequestHandler = async (req, res) => {
  const tasks = await Task.findAll();
  res.send(tasks);
};

export const addTask: RequestHandler = async (req, res) => {
  const {
    user_id,
    description,
    due_date,
    minutes_to_complete,
    is_important,
    // list_id,
  } = req.body as AddTaskReqBody;
  console.log(req.body);
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
      minutes_to_complete,
      is_important,
      is_complete: false,
      is_public: false,
      //list_id,
    });
    res.send(newTask);
  } catch (err) {
    if (err instanceof Error) {
      console.log('entry submission error', err.message);
    }
    res.sendStatus(500);
  }
};

export const removeTask: RequestHandler<{ id: string }> = async (req, res) => {
  const { id } = req.params;
  await Task.destroy({ where: { id } });
  res.send(true);
};

export const markTaskAsComplete: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    await Task.update(
      { is_complete: true, completed_at: new Date() },
      { where: { id } }
    );
    const task = await Task.findOne({ where: { id } });
    if (!task) {
      throw new Error(`task with ${id} isn't in db`);
    }
    const minutes = task.getDataValue('minutes_to_complete');
    const user = await User.findOne({ where: { id: task.user_id } });
    if (!user) {
      throw new Error(`user with ${task.user_id} isn't in db`);
    }
    const currentPoints = user.getDataValue('points');
    const currentLevel = user.getDataValue('level');
    const returnVal = await User.update(
      {
        points:
          currentPoints + minutes < 100
            ? currentPoints + minutes
            : (currentPoints + minutes) % 100,
        level: currentPoints + minutes < 100 ? currentLevel : currentLevel + 1,
      },
      { where: { id: task.user_id }, returning: true }
    );
    const updatedUser = await User.findOne({ where: { id: task.user_id } });
    res.send({ task, points: updatedUser?.points, level: updatedUser?.level });
  } catch (error) {
    console.log(error);
  }
};

export const markTaskAsIncomplete: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    await Task.update({ is_complete: false }, { where: { id } });
    const task = await Task.findOne({ where: { id } });
    if (!task) {
      throw new Error(`task with ${id} isn't in db`);
    }
    const minutes = task.getDataValue('minutes_to_complete');
    const user = await User.findOne({ where: { id: task.user_id } });
    if (!user) {
      throw new Error(`user with ${task.user_id} isn't in db`);
    }
    const currentPoints = user.getDataValue('points');
    const currentLevel = user.getDataValue('level');
    await User.update(
      {
        points:
          currentPoints - minutes < 0
            ? 100 - (minutes - currentPoints)
            : currentPoints - minutes,
        level: currentPoints - minutes < 0 ? currentLevel - 1 : currentLevel,
      },
      { where: { id: task.user_id } }
    );
    const updatedUser = await User.findOne({ where: { id: task.user_id } });
    res.send({ task, points: updatedUser?.points, level: updatedUser?.level });
  } catch (error) {
    console.log(error);
  }
};

export const markTaskAsPublic: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    await Task.update({ is_public: true }, { where: { id } });
    res.send(true);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const markTaskAsPrivate: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    await Task.update({ is_public: false }, { where: { id } });
    res.send(true);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getFeedItems: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  try {
    console.log('fetching feed items');
    const feed = await Task.findAll({
      where: {
        is_public: true,
        user_id: { [sequelize.Op.not]: req.params.id },
      },
      order: [['completed_at', 'DESC']],
      limit: 10,
    });
    const mappedFeed = await Promise.all(
      feed.map(async (feedItem) => {
        const foundUser = await User.findOne({
          where: { id: feedItem.getDataValue('user_id') },
        });
        const foundUsername = foundUser?.getDataValue('username');
        let likes = await Like.findAll({
          where: { task_id: feedItem.getDataValue('id') },
        });
        const comments = await Comment.findAll({
          where: { task_id: feedItem.getDataValue('id') },
        });
        return {
          id: feedItem.getDataValue('id'),
          username: foundUsername,
          description: feedItem.getDataValue('description'),
          completed_at: feedItem.getDataValue('completed_at'),
          likes,
          comments,
        };
      })
    );
    res.send(mappedFeed);
  } catch (error) {
    res.status(500).send(error);
  }
};
