import { createServer } from 'http';
import app from './app';
import { Server } from 'socket.io';

import { Task } from './database/models/task';
import { Like } from './database/models/like';
import { Comment } from './database/models/comment';
import { User } from './database/models/user';
import { Friend } from './database/models/friend';
import { Achievement } from './database/models/achievement';
import { AchievementComment } from './database/models/achievementComment';
import { AchievementLike } from './database/models/achievementLike';

import { FormattedTask } from './interfaces/tasks';
import { FriendshipObject } from './interfaces/friends';

import { client } from './database';

const httpServer = createServer(app);
const options = {};
const io = new Server(httpServer, options);

const fetchTask = async (id: number): Promise<FormattedTask> => {
  const task = await Task.findOne({ where: { id } });
  const likes = await Like.findAll({ where: { task_id: id } });
  const comments = await Comment.findAll({ where: { task_id: id } });
  const user = await User.findOne({
    where: { id: task?.getDataValue('user_id') }
  });
  const username = user?.getDataValue('username');
  const mappedComments = await Promise.all(
    comments.map(async (comment) => {
      const currentUser = await User.findOne({
        where: { id: comment.getDataValue('user_id') }
      });
      return {
        id: comment.getDataValue('id'),
        content: comment.getDataValue('content'),
        user_id: comment.getDataValue('user_id'),
        username: currentUser?.getDataValue('username')
      };
    })
  );
  return {
    id: task?.getDataValue('id'),
    username,
    description: task?.getDataValue('description'),
    completed_at: task?.getDataValue('completed_at'),
    likes,
    comments: mappedComments
  };
};

const getUserId = (socketId: string): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    client.get(socketId, (err, clientId) => {
      if (err) {
        reject(err);
      }
      resolve(clientId ? clientId : null);
    });
  });
};

const fetchFriends = async (userId: string): Promise<string[]> => {
  const friends = await Friend.findAll({ where: { friend_id: userId } });
  const mappedFriends = friends.map((friend) => friend.getDataValue('user_id'));
  return mappedFriends;
  // return new Promise((resolve, reject) => {
  //   client.lrange(userId, 0, -1, (error, response) => {
  //     if (error) {
  //       reject(error);
  //     }
  //     resolve(response);
  //   });
  // });
};

const updateFeed = async (
  taskId: number,
  socketId: string,
  event: string
): Promise<void> => {
  const foundTask = await fetchTask(taskId);
  const userId = await getUserId(socketId);
  if (userId) {
    const friends = await fetchFriends(userId);
    const sockets = io.sockets.sockets;
    for (const currentSocket of sockets) {
      const currentUserId = await getUserId(currentSocket[0]);
      if (currentUserId && friends.includes(currentUserId)) {
        io.to(currentSocket[0]).emit(event, foundTask);
      }
    }
  }
};

const fetchAchievement = async (id: number) => {
  try {
    const achievement = await Achievement.findOne({ where: { id } });
    if (!achievement) throw new Error('cannot find achievement');
    const achievementLikes = await AchievementLike.findAll({
      where: { achievement_id: id }
    });
    const achievementComments = await AchievementComment.findAll({
      where: { achievement_id: id }
    });
    const user = await User.findOne({
      where: { id: achievement.getDataValue('user_id') }
    });
    // if (!user) throw new Error('cannot find user');
    const username = user.getDataValue('username');
    const mappedAchievementComments = await Promise.all(
      achievementComments.map(async (achievementComment) => {
        const currentUser = await User.findOne({
          where: { id: achievementComment.getDataValue('user_id') }
        });
        if (!currentUser) throw new Error('cannot fine current user');
        return {
          id: achievementComment.getDataValue('id'),
          content: achievementComment.getDataValue('content'),
          user_id: achievementComment.getDataValue('user_id'),
          username: currentUser.getDataValue('username')
        };
      })
    );
    return {
      id,
      username,
      description: achievement.getDataValue('achievement_type'),
      completed_at: achievement.getDataValue('createdAt'),
      likes: achievementLikes,
      comments: mappedAchievementComments,
      isAchievement: true
    };
  } catch (error) {
    console.log(error);
  }
};

