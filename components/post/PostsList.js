'use client';

import Image from 'next/image';
import { useOptimistic } from 'react';

import { formatDate } from '@/lib/format';
import LikeButton from '../ui/LikeButton';
import { togglePostLikeStatus } from '@/actions/posts';

function imageLoader({ src, width, quality }) {
  const q = quality || 75;
  const [urlStart, urlEnd] = src.split('upload/');
  return `${urlStart}upload/w_${width},q_${q}/${urlEnd}`;
}

function Post({ post, action }) {
  return (
    <article className='post'>
      <div className='post-image'>
        <Image
          src={post.image}
          alt={post.title}
          fill
          loader={imageLoader}
          // width={200}
          quality={50}
        />
      </div>
      <div className='post-content'>
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={action.bind(null, post.id)}
              className={post.isLiked ? 'liked' : ''}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function PostsList({ posts }) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    posts,
    (prevPosts, updatedPostId) => {
      const updatedPostIndex = prevPosts.findIndex(
        post => post.id === updatedPostId
      );

      if (updatedPostIndex === -1) {
        return prevPosts;
      }

      const updatedPost = { ...prevPosts[updatedPostIndex] };
      updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
      updatedPost.isLiked = !updatedPost.isLiked;
      const newPosts = [...prevPosts];
      newPosts[updatedPostIndex] = updatedPost;
      return newPosts;
    }
  );

  if (!optimisticPosts || optimisticPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updatePost(postId) {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  }

  return (
    <ul className='posts'>
      {optimisticPosts.map(post => (
        <li key={post.id}>
          <Post post={post} action={updatePost} />
        </li>
      ))}
    </ul>
  );
}
