import React from 'react';
import CharacterChat from '@/components/CharacterChat';
import CharacterProfile from '@/components/CharacterProfile';
import { getCharacterById } from '@/lib/characters';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function CharacterPage({ params }: { params: { id: string } }) {
  const character = getCharacterById(params.id);

  if (!character) {
    notFound();
  }

  return (
    <div className="h-full overflow-auto">
      <div className="container mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link href="/characters">
              <ChevronLeft className="h-4 w-4" />
              返回角色列表
            </Link>
          </Button>
        </div>

        {/* 头部背景 */}
        <div className="relative h-64 w-full mb-8 rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 角色信息 */}
          <div className="lg:col-span-1">
            <CharacterProfile character={character} />
          </div>

          {/* 聊天界面 */}
          <div className="lg:col-span-2">
            <CharacterChat character={character} />
          </div>
        </div>
      </div>
    </div>
  );
}
