import React from 'react';
import CharacterForm from '@/components/CharacterForm';

export default function CreatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">创建 AI 角色</h1>
      <CharacterForm />
    </div>
  );
}
