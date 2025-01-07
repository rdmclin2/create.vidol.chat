import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatPreviewProps {
  name: string;
  gender: string;
  intro: string;
  opening: string;
  persona: string;
  model: string;
}

export default function ChatPreview({
  name = '',
  gender = 'male',
  intro = '',
  opening = 'Hi! Nice to meet you.',
  persona = '',
  model = 'daily-chat',
}: ChatPreviewProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Reset chat when opening message changes
    setMessages([
      {
        role: 'assistant',
        content: opening || 'Hi! Nice to meet you.',
      },
    ]);
  }, [opening]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [
      ...prev,
      { role: 'user', content: input },
    ]);

    // Clear input
    setInput('');

    // Simulate AI response after a short delay
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'This is a preview mode. The actual responses will be generated based on the character\'s persona and chat model.' 
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex flex-col flex-1 p-4">
        <div className="flex-1 space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${
                message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {gender === 'male' ? '👨' : gender === 'female' ? '👩' : '🧑'}
                </div>
              )}
              <div
                className={`rounded-lg px-3 py-2 max-w-[80%] ${
                  message.role === 'assistant'
                    ? 'bg-muted'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                {message.content}
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  👤
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Please enter your nickname, bio, and opening line to start a conversation"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
