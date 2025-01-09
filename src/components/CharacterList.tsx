'use client';

import { useState } from 'react';
import { Character } from '@/lib/characters';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CharacterListProps {
  characters: Character[];
  onSelect?: (character: Character) => void;
}

export function CharacterList({ characters, onSelect }: CharacterListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="h-full overflow-auto">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {characters.map((character) => (
            <Link
              href={`/characters/${character.id}`}
              key={character.id}
              className={cn(
                'group relative rounded-lg overflow-hidden cursor-pointer transition-all',
                'bg-card hover:bg-card/80',
                'hover:ring-2 hover:ring-primary',
                selectedId === character.id ? 'ring-2 ring-primary' : ''
              )}
              onClick={(e) => {
                // Only prevent default if we're in selection mode
                if (onSelect) {
                  e.preventDefault();
                  setSelectedId(character.id);
                  onSelect(character);
                }
              }}
            >
              <div className="aspect-square relative">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-card-foreground">{character.name}</h3>
                  <span className={cn(
                    'px-2 py-1 text-xs rounded-full',
                    character.status === 'published' ? 'bg-green-500/20 text-green-400' :
                    character.status === 'draft' ? 'bg-gray-500/20 text-gray-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  )}>
                    {character.status.charAt(0).toUpperCase() + character.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {character.description}
                </p>
                <p className="text-xs text-muted-foreground/70">
                  Edited {new Date(character.editedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
