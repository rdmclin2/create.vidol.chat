export interface Character {
  id: string;
  name: string;
  description: string;
  image: string;
  status: 'draft' | 'published' | 'under_review';
  editedAt: string;
}

export const characters: Character[] = [
  {
    id: '1',
    name: 'Elsa',
    description: 'Elsa, a delicate yet resilient young woman adorned with cascading ebony...',
    image: '/characters/elsa.png',
    status: 'draft',
    editedAt: '2024-12-24T21:10:00Z'
  },
  {
    id: '2',
    name: 'Luna',
    description: 'Luna Sparks - an unconventional mage whose wit is as sharp as her spellcasting...',
    image: '/characters/luna.png',
    status: 'draft',
    editedAt: '2024-12-22T11:05:00Z'
  }
];

export function getCharacterById(id: string): Character | undefined {
  return characters.find(char => char.id === id);
}

export function getCharactersByStatus(status: Character['status']): Character[] {
  return characters.filter(char => char.status === status);
}
