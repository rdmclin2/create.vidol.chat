import React from 'react';
import CharacterChat from '@/components/CharacterChat';
import CharacterProfile from '@/components/CharacterProfile';
import { getCharacterById } from '@/lib/characters';
import { notFound } from 'next/navigation';

// 这里模拟从数据库获取角色数据
// const getCharacter = (id: string) => {
//   return {
//     id,
//     name: '智慧导师',
//     description: '一个富有智慧和耐心的AI导师，擅长解答各类问题。',
//     emoji: '🧑‍🏫',
//     greeting: '你好！我是你的智慧导师。有什么我可以帮助你的吗？',
//     systemPrompt: '你是一个智慧导师，擅长以通俗易懂的方式解答各种问题。你的回答应该简洁明了，同时富有启发性。',
//   };
// };

export default function CharacterPage({ params }: { params: { id: string } }) {
  const character = getCharacterById(params.id);

  if (!character) {
    notFound();
  }

  return (
    <div className="h-full overflow-auto">
      <div className="container mx-auto px-4 py-8">
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
