import { Habit } from '../database/models/habit';
import { RequestHandler } from 'express';
import { AddHabitReqBody } from '../interfaces/habits';
import { User } from '../database/models/user';

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

export const removeHabit: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const { id } = req.params;
    await Habit.destroy({ where: { id } });
    res.send(true);
  } catch (err) {
    console.log('error removing habit: ', err)
  }
};

export const markHabitAsComplete: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const updatedHabit = await Habit.update(
      // { is_complete: true, completed_at: new Date() },
      { is_complete: true },
      { where: { id } }
    );
    res.status(200).send(updatedHabit);
    // const habit = await Habit.findOne({ where: { id } });
    // if (!habit) {
    //   throw new Error(`task with ${id} isn't in db`);
    // }
    // const minutes = habit.getDataValue('minutes_to_complete');
    // const user = await Habit.findOne({ where: { id: habit.user_id } });
    // if (!user) {
      // throw new Error(`user with ${habit.user_id} isn't in db`);
    // }
    // const currentPoints = user.getDataValue('points');
    // const currentLevel = user.getDataValue('level');
    // const returnVal = await Habit.update(
      // {
        // points:
          // currentPoints + minutes < 100
    //         ? currentPoints + minutes
    //         : (currentPoints + minutes) % 100,
    //     level: currentPoints + minutes < 100 ? currentLevel : currentLevel + 1,
    //   },
    //   { where: { id: habit.user_id }, returning: true }
    // );
    // const updatedUser = await Habit.findOne({ where: { id: task.user_id } });
    // res.send({ habit, points: updatedUser?.points, level: updatedUser?.level });
  } catch (err) {
    console.log('error updating habit to compelete: ', err);
    res.sendStatus(500);
  }
};

export const markHabitAsIncomplete: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const updatedHabit = await Habit.update({ is_complete: false }, { where: { id } });
    res.status(200).send(updatedHabit);
    // const habit = await Habit.findOne({ where: { id } });
    // if (!habit) {
    //   throw new Error(`task with ${id} isn't in db`);
    // }
    // const minutes = habit.getDataValue('minutes_to_complete');
    // const user = await Habit.findOne({ where: { id: habit.user_id } });
    // if (!user) {
    //   throw new Error(`user with ${habit.user_id} isn't in db`);
    // }
    // const currentPoints = user.getDataValue('points');
    // const currentLevel = user.getDataValue('level');
    // await User.update(
    //   {
    //     points:
    //       currentPoints - minutes < 0
    //         ? 100 - (minutes - currentPoints)
    //         : currentPoints - minutes,
    //     level: currentPoints - minutes < 0 ? currentLevel - 1 : currentLevel,
    //   },
    //   { where: { id: habit.user_id } }
    // );
    // const updatedUser = await User.findOne({ where: { id: habit.user_id } });
    // res.send({ habit, points: updatedUser?.points, level: updatedUser?.level });
  } catch (err) {
    console.log('error marking habit as incomplete, error: ', err);
    res.sendStatus(500);
  }
};