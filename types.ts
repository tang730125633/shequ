
export interface User {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  level: number;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  images?: string[];
  likes: number;
  comments: Comment[];
  category: string;
  createdAt: string;
  isLiked?: boolean;
}

export enum TabType {
  HOME = 'HOME',
  EXPLORE = 'EXPLORE',
  AI = 'AI',
  ME = 'ME'
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}
