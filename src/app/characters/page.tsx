import React from 'react';
import CharacterGrid from '@/components/CharacterGrid';
import Pagination from '@/components/Pagination';

export default function CharactersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI 角色列表</h1>
      <CharacterGrid />
      <div className="mt-8">
        <Pagination />
      </div>
    </div>
  );
}
