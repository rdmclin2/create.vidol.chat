import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatPreviewProps {
  characterName: string;
  avatarUrl?: string;
  greeting?: string;
  systemPrompt?: string;
}

export default function ChatPreview({
  characterName,
  avatarUrl,
  greeting = '你好！很高兴见到你。',
  systemPrompt,
}: ChatPreviewProps) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!greeting) return;
    
    // Reset chat when character info changes
    setMessages([
      {
        role: 'assistant',
        content: greeting,
      },
    ]);
  }, [greeting]);

  const scrollToBottom = React.useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages.length, scrollToBottom]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { role: 'user', content: input },
      // Simulate AI response
      { 
        role: 'assistant', 
        content: '这是一条模拟的回复消息。在实际对话中，这里会是基于你的系统 Prompt 生成的回复。' 
      },
    ];

    setMessages(newMessages);
    setInput('');
  };

  return (
    <Card className="w-full h-[calc(100vh-8rem)] flex flex-col">
      <CardHeader>
        <CardTitle className="text-xl">对话预览</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <Avatar>
                      <AvatarImage src={avatarUrl} />
                      <AvatarFallback>{characterName ? characterName[0] : '?'}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="mt-4 flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入消息..."
            className="min-h-[80px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            onClick={handleSend}
            className="px-3"
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
