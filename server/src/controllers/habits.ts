import { Habit } from '../database/models/habit';
import { RequestHandler } from 'express';
import { AddHabitReqBody } from '../interfaces/habits';

export const addHabit: RequestHandler = async (req, res) => {
  const {
    user_id,
    description,
    frequency,
    days_of_week,
    calendar_date
  } = req.body as AddHabitReqBody;

  try {
    const newHabit = await Habit.create({
      user_id,
      description,
      frequency,
      days_of_week,
      calendar_date
    });
    console.log('habit successfully posted');
    res.status(201).send(newHabit);
  } catch (err) {
    console.log('habit submission error: ', err.message);
    res.sendStatus(500);
  }
};