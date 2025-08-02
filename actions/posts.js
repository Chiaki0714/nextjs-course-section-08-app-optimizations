'use server';

import { redirect } from 'next/navigation';
import { storePost, updatePostLikeStatus } from '@/lib/posts';
import { uploadImage } from '@/lib/cloudinary';
import { revalidatePath } from 'next/cache';

function validatePost({ title, content, image }) {
  const errors = {};
  if (!title?.trim()) errors.title = 'Title is required.';
  if (!content?.trim()) errors.content = 'Content is required.';
  if (!image || image.size === 0) errors.image = 'Image is required.';
  return errors;
}

export async function createPost(prevState, formData) {
  const post = {
    title: formData.get('title'),
    image: formData.get('image'),
    content: formData.get('content'),
    userId: 1,
  };

  const errors = validatePost(post);
  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  try {
    const imageUrl = await uploadImage(post.image);

    await storePost({
      imageUrl,
      title: post.title,
      content: post.content,
      userId: post.userId,
    });
  } catch (err) {
    console.error('Post creation failed:', err);
    return { errors: { general: 'Failed to create post. Try again later.' } };
  }

  revalidatePath('/', 'layout');
  redirect('/feed');
}

export async function togglePostLikeStatus(postId) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath('/', 'layout');
}

// 'use server';

// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';

// import { storePost, updatePostLikeStatus } from '@/lib/posts';
// import { uploadImage } from '@/lib/cloudinary';

// export async function createPost(prevState, formData) {
//   const title = formData.get('title');
//   const image = formData.get('image');
//   const content = formData.get('content');

//   let errors = [];

//   if (!title || title.trim().length === 0) {
//     errors.push('Title is required.');
//   }

//   if (!content || content.trim().length === 0) {
//     errors.push('Content is required.');
//   }

//   if (!image || image.size === 0) {
//     errors.push('Image is required.');
//   }

//   if (errors.length > 0) {
//     return { errors };
//   }

//   let imageUrl;

//   try {
//     imageUrl = await uploadImage(image);
//   } catch (error) {
//     throw new Error(
//       'Image upload failed, post was not created. Please try again later.'
//     );
//   }

//   await storePost({
//     imageUrl: imageUrl,
//     title,
//     content,
//     userId: 1,
//   });

//   revalidatePath('/', 'layout');
//   redirect('/feed');
// }

// export async function togglePostLikeStatus(postId) {
//   await updatePostLikeStatus(postId, 2);
//   revalidatePath('/', 'layout');
// }
