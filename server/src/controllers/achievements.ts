import { RequestHandler } from 'express';
import { User } from '../database/models/user';
import { AchievementType } from './../database/models/achievement';
import { Achievement } from './../database/models/achievement';

interface AddAchievementReqBody {
  user_id: string;
  achievement_type: AchievementType;
}

export const addAchievement: RequestHandler = async (
  req,
  res
): Promise<void> => {
  try {
    const { user_id, achievement_type } = req.body as AddAchievementReqBody;
    const user = await User.findOne({ where: { id: user_id } });
    if (!user) {
      throw new Error("user isn't in db");
    }
    const foundAchievement = await Achievement.findOne({
      where: { user_id, achievement_type }
    });
    if (foundAchievement) {
      throw new Error('user already has achievement');
    }
    const newAchievement = await Achievement.create({
      user_id,
      achievement_type
    });
    if (!newAchievement) {
      throw new Error("couldn't add achievement to db");
    }
    res.status(201).send(newAchievement);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
