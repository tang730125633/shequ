
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Sparkles } from 'lucide-react';
import { Post } from '../types';
import { summarizePost } from '../services/geminiService';

interface PostCardProps {
  post: Post;
  onLike: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleAIAction = async () => {
    if (summary) {
      setSummary(null);
      return;
    }
    setIsSummarizing(true);
    const result = await summarizePost(post.content);
    setSummary(result);
    setIsSummarizing(false);
  };

  return (
    <div className="bg-white mx-3 my-2 rounded-2xl p-4 shadow-sm border border-gray-50 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center gap-3 mb-3">
        <img src={post.userAvatar} alt={post.userName} className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-50" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-sm">{post.userName}</h3>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-teal-50 text-teal-600 border border-teal-100">
              {post.category}
            </span>
          </div>
          <p className="text-[11px] text-gray-400">{post.createdAt}</p>
        </div>
      </div>

      <p className="text-gray-800 text-[14px] leading-relaxed mb-3 whitespace-pre-wrap">
        {post.content}
      </p>

      {post.images && post.images.length > 0 && (
        <div className="rounded-xl overflow-hidden mb-3">
          <img src={post.images[0]} alt="Post" className="w-full h-48 object-cover" />
        </div>
      )}

      {/* AI Summary Box */}
      {summary && (
        <div className="bg-teal-50/50 rounded-lg p-3 mb-3 border border-teal-100/50 flex items-start gap-2">
          <Sparkles size={14} className="text-teal-600 mt-0.5" />
          <p className="text-[12px] text-teal-800 font-medium leading-tight">
            AI 摘要: {summary}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-gray-50">
        <div className="flex items-center gap-5">
          <button 
            onClick={() => onLike(post.id)}
            className={`flex items-center gap-1.5 transition-colors ${post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
          >
            <Heart size={18} fill={post.isLiked ? 'currentColor' : 'none'} />
            <span className="text-xs font-medium">{post.likes}</span>
          </button>
          <button className="flex items-center gap-1.5 text-gray-500 hover:text-teal-600 transition-colors">
            <MessageCircle size={18} />
            <span className="text-xs font-medium">{post.comments.length}</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleAIAction}
            disabled={isSummarizing}
            className={`p-1.5 rounded-full transition-all ${summary ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-400 hover:bg-teal-100 hover:text-teal-600'}`}
          >
            {isSummarizing ? (
               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Sparkles size={16} />
            )}
          </button>
          <button className="p-1.5 rounded-full bg-gray-100 text-gray-400 hover:bg-teal-100 hover:text-teal-600 transition-colors">
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
