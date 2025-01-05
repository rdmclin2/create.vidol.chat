import React from 'react';
import Avatar from './Avatar';

interface Character {
  id: string;
  name: string;
  description: string;
  emoji: string;
  greeting: string;
  systemPrompt: string;
}

export default function CharacterProfile({ character }: { character: Character }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4 mb-6">
        <Avatar emoji={character.emoji} size="lg" />
        <div>
          <h1 className="text-2xl font-bold">{character.name}</h1>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">角色描述</h2>
          <p className="text-gray-600">{character.description}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">开场白</h2>
          <p className="text-gray-600">{character.greeting}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">系统 Prompt</h2>
          <pre className="bg-gray-50 p-4 rounded-md text-sm font-mono whitespace-pre-wrap">
            {character.systemPrompt}
          </pre>
        </div>
      </div>
    </div>
  );
}
