
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import PostCard from './components/PostCard';
import AIChat from './components/AIChat';
import { Post, TabType } from './types';
import { CATEGORIES, INITIAL_POSTS } from './constants.tsx';
import { Plus, Search, MapPin, Bell } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.HOME);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          isLiked: !p.isLiked,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    }));
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;
    const newPost: Post = {
      id: Date.now().toString(),
      userId: 'currentUser',
      userName: '我',
      userAvatar: 'https://picsum.photos/id/1012/100/100',
      content: newPostContent,
      likes: 0,
      comments: [],
      category: '邻里互动',
      createdAt: '刚刚',
      isLiked: false
    };
    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setShowCreateModal(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case TabType.HOME:
        return (
          <div className="pb-10">
            {/* Banner Section */}
            <div className="p-4 bg-gradient-to-br from-teal-500 to-teal-700 mx-3 rounded-2xl mb-4 text-white shadow-lg shadow-teal-500/20">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-bold">欢迎回来, 邻居!</h2>
                  <div className="flex items-center gap-1 text-teal-100 text-xs mt-1">
                    <MapPin size={12} /> 悦湖家园社区 · 东区
                  </div>
                </div>
                <button className="bg-white/20 p-2 rounded-full backdrop-blur-sm relative">
                  <Bell size={18} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                <p className="text-xs font-medium">📢 社区公告：周六上午10点社区广场举行义诊活动，欢迎参加。</p>
              </div>
            </div>

            {/* Category Quick Access */}
            <div className="px-3 mb-6">
              <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.map(cat => (
                  <button key={cat.id} className="flex flex-col items-center p-3 rounded-2xl bg-white border border-gray-100 shadow-sm active:scale-95 transition-transform">
                    <span className="text-2xl mb-1">{cat.icon}</span>
                    <span className="text-[11px] font-semibold text-gray-700">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Post Feed */}
            <div className="flex items-center justify-between px-4 mb-2">
              <h3 className="font-bold text-gray-800">最新动态</h3>
              <div className="flex gap-2">
                <button className="p-1.5 bg-white rounded-lg border border-gray-100 text-gray-500"><Search size={16} /></button>
              </div>
            </div>
            
            <div className="space-y-1">
              {posts.map(post => (
                <PostCard key={post.id} post={post} onLike={handleLike} />
              ))}
            </div>

            {/* FAB for posting */}
            <button 
              onClick={() => setShowCreateModal(true)}
              className="fixed bottom-24 right-6 w-14 h-14 bg-teal-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40 active:scale-90 transition-transform hover:bg-teal-700"
            >
              <Plus size={32} />
            </button>
          </div>
        );
      case TabType.EXPLORE:
        return (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">话题发现</h2>
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                  <img src={`https://picsum.photos/id/${10+i}/300/200`} className="w-full h-24 object-cover rounded-lg mb-2" />
                  <h4 className="font-bold text-sm"># 社区摄影大赛 #{i}</h4>
                  <p className="text-[10px] text-gray-400 mt-1">1.2w 人在讨论</p>
                </div>
              ))}
            </div>
          </div>
        );
      case TabType.AI:
        return <AIChat />;
      case TabType.ME:
        return (
          <div className="bg-gray-50 h-full">
            <div className="bg-white p-8 text-center border-b border-gray-100">
              <img src="https://picsum.photos/id/1012/100/100" className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-teal-50 shadow-md" />
              <h2 className="text-xl font-bold">江上清风</h2>
              <p className="text-gray-400 text-sm mt-1">智慧等级：Lv.4 活跃之星</p>
            </div>
            <div className="mt-4 px-4 space-y-2">
              <MenuItem label="我的发布" count={12} />
              <MenuItem label="收藏动态" count={56} />
              <MenuItem label="浏览记录" count={128} />
              <div className="h-4"></div>
              <MenuItem label="社区设置" />
              <MenuItem label="关于我们" />
              <div className="h-8"></div>
              <button className="w-full p-4 bg-white text-red-500 font-semibold rounded-xl shadow-sm">退出登录</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case TabType.HOME: return 'WeComm 广场';
      case TabType.EXPLORE: return '发现话题';
      case TabType.AI: return 'AI 助手';
      case TabType.ME: return '个人中心';
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} title={getTitle()}>
      {renderContent()}

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-t-[32px] p-6 pb-12 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6">
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 text-sm font-medium">取消</button>
              <h3 className="font-bold text-lg">发布动态</h3>
              <button 
                onClick={handleCreatePost}
                disabled={!newPostContent.trim()}
                className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${newPostContent.trim() ? 'bg-teal-600 text-white shadow-lg' : 'bg-gray-100 text-gray-300'}`}
              >
                发布
              </button>
            </div>
            <textarea 
              autoFocus
              className="w-full h-40 bg-gray-50 rounded-2xl p-4 text-[15px] outline-none focus:ring-2 focus:ring-teal-100 border-none resize-none"
              placeholder="分享你身边的新鲜事..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
            <div className="flex gap-4 mt-4 overflow-x-auto py-2">
              <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200 text-gray-400 cursor-pointer hover:bg-teal-50 hover:border-teal-200 hover:text-teal-600 transition-colors">
                <Plus size={24} />
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

const MenuItem: React.FC<{ label: string; count?: number }> = ({ label, count }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-50 active:bg-gray-50 transition-colors cursor-pointer">
    <span className="font-medium text-gray-700 text-sm">{label}</span>
    <div className="flex items-center gap-1 text-gray-300">
      {count !== undefined && <span className="text-xs text-gray-400 mr-2">{count}</span>}
      <Search size={14} className="rotate-45" />
    </div>
  </div>
);

export default App;
