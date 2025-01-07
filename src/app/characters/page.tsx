'use client';

import { useState } from 'react';
import { CharacterList } from '@/components/CharacterList';
import { characters } from '@/lib/characters';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function CharactersPage() {
  const [filter, setFilter] = useState<'all' | 'draft' | 'published' | 'under_review'>('all');

  const filteredCharacters = filter === 'all' 
    ? characters 
    : characters.filter(char => char.status === filter);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">AI 角色列表</h1>
        <Link href="/create">
          <Button className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            创建角色
          </Button>
        </Link>
      </div>

      <div className="flex gap-2">
        {(['all', 'draft', 'published', 'under_review'] as const).map((status) => (
          <Button
            key={status}
            variant={filter === status ? 'default' : 'secondary'}
            onClick={() => setFilter(status)}
            className="capitalize"
          >
            {status === 'all' ? '全部' : 
             status === 'draft' ? '草稿' :
             status === 'published' ? '已发布' : '审核中'}
          </Button>
        ))}
      </div>

      <CharacterList 
        characters={filteredCharacters}
        onSelect={(character) => {
          // Handle character selection - you can navigate to edit page or show details
          console.log('Selected character:', character.name);
        }}
      />
    </div>
  );
}
