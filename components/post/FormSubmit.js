'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      <button type='reset'>Reset</button>
      <button>{pending ? 'Creating Post...' : 'Create Post'}</button>
    </>
  );
}
