import { RequestHandler } from 'express';
import { User } from '../database/models/user';
import { Friend } from '../database/models/friend';

interface AddFriendReqBody {
  userId: string;
  friendId: string;
}

export const addFriend : RequestHandler = async (req, res) => {
  try {
    const { userId, friendId } = req.body as AddFriendReqBody
    console.log(userId, friendId, 'line 12')
    const user = await User.findOne({
      where: {
        id: userId
      }
    })
    if(!user){
      return res.send('user does not exist')
    }

    const friend = await User.findOne({
      where: {
        id: friendId
      }
    })
    if(!friend){
      return res.send('friend does not exist')
    }
    const friendShip = await Friend.create({
      user_id: user.id,
      friend_id: friend.id
    })

    if(!friendShip){
      return res.send('friendShip insertion did not work')
    }
    res.send(true)
  } catch (error) {
    console.log(error)
  }
}
interface RemoveFriendReqParams {
  userId: string;
  friendId: string;
}
export const removeFriend : RequestHandler<RemoveFriendReqParams> = async (req, res) => {
  try {
    const { userId, friendId } = req.params
    const user = await User.findOne({
      where: {
        id: userId
      }
    })
    if(!user){
      return res.send('user does not exist')
    }

    const friend = await User.findOne({
      where: {
        id: friendId
      }
    })
    if(!friend){
      return res.send('friend does not exist')
    }
     await Friend.destroy({
       where: {
         user_id: user.id,
         friend_id: friend.id
       }
    })
    res.send(true)
  } catch (error) {
    console.log(error)
  }
}