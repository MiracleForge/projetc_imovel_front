'use client'

import incrementLike from '@/src/app/actions/incrementLike.actions'
import { useState } from 'react'

export default function LikeButton({ initialState }: { initialState: boolean }) {
  const [liked, setLiked] = useState(initialState);
  const [pressed, setPressed] = useState(false);

  const iconPath = liked
    ? "/miscellaneous/full-heart.svg"
    : "/miscellaneous/empty-heart.svg";

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();

    // --- 1) aplicar mudança instantânea (UX otimista)
    setLiked(prev => !prev);

    // --- 2) chamar server action
    const ok = await incrementLike();

    // --- 3) se falhar, reverter
    if (!ok) {
      setLiked(prev => !prev);
    }
  }

  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      className={`
        absolute top-1 right-1 bg-white/40 p-2 rounded-full
        transition-transform z-10
        ${pressed ? "scale-[1.5]" : ""}
      `}
      title="Favoritar"
      onClick={handleClick}
    >
      <img src={iconPath} width={12} height={12} className="size-5" />
    </button>
  );
}

