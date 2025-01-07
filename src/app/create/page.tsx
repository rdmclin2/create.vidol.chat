'use client';

import React, { useState } from 'react';
import CharacterForm from '@/components/CharacterForm';
import ChatPreview from '@/components/ChatPreview';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
    <div className="container mx-auto p-4 min-h-screen bg-background">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-medium">Create Your Talkie</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/characters">Save</Link>
          </Button>
          <Button asChild>
            <Link href="/characters">Publish</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CharacterForm onUpdate={handleCharacterUpdate} />
        <div className="hidden lg:block">
          <ChatPreview {...characterInfo} />
        </div>
      </div>
    </div>
  );
}
