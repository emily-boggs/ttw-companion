import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, ArrowLeft, Plus } from 'lucide-react';
import { seedPosts } from '../data/chatSeedData';

const STORAGE_KEY = 'tww-chat-posts';
const SORT_OPTIONS = ['recent', 'popular', 'my-posts'];

export default function Chat() {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : seedPosts;
  });
  const [sortBy, setSortBy] = useState('recent');
  const [expandedPost, setExpandedPost] = useState(null);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === 'popular') return b.hearts - a.hearts;
    if (sortBy === 'my-posts') return (b.isOwn ? 1 : 0) - (a.isOwn ? 1 : 0);
    return 0; // recent is default order
  });

  const handleNewPost = () => {
    if (!newPostContent.trim()) return;
    const newPost = {
      id: `user-${Date.now()}`,
      author: 'you',
      avatar: '💜',
      dpo: null,
      content: newPostContent.trim(),
      timestamp: 'Just now',
      hearts: 0,
      replies: [],
      isOwn: true,
    };
    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setShowNewPost(false);
  };

  const handleHeart = (postId) => {
    setPosts(posts.map(p =>
      p.id === postId ? { ...p, hearts: p.hearts + 1 } : p
    ));
  };

  const handleReply = (postId) => {
    if (!replyContent.trim()) return;
    const newReply = {
      id: `reply-${Date.now()}`,
      author: 'you',
      avatar: '💜',
      content: replyContent.trim(),
      timestamp: 'Just now',
      hearts: 0,
      isOwn: true,
    };
    setPosts(posts.map(p =>
      p.id === postId ? { ...p, replies: [...p.replies, newReply] } : p
    ));
    setReplyContent('');
  };

  const handleHeartReply = (postId, replyId) => {
    setPosts(posts.map(p =>
      p.id === postId
        ? { ...p, replies: p.replies.map(r => r.id === replyId ? { ...r, hearts: r.hearts + 1 } : r) }
        : p
    ));
  };

  // Thread view
  if (expandedPost) {
    const post = posts.find(p => p.id === expandedPost);
    if (!post) {
      setExpandedPost(null);
      return null;
    }

    return (
      <div className="min-h-screen px-5 py-6 pb-24 md:pb-8 md:px-8 lg:px-12 max-w-md md:max-w-2xl mx-auto relative">
        <div className="fixed inset-0 pointer-events-none -z-10" style={{ background: "radial-gradient(ellipse at 15% 0%, rgba(125,211,252,0.9) 0%, transparent 55%), radial-gradient(ellipse at 85% 10%, rgba(147,197,253,0.7) 0%, transparent 50%), radial-gradient(ellipse at 50% 40%, rgba(165,180,252,0.6) 0%, transparent 50%), radial-gradient(ellipse at 10% 70%, rgba(196,181,253,0.7) 0%, transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(167,139,250,0.7) 0%, transparent 45%), #e0e7ff" }} />
        <button
          onClick={() => setExpandedPost(null)}
          className="flex items-center gap-2 text-text-muted text-sm mb-6 active:opacity-70 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to feed
        </button>

        {/* Original post */}
        <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-5 mb-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{post.avatar}</span>
            <span className="font-semibold text-sm">{post.author}</span>
            {post.dpo && <span className="text-xs text-text-muted bg-white/40 px-2 py-0.5 rounded-full">DPO {post.dpo}</span>}
            <span className="text-xs text-text-muted ml-auto">{post.timestamp}</span>
          </div>
          <p className="text-base leading-relaxed mb-3">{post.content}</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleHeart(post.id)}
              className="flex items-center gap-1.5 text-text-muted hover:text-pink-500 active:scale-95 transition-all min-h-[44px]"
            >
              <Heart className="w-4 h-4" fill={post.hearts > 0 ? 'currentColor' : 'none'} />
              <span className="text-xs">{post.hearts}</span>
            </button>
            <div className="flex items-center gap-1.5 text-text-muted">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{post.replies.length}</span>
            </div>
          </div>
        </div>

        {/* Replies */}
        <div className="space-y-3 mb-4">
          {post.replies.map((reply) => (
            <div key={reply.id} className="bg-white/30 backdrop-blur-sm rounded-2xl border border-white/40 p-4 ml-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm">{reply.avatar}</span>
                <span className="font-semibold text-xs">{reply.author}</span>
                <span className="text-xs text-text-muted ml-auto">{reply.timestamp}</span>
              </div>
              <p className="text-sm leading-relaxed mb-2">{reply.content}</p>
              <button
                onClick={() => handleHeartReply(post.id, reply.id)}
                className="flex items-center gap-1 text-text-muted hover:text-pink-500 active:scale-95 transition-all min-h-[44px]"
              >
                <Heart className="w-3.5 h-3.5" fill={reply.hearts > 0 ? 'currentColor' : 'none'} />
                <span className="text-xs">{reply.hearts}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Reply input */}
        <div className="flex gap-2 items-end">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a supportive reply..."
            rows={2}
            className="flex-1 px-4 py-3 rounded-2xl border border-white/50 bg-white/40 backdrop-blur-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          />
          <button
            onClick={() => handleReply(post.id)}
            disabled={!replyContent.trim()}
            className="p-3 bg-cta text-white rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center disabled:opacity-40 active:scale-95 transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Feed view
  return (
    <div className="min-h-screen px-5 py-6 pb-24 md:pb-8 md:px-8 lg:px-12 max-w-md md:max-w-2xl mx-auto relative">
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ background: "radial-gradient(ellipse at 15% 0%, rgba(125,211,252,0.9) 0%, transparent 55%), radial-gradient(ellipse at 85% 10%, rgba(147,197,253,0.7) 0%, transparent 50%), radial-gradient(ellipse at 50% 40%, rgba(165,180,252,0.6) 0%, transparent 50%), radial-gradient(ellipse at 10% 70%, rgba(196,181,253,0.7) 0%, transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(167,139,250,0.7) 0%, transparent 45%), #e0e7ff" }} />
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold">Community</h1>
        <button
          onClick={() => setShowNewPost(true)}
          className="p-2.5 bg-cta text-white rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95 transition-all"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Sort tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto">
        {SORT_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => setSortBy(option)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap min-h-[44px] transition-all ${
              sortBy === option
                ? 'bg-cta text-white'
                : 'bg-white/30 backdrop-blur-sm text-text-muted'
            }`}
          >
            {option === 'recent' && 'Recent'}
            {option === 'popular' && '❤️ Popular'}
            {option === 'my-posts' && 'My Posts'}
          </button>
        ))}
      </div>

      {/* New post modal */}
      {showNewPost && (
        <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-5 mb-5 shadow-md">
          <h3 className="font-semibold text-sm mb-3">Share with the community</h3>
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="What's on your mind? Share a thought, question, or encouragement..."
            rows={4}
            className="w-full px-4 py-3 rounded-2xl border border-white/50 bg-white/40 backdrop-blur-md/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none mb-3"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleNewPost}
              disabled={!newPostContent.trim()}
              className="flex-1 py-3 bg-cta text-white font-semibold rounded-full text-sm disabled:opacity-40 active:scale-[0.98] transition-all min-h-[44px]"
            >
              Post
            </button>
            <button
              onClick={() => { setShowNewPost(false); setNewPostContent(''); }}
              className="px-6 py-3 bg-white/30 backdrop-blur-sm text-text-muted font-medium rounded-full text-sm active:scale-[0.98] transition-all min-h-[44px]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Posts Feed */}
      <div className="space-y-4">
        {sortedPosts.map((post) => (
          <button
            key={post.id}
            onClick={() => setExpandedPost(post.id)}
            className="w-full text-left bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-5 active:scale-[0.98] transition-all shadow-sm"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{post.avatar}</span>
              <span className="font-semibold text-sm">{post.author}</span>
              {post.dpo && <span className="text-xs text-text-muted bg-white/40 px-2 py-0.5 rounded-full">DPO {post.dpo}</span>}
              <span className="text-xs text-text-muted ml-auto">{post.timestamp}</span>
            </div>
            <p className="text-sm leading-relaxed mb-3 line-clamp-3">{post.content}</p>
            <div className="flex items-center gap-4 text-text-muted">
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4" fill={post.hearts > 0 ? 'currentColor' : 'none'} />
                <span className="text-xs">{post.hearts}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs">{post.replies.length} {post.replies.length === 1 ? 'reply' : 'replies'}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
