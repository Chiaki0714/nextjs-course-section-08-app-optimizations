import { createPost } from '@/actions/posts';
import PostForm from '@/components/post/PostForm';

export default function NewPostPage() {
  return (
    <>
      <h1>Create a new post</h1>
      <PostForm action={createPost} />
    </>
  );
}
