import app from './app';
import { Task } from './database/models/task';
import { Like } from './database/models/like';
import { Comment } from './database/models/comment';
import { User } from './database/models/user';
import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer(app);
const options = {};
const io = new Server(httpServer, options);

const fetchTask = async (id: number) => {
  const task = await Task.findOne({ where: { id } });
  const likes = await Like.findAll({ where: { task_id: id } });
  const comments = await Comment.findAll({ where: { task_id: id } });
  const user = await User.findOne({
    where: { id: task?.getDataValue('user_id') },
  });
  const username = user?.getDataValue('username');
  return {
    id: task?.getDataValue('id'),
    username,
    description: task?.getDataValue('description'),
    completed_at: task?.getDataValue('completed_at'),
    likes,
    comments,
  };
};

io.on('connection', (socket) => {
  console.log(`connection to socket with id of ${socket.id} successful`);

  socket.on('addToFeed', (task) => {
    fetchTask(task.id)
      .then((task) => {
        io.emit('addToFeed', task);
      })
      .catch((err) => console.log(err));
  });

  socket.on('removeFromFeed', (arg) => {
    io.emit('removeFromFeed', arg.id);
  });

  socket.on('addLike', (like) => {
    fetchTask(like.task_id)
      .then((task) => io.emit('addLike', task))
      .catch((err) => console.log(err));
  });

  socket.on('removeLike', (taskId) => {
    fetchTask(taskId)
      .then((task) => io.emit('removeLike', task))
      .catch((err) => console.log(err));
  });

  socket.on('addComment', (comment) => {
    fetchTask(comment.task_id)
      .then((task) => io.emit('addComment', task))
      .catch((err) => console.log(err));
  });

  socket.on('removeComment', (taskId) => {
    fetchTask(taskId)
      .then((task) => io.emit('removeComment', task))
      .catch((err) => console.log(err));
  });
});

export default httpServer;
