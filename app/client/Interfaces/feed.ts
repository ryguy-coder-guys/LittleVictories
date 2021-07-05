export interface Like {
  id: number;
  user_id: string;
  task_id: number;
  updatedAt: Date;
  createdAt: Date;
}

export interface Comment {
  id: number;
  user_id: string;
  task_id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeedItem {
  id: number;
  username: string;
  description: string;
  completed_at: Date;
  likes: Like[];
  comments: Comment[];
}
