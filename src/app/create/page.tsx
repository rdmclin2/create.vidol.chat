'use client';

import React, { useState } from 'react';
import CharacterForm from '@/components/CharacterForm';
import ChatPreview from '@/components/ChatPreview';

export default function CreatePage() {
  const [characterInfo, setCharacterInfo] = useState({
    name: '',
    avatarUrl: '',
    greeting: '',
    systemPrompt: '',
  });

  const handleCharacterUpdate = (info: typeof characterInfo) => {
    setCharacterInfo(info);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">创建 AI 角色</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CharacterForm onUpdate={handleCharacterUpdate} />
        <div className="hidden lg:block">
          <ChatPreview {...characterInfo} />
        </div>
      </div>
    </div>
  );
}
