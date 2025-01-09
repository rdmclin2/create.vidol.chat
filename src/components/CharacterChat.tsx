'use client';

import React from 'react';
import { Character } from '@/lib/characters';
import Image from 'next/image';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { Send } from 'lucide-react';

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const formatTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export default function CharacterChat({ character }: { character: Character }) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 1,
      content: `你好！我是${character.name}。`,
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      content: newMessage,
      sender: 'user' as const,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // 模拟AI回复
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        content: '这是一个模拟的回复消息。实际应用中，这里会连接到AI服务。',
        sender: 'ai' as const,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-card rounded-lg">
      {/* 聊天记录 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-3 max-w-[80%]",
              message.sender === 'user' ? "ml-auto" : ""
            )}
          >
            {message.sender === 'ai' && (
              <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={character.image}
                  alt={character.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div
              className={cn(
                "rounded-lg p-3",
                message.sender === 'user'
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              <p className="text-sm">{message.content}</p>
              <div
                className={cn(
                  "text-xs mt-1",
                  message.sender === 'user'
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                )}
              >
                {formatTime(message.timestamp)}
              </div>
            </div>
            {message.sender === 'user' && (
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-primary flex-shrink-0">
                <div className="absolute inset-0 flex items-center justify-center text-primary-foreground text-sm font-medium">
                  你
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入框 */}
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="输入消息..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
