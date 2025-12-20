'use client'

import { useState } from 'react';
import incrementLike from '@/src/app/actions/incrementLike.actions';

interface LikeButtonProps {
  initialState: boolean;
}

export default function LikeButton({ initialState }: LikeButtonProps) {
  const [liked, setLiked] = useState(initialState);
  const [pressed, setPressed] = useState(false);

  const iconPath = liked
    ? '/miscellaneous/full-heart.svg'
    : '/miscellaneous/empty-heart.svg';

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();

    setLiked(prev => !prev);

    const ok = await incrementLike();

    if (!ok) setLiked(prev => !prev);
  }

  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className={`absolute top-1 right-1 bg-white/40 p-2 rounded-full transition-transform z-10 ${pressed ? 'scale-[1.5]' : ''}`}
      title="Favoritar"
      aria-pressed={liked}
      onClick={handleClick}
    >
      <img src={iconPath} width={12} height={12} className="size-3" />
    </button>
  );
}

