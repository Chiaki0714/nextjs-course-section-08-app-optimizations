'use client';

import FormSubmit from '@/components/post/FormSubmit';
import { useActionState } from 'react';

export default function PostForm({ action }) {
  const [state, formAction] = useActionState(action, { errors: {} });

  return (
    <form action={formAction}>
      <p className='form-control'>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' name='title' />
        {state.errors?.title && (
          <span className='error-message'>{state.errors.title}</span>
        )}
      </p>

      <p className='form-control'>
        <label htmlFor='image'>Image</label>
        <input
          type='file'
          accept='image/png, image/jpeg'
          id='image'
          name='image'
        />
        {state.errors?.image && (
          <span className='error-message'>{state.errors.image}</span>
        )}
      </p>

      <p className='form-control'>
        <label htmlFor='content'>Content</label>
        <textarea id='content' name='content' rows='5' />
        {state.errors?.content && (
          <span className='error-message'>{state.errors.content}</span>
        )}
      </p>

      <p className='form-actions'>
        <FormSubmit />
      </p>

      {state.errors?.general && (
        <div className='form-errors'>
          <p>{state.errors.general}</p>
        </div>
      )}
    </form>
  );
}

// 'use client';

// import FormSubmit from '@/components/post/FormSubmit';
// import { useActionState } from 'react';

// export default function PostForm({ action }) {
//   const [state, formAction] = useActionState(action, {});

//   return (
//     <>
//       <h1>Create a new post</h1>
//       <form action={formAction}>
//         <p className='form-control'>
//           <label htmlFor='title'>Title</label>
//           <input type='text' id='title' name='title' />
//         </p>
//         <p className='form-control'>
//           <label htmlFor='image'>Image</label>
//           <input
//             type='file'
//             accept='image/png, image/jpeg'
//             id='image'
//             name='image'
//           />
//         </p>
//         <p className='form-control'>
//           <label htmlFor='content'>Content</label>
//           <textarea id='content' name='content' rows='5' />
//         </p>
//         <p className='form-actions'>
//           <FormSubmit />
//         </p>
//         {state.errors && (
//           <ul className='form-errors'>
//             {state.errors.map(error => (
//               <li key={error}>{error}</li>
//             ))}
//           </ul>
//         )}
//       </form>
//     </>
//   );
// }
