'use client';

import React, { useState } from 'react';
import CharacterForm from '@/components/CharacterForm';
import ChatPreview from '@/components/ChatPreview';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function CreatePage() {
  const [characterInfo, setCharacterInfo] = useState({
    name: '',
    gender: '',
    intro: '',
    opening: '',
    persona: '',
    model: 'daily-chat',
  });

  const handleCharacterUpdate = (info: typeof characterInfo) => {
    setCharacterInfo(info);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="container mx-auto p-4 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild className="h-8 w-8">
              <Link href="/characters">
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-lg font-medium">创建你的角色</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/characters">保存</Link>
            </Button>
            <Button asChild>
              <Link href="/characters">发布</Link>
            </Button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <CharacterForm onUpdate={handleCharacterUpdate} />
          <div className="hidden lg:block">
            <ChatPreview {...characterInfo} />
          </div>
        </div>
      </div>
    </div>
  );
}
