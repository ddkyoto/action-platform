'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import axios from 'axios';
import { formatDistanceToNow } from '@/lib/utils';

interface Post {
  id: string;
  content: string;
  category?: string;
  location?: string;
  createdAt: string;
  author: { id: string; name: string; avatarColor: string };
  likes: any[];
  comments: any[];
}

export default function FeedPage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handlePostSubmit() {
    if (!newPost.trim()) return;

    try {
      const response = await axios.post('/api/posts', {
        content: newPost,
      });
      setPosts([response.data, ...posts]);
      setNewPost('');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  }

  async function handleLike(postId: string) {
    try {
      await axios.post(`/api/posts/${postId}/like`);
      fetchPosts();
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-emerald-700">
            ✓ Action
          </Link>
          <nav className="flex gap-4">
            <Link href="/petitions" className="text-gray-600 hover:text-gray-900">
              Petitions
            </Link>
            <Link href="/feed" className="text-emerald-600 font-semibold">
              Feed
            </Link>
            <Link href="/events" className="text-gray-600 hover:text-gray-900">
              Events
            </Link>
            <Link href="/profile" className="btn btn-secondary">
              Profile
            </Link>
          </nav>
        </div>
      </header>

      <section className="max-w-2xl mx-auto py-6 px-4">
        {/* New Post */}
        {session && (
          <div className="card mb-6">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's happening?!"
              className="textarea mb-4"
              rows={3}
            />
            <button
              onClick={handlePostSubmit}
              disabled={!newPost.trim()}
              className="btn btn-primary w-full"
            >
              Post
            </button>
          </div>
        )}

        {/* Posts Feed */}
        {loading ? (
          <div className="text-center text-gray-600">Loading feed...</div>
        ) : posts.length === 0 ? (
          <div className="card text-center text-gray-600">
            <p>No posts yet. Start a conversation!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="card">
                <div className="flex gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex-shrink-0"
                    style={{ backgroundColor: post.author.avatarColor }}
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <Link
                        href={`/profile/${post.author.id}`}
                        className="font-semibold text-gray-900 hover:underline"
                      >
                        {post.author.name}
                      </Link>
                      <span className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(post.createdAt))}
                      </span>
                    </div>
                    <p className="text-gray-900 mt-2">{post.content}</p>
                    <div className="flex gap-4 mt-4 text-gray-600 text-sm">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="hover:text-red-600 flex items-center gap-1"
                      >
                        ❤️ {post.likes.length}
                      </button>
                      <span className="flex items-center gap-1">
                        💬 {post.comments.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
