import { Task } from '../database/models/task';
import { RequestHandler } from 'express';

export const getTasks: RequestHandler = (req, res, next) => {
  res.send('in get tasks function');
};

export const addTask: RequestHandler = (req, res, next) => {
  res.send('in add task function');
};

export const removeTask: RequestHandler = (req, res, next) => {
  res.send('in remove task function');
};

export const markTaskAsComplete: RequestHandler = (req, res, next) => {
  res.send('in mark task as complete function');
};

export const markTaskAsIncomplete: RequestHandler = (req, res, next) => {
  res.send('in mark task as incomplete function');
};
