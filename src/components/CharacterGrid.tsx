import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Avatar from './Avatar';

// 示例数据
const characters = [
  {
    id: 1,
    name: '智慧导师',
    description: '一个富有智慧和耐心的AI导师，擅长解答各类问题。',
    emoji: '🧑‍🏫',
  },
  {
    id: 2,
    name: '创意助手',
    description: '激发灵感，帮助你进行创意写作和艺术创作。',
    emoji: '🎨',
  },
  {
    id: 3,
    name: '心理咨询师',
    description: '提供温暖的倾听和专业的心理支持。',
    emoji: '🧠',
  },
  // ... 更多角色
];

export default function CharacterGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {characters.map((character) => (
        <Link 
          key={character.id} 
          href={`/characters/${character.id}`}
          className="block transition-all duration-300 hover:-translate-y-1"
        >
          <Card className="overflow-hidden border border-border/50 dark:border-border/50 bg-gradient-to-b from-background to-background/80 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="relative h-32 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5">
              <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
            </CardHeader>
            <CardContent className="pt-6 -mt-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur" />
                  <Avatar emoji={character.emoji} size="md" />
                </div>
                <div>
                  <h3 className="font-semibold tracking-tight">{character.name}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{character.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
