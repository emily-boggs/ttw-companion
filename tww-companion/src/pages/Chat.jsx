import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, ArrowLeft, Plus, Trash2 } from 'lucide-react';
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

  const sortedPosts = [...posts]
    .filter(p => sortBy === 'my-posts' ? p.isOwn : true)
    .sort((a, b) => {
      if (sortBy === 'popular') return b.hearts - a.hearts;
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
      p.id === postId ? { ...p, hearts: p.isHearted ? p.hearts - 1 : p.hearts + 1, isHearted: !p.isHearted } : p
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

  const handleDelete = (postId) => {
    setPosts(posts.filter(p => p.id !== postId));
    if (expandedPost === postId) setExpandedPost(null);
  };

  const handleHeartReply = (postId, replyId) => {
    setPosts(posts.map(p =>
      p.id === postId
        ? { ...p, replies: p.replies.map(r => r.id === replyId ? { ...r, hearts: r.isHearted ? r.hearts - 1 : r.hearts + 1, isHearted: !r.isHearted } : r) }
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
      <div className="min-h-screen px-5 pt-2 pb-24 md:pt-2 md:pb-8 md:px-8 lg:pt-2 lg:px-12 max-w-md md:max-w-none mx-auto relative">
        <div className="fixed inset-0 pointer-events-none -z-10" style={{ background: "radial-gradient(ellipse at 15% 0%, rgba(125,211,252,0.9) 0%, transparent 55%), radial-gradient(ellipse at 85% 10%, rgba(147,197,253,0.7) 0%, transparent 50%), radial-gradient(ellipse at 50% 40%, rgba(165,180,252,0.6) 0%, transparent 50%), radial-gradient(ellipse at 10% 70%, rgba(196,181,253,0.7) 0%, transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(167,139,250,0.7) 0%, transparent 45%), #e0e7ff" }} />
        <button
          onClick={() => setExpandedPost(null)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/30 backdrop-blur-lg border border-white/40 shadow-sm active:scale-95 transition-transform mb-6"
        >
          <ArrowLeft className="w-4 h-4 text-text" />
          <span className="text-text text-sm font-medium">Back</span>
        </button>

        {/* Original post */}
        <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl p-5 mb-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{post.avatar}</span>
            <span className="font-semibold text-sm">{post.author}</span>
            {post.dpo && <span className="text-xs font-medium text-text bg-white rounded-full px-2.5 py-0.5">DPO {post.dpo}</span>}
            <span className="text-xs text-text-muted ml-auto">{post.timestamp}</span>
          </div>
          <p className="text-base leading-relaxed mb-3">{post.content}</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleHeart(post.id)}
              className="flex items-center gap-1.5 active:scale-90 transition-transform min-h-[44px]"
            >
              <Heart className="w-5 h-5" fill={post.isHearted ? '#ef4444' : 'none'} stroke={post.isHearted ? '#ef4444' : 'currentColor'} />
              <span className="text-xs font-semibold text-text">{post.hearts}</span>
            </button>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-5 h-5 text-text-muted" />
              <span className="text-xs font-semibold text-text">{post.replies.length}</span>
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
                className="flex items-center gap-1.5 active:scale-90 transition-transform min-h-[44px]"
              >
                <Heart className="w-4 h-4" fill={reply.isHearted ? '#ef4444' : 'none'} stroke={reply.isHearted ? '#ef4444' : 'currentColor'} />
                <span className="text-xs font-semibold text-text">{reply.hearts}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Reply input */}
        <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl p-3 flex gap-2 items-center">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a supportive reply..."
            rows={2}
            className="flex-1 px-4 py-3 rounded-xl bg-white text-sm focus:outline-none resize-none"
          />
          <button
            onClick={() => handleReply(post.id)}
            disabled={!replyContent.trim()}
            className="p-3 bg-white rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center disabled:opacity-40 active:scale-95 transition-all"
          >
            <Send className="w-5 h-5 text-indigo-500" />
          </button>
        </div>
      </div>
    );
  }

  // Feed view
  return (
    <div className="min-h-screen px-5 pt-2 pb-24 md:pt-2 md:pb-8 md:px-8 lg:pt-2 lg:px-12 max-w-md md:max-w-none mx-auto relative">
      <div className="fixed inset-0 pointer-events-none -z-10" style={{ background: "radial-gradient(ellipse at 15% 0%, rgba(125,211,252,0.9) 0%, transparent 55%), radial-gradient(ellipse at 85% 10%, rgba(147,197,253,0.7) 0%, transparent 50%), radial-gradient(ellipse at 50% 40%, rgba(165,180,252,0.6) 0%, transparent 50%), radial-gradient(ellipse at 10% 70%, rgba(196,181,253,0.7) 0%, transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(167,139,250,0.7) 0%, transparent 45%), #e0e7ff" }} />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl md:text-3xl font-bold">Community</h1>
        <button
          onClick={() => setShowNewPost(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white shadow-sm border border-gray-100 active:scale-95 transition-transform"
        >
          <Plus className="w-4 h-4 text-indigo-500" />
          <span className="text-sm font-semibold text-indigo-600">Add Post</span>
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
                ? 'bg-white text-gray-900 shadow-sm'
                : 'bg-white/30 backdrop-blur-sm border border-white/40 text-text-muted'
            }`}
          >
            {option === 'recent' && 'Recent'}
            {option === 'popular' && 'Popular'}
            {option === 'my-posts' && 'My Posts'}
          </button>
        ))}
      </div>

      {/* New post drawer (mobile) / modal (desktop) */}
      {showNewPost && (
        <>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]" onClick={() => { setShowNewPost(false); setNewPostContent(''); }} />
          <div className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full md:rounded-2xl bg-white rounded-t-3xl shadow-2xl z-[70] px-5 pt-4 pb-10 md:px-8 md:pt-6 md:pb-8 animate-slide-up md:animate-none">
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4 md:hidden" />
            <h3 className="font-semibold text-base md:text-lg mb-4">Share with the community</h3>
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="What's on your mind? Share a thought, question, or encouragement..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 resize-none mb-4"
              autoFocus
            />
            <button
              onClick={handleNewPost}
              disabled={!newPostContent.trim()}
              className="w-full py-4 bg-cta text-white font-semibold rounded-full text-base disabled:opacity-40 active:scale-[0.98] transition-all min-h-[48px]"
            >
              Post
            </button>
            <button
              onClick={() => { setShowNewPost(false); setNewPostContent(''); }}
              className="w-full py-3 text-gray-900 font-medium text-sm mt-2 active:scale-[0.98] transition-all"
            >
              Cancel
            </button>
          </div>
        </>
      )}

      {/* Posts Feed */}
      <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
        {sortedPosts.map((post) => (
          <div
            key={post.id}
            className="w-full text-left bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl p-5 shadow-sm"
          >
            <div onClick={() => setExpandedPost(post.id)} className="cursor-pointer active:opacity-80 transition-opacity">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{post.avatar}</span>
                <span className="font-semibold text-sm">{post.author}</span>
                {post.dpo && <span className="text-xs font-medium text-text bg-white rounded-full px-2.5 py-0.5">DPO {post.dpo}</span>}
                <span className="text-xs text-text-muted ml-auto">{post.timestamp}</span>
              </div>
              <p className="text-sm leading-relaxed mb-3 line-clamp-3">{post.content}</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleHeart(post.id)}
                className="flex items-center gap-1.5 active:scale-90 transition-transform"
              >
                <Heart className="w-5 h-5" fill={post.isHearted ? '#ef4444' : 'none'} stroke={post.isHearted ? '#ef4444' : 'currentColor'} />
                <span className="text-xs font-semibold text-text">{post.hearts}</span>
              </button>
              <button
                onClick={() => setExpandedPost(post.id)}
                className="flex items-center gap-1.5 active:scale-90 transition-transform"
              >
                <MessageCircle className="w-5 h-5 text-text-muted" />
                <span className="text-xs font-semibold text-text">{post.replies.length}</span>
              </button>
              {post.isOwn && (
                <button
                  onClick={() => handleDelete(post.id)}
                  className="ml-auto flex items-center gap-1.5 active:scale-90 transition-transform"
                >
                  <Trash2 className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
