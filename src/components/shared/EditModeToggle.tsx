'use client';

import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { setEditableMode } from '@/redux/slices/pages/pagesSlice';

export default function EditModeToggle() {
  const dispatch = useAppDispatch();
  const isEditable = useAppSelector((state) => state.pages.isEditablePage);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <button onClick={() => dispatch(setEditableMode(!isEditable))} className={`fixed bottom-4 right-4 z-50 px-4 py-2 rounded-full shadow-lg transition-colors ${isEditable ? 'bg-[var(--success)] text-white hover:bg-[var(--success)]/80' : 'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]'}`}>
      {isEditable ? '✓ Edit Mode ON' : '✎ Edit Mode OFF'}
    </button>
  );
}
