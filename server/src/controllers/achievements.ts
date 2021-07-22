import {
  AddCommentReqBody,
  RemoveCommentReqParams
} from './../interfaces/comments';
import { RequestHandler } from 'express';
import { User } from '../database/models/user';
import { AchievementType } from './../database/models/achievement';
import { Achievement } from './../database/models/achievement';
import { AchievementLike } from './../database/models/achievementLike';
import { AchievementComment } from './../database/models/achievementComment';
import sequelize from 'sequelize';

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
    res.status(201).send({
      id: newAchievement.getDataValue('id'),
      user_id: newAchievement.getDataValue('user_id'),
      achievement_type: newAchievement.getDataValue('achievement_type'),
      createdAt: newAchievement.getDataValue('createdAt'),
      updatedAt: newAchievement.getDataValue('updatedAt')
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

interface AddAchievementCommentReqBody {
  userId: string;
  achievementId: number;
  content: string;
}

export const addComment: RequestHandler = async (req, res): Promise<void> => {
  try {
    console.log(req.body);

    const { userId, achievementId, content } =
      req.body as AddAchievementCommentReqBody;
    const newComment = await AchievementComment.create({
      user_id: userId,
      achievement_id: achievementId,
      content
    });
    if (!newComment) {
      throw new Error('failed to make new achievement comment');
    }
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("can't find user in db");
    }
    res.send({
      id: newComment.getDataValue('id'),
      content: newComment.getDataValue('content'),
      user_id: newComment.getDataValue('user_id'),
      username: user.getDataValue('username'),
      task_id: newComment.getDataValue('achievement_id')
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

interface RemoveAchievementCommentReqParams {
  commentId: number;
}

export const removeComment: RequestHandler<RemoveAchievementCommentReqParams> =
  async (req, res): Promise<void> => {
    try {
      const { commentId } = req.params;
      await AchievementComment.destroy({ where: { id: commentId } });
      res.send(true);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  };

interface AddAchievementLikeReqBody {
  userId: string;
  achievementId: number;
}

export const addLike: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { userId, achievementId } = req.body as AddAchievementLikeReqBody;
    const newAchievementLike = await AchievementLike.create({
      user_id: userId,
      achievement_id: achievementId
    });
    if (!newAchievementLike) {
      throw new Error('unable to add achievement like to db');
    }
    res.send(newAchievementLike);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

interface RemoveAchievementLikeReqParams {
  userId: string;
  achievementId: number;
}

export const removeLike: RequestHandler<RemoveAchievementLikeReqParams> =
  async (req, res): Promise<void> => {
    try {
      const { userId, achievementId } = req.params;
      await AchievementLike.destroy({
        where: {
          [sequelize.Op.and]: [
            { user_id: userId },
            { achievement_id: achievementId }
          ]
        }
      });
      res.send(true);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  };
