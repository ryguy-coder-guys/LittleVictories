import { RequestHandler } from 'express';
import { Comment } from './../database/models/comment';

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
    res.send(comment);
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
