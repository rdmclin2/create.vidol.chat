import React from 'react';
import SettingsForm from '@/components/SettingsForm';

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">设置</h1>
      <SettingsForm />
    </div>
  );
}
