interface AvatarProps {
  emoji?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-lg',
  md: 'w-16 h-16 text-3xl',
  lg: 'w-20 h-20 text-4xl',
};

export default function Avatar({ emoji = '🧑‍🏫', size = 'md', className = '' }: AvatarProps) {
  return (
    <div
      className={`${sizeClasses[size]} flex items-center justify-center bg-gray-100 rounded-full ${className}`}
    >
      {emoji}
    </div>
  );
}
