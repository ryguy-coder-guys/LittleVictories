import { RequestHandler } from 'express';
import { Comment } from './../database/models/comment';
import { User } from './../database/models/user';

interface AddCommentReqBody {
  user_id: string;
  task_id: number;
  content: string;
}

interface RemoveCommentReqParams {
  id: string;
}

export const addComment: RequestHandler = async (req, res) => {
  try {
    const { user_id, task_id, content } = req.body as AddCommentReqBody;
    const comment = await Comment.create({
      user_id,
      task_id,
      content,
    });
    const user = await User.findOne({
      where: { id: comment.getDataValue('user_id') },
    });
    if (user) {
      res.send({
        id: comment.getDataValue('id'),
        content: comment.getDataValue('content'),
        user_id: comment.getDataValue('user_id'),
        username: user.getDataValue('username'),
        task_id: comment.getDataValue('task_id'),
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const removeComment: RequestHandler<RemoveCommentReqParams> = async (
  req,
  res
) => {
  const { id } = req.params;
  await Comment.destroy({ where: { id } });
  res.send(true);
};
