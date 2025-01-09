import React from 'react';
import Image from 'next/image';
import { Character } from '@/lib/characters';
import { cn } from '@/lib/utils';

export default function CharacterProfile({ character }: { character: Character }) {
  return (
    <div className="bg-card rounded-lg p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-card-foreground">{character.name}</h1>
          <div className={cn(
            'inline-block px-2 py-1 text-xs rounded-full mt-1',
            character.status === 'published' ? 'bg-green-500/20 text-green-400' :
            character.status === 'draft' ? 'bg-gray-500/20 text-gray-400' :
            'bg-yellow-500/20 text-yellow-400'
          )}>
            {character.status.charAt(0).toUpperCase() + character.status.slice(1)}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2 text-card-foreground">角色描述</h2>
          <p className="text-muted-foreground">{character.description}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2 text-card-foreground">最后编辑</h2>
          <p className="text-muted-foreground">
            {new Date(character.editedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
