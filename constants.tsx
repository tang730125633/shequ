
import React from 'react';
import { Category, Post } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: '邻里互动', icon: '🏘️', color: 'bg-blue-100 text-blue-600' },
  { id: '2', name: '二手交易', icon: '⚖️', color: 'bg-green-100 text-green-600' },
  { id: '3', name: '社区活动', icon: '🎉', color: 'bg-purple-100 text-purple-600' },
  { id: '4', name: '失物招领', icon: '🔍', color: 'bg-yellow-100 text-yellow-600' },
  { id: '5', name: '求助咨询', icon: '🆘', color: 'bg-red-100 text-red-600' },
  { id: '6', name: '兴趣小组', icon: '🎨', color: 'bg-pink-100 text-pink-600' },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u1',
    userName: '张小明',
    userAvatar: 'https://picsum.photos/id/64/100/100',
    content: '今天社区花园的郁金香开得真漂亮，大家都去看看吗？',
    images: ['https://picsum.photos/id/152/800/600'],
    likes: 24,
    comments: [
      { id: 'c1', userId: 'u2', userName: '李梅', content: '确实很漂亮，下午带孩子去。', createdAt: '10:30' }
    ],
    category: '邻里互动',
    createdAt: '10:00',
    isLiked: false
  },
  {
    id: 'p2',
    userId: 'u3',
    userName: '王伟',
    userAvatar: 'https://picsum.photos/id/91/100/100',
    content: '出个九成新的空气炸锅，没用几次，有需要的邻居私聊。',
    images: ['https://picsum.photos/id/1060/800/600'],
    likes: 8,
    comments: [],
    category: '二手交易',
    createdAt: '09:15',
    isLiked: true
  }
];
