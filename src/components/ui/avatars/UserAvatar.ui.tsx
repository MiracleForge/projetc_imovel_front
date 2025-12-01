import Image from "next/image";

interface UserAvatarProps {
  image?: string | null | undefined;
  name?: string | null | undefined;
  size?: number;
}

export default function UserAvatar({ image, name, size = 46 }: UserAvatarProps) {
  const seed = name?.trim() || "Guest";

  const avatarSrc = image ? image : name ? `https://api.dicebear.com/9.x/initials/png?seed=${encodeURIComponent(seed)}` : "/miscellaneous/user-avatar.svg";

  return (
    <Image
      src={avatarSrc}
      width={size}
      height={size}
      alt={`Avatar do usuário ${seed}`}
      className="rounded-full shrink-0 hover:opacity-80 object-cover"
      priority
    />
  );
}

