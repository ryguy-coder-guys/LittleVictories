import { UserStat } from '../database/models/stat';
import { RequestHandler } from 'express';
import { AddStatsReqBody } from '../interfaces/stats';

export const addStats: RequestHandler = async (req, res) => {
  const {
    user_id,
    sleep_hours,
    eaten_well,
    exercised,
    notes,
    mood
  } = req.body as AddStatsReqBody;

  try {
    await UserStat.create({
      user_id,
      sleep_hours,
      eaten_well,
      exercised,
      notes,
      mood
    });
    console.log('stats successfully submitted');
    res.sendStatus(201);
  } catch (err) {
    console.log('stat submission error: ', err.message);
    res.sendStatus(500);
  }
};