const addAchievementToFeed = async (
  achievementId: number,
  socketId: string,
  event: string
) => {
  const achievement = await fetchAchievement(achievementId);
  // if (!achievement) throw new Error('cannot find achievement');
  const userId = await getUserId(socketId);
  // if (!userId) throw new Error('cannot find user id');
  if (userId) {
    const friends = await fetchFriends(userId);
    const sockets = io.sockets.sockets;
    for (const currentSocket of sockets) {
      const currentUserId = await getUserId(currentSocket[0]);
      if (currentUserId && friends.includes(currentUserId)) {
        io.to(currentSocket[0]).emit(event, achievement);
      }
    }
  }
};

io.on('connection', (socket) => {
  socket.on('addToFeed', (task) => {
    updateFeed(task.id, socket.id, 'addToFeed');
  });

  socket.on('removeFromFeed', async (taskId) => {
    try {
      const userId = await getUserId(socket.id);
      if (userId) {
        const friends = await fetchFriends(userId);
        const sockets = io.sockets.sockets;
        for (const currentSocket of sockets) {
          const currentUserId = await getUserId(currentSocket[0]);
          if (currentUserId && friends.includes(currentUserId)) {
            io.to(currentSocket[0]).emit('removeFromFeed', taskId);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('addLike', async (like) => {
    updateFeed(like.task_id, socket.id, 'addLike');
  });

  socket.on('removeLike', async (taskId) => {
    updateFeed(taskId, socket.id, 'removeLike');
  });

  socket.on('addComment', async (comment) => {
    updateFeed(comment.task_id, socket.id, 'addComment');
  });

  socket.on('removeComment', async (taskId) => {
    updateFeed(taskId, socket.id, 'removeComment');
  });

  socket.on('loggedIn', async (userId: string) => {
    client.set(socket.id.toString(), userId.toString());
    // const friendships = await Friend.findAll({
    //   where: { friend_id: userId },
    //   attributes: ['user_id']
    // });
    // const mappedFriendships = friendships.map((friendship) =>
    //   friendship.getDataValue('user_id')
    // );
    // for (const currentFriendship of mappedFriendships) {
    //   client.rpush(userId.toString(), currentFriendship.toString());
    // }
  });

  socket.on('loggedOut', (userId) => {
    client.del(socket.id);
    // client.del(userId);
  });

  socket.on('addFriend', (friendshipObj: FriendshipObject) => {
    const { userId, friendId } = friendshipObj;
    client.rpush(userId, friendId);
  });

  socket.on('removeFriend', (friendshipObj: FriendshipObject) => {
    const { userId, friendId } = friendshipObj;
    client.lrange(userId, 0, -1, (err, friendships) => {
      const filtered = friendships.filter((friendship: string) => {
        friendship !== friendId;
      });
      client.del(userId, () => {
        for (const currentFriendship of filtered) {
          client.rpush(userId, currentFriendship);
        }
      });
    });
  });

  socket.on('achievementAdded', async (achievementObject) => {
    const userId = await getUserId(socket.id);
    if (userId) {
      const user = await User.findOne({ where: { id: userId } });
      if (user) {
        const username = user.getDataValue('username');
        if (username) {
          const friends = await fetchFriends(userId);
          const sockets = io.sockets.sockets;
          for (const currentSocket of sockets) {
            const currentUserId = await getUserId(currentSocket[0]);
            if (currentUserId && friends.includes(currentUserId)) {
              io.to(currentSocket[0]).emit('achievementAdded', {
                ...achievementObject,
                username
              });
            }
          }
          io.to(socket.id).emit('achievementAdded', {
            ...achievementObject,
            username
          });
        }
      }
    }
  });

  socket.on('addAchievementComment', async (commentObj) => {
    addAchievementToFeed(
      commentObj.task_id,
      socket.id,
      'addAchievementComment'
    );
  });

  socket.on('removeAchievementComment', async (achievementId) => {
    addAchievementToFeed(achievementId, socket.id, 'removeAchievementComment');
  });

  socket.on('addAchievementLike', async (likeObj) => {
    console.log(likeObj);
    addAchievementToFeed(
      likeObj.achievement_id,
      socket.id,
      'addAchievementLike'
    );
  });

  socket.on('removeAchievementLike', async (achievementId) => {
    console.log(achievementId);
    addAchievementToFeed(achievementId, socket.id, 'removeAchievementLike');
  });
});
export default httpServer;
