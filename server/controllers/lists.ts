import { List } from '../database/models/list';
import { RequestHandler } from 'express';

export const addList: RequestHandler = async (req, res, next) => {
  const { listName } = req.body as { listName: string };
  const newList = await List.create({
    name: listName,
  });
  res.send(newList);
};

export const removeList: RequestHandler = (req, res, next) => {
  res.send('in remove list request handler');
};
