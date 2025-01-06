'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';

export default function CharacterForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string>('');
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'avatar') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview URL
    const url = URL.createObjectURL(file);
    if (type === 'cover') {
      setCoverFile(file);
      setCoverPreview(url);
    } else {
      setAvatarFile(file);
      setAvatarPreview(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Add files to form data if they exist
      if (coverFile) formData.set('cover', coverFile);
      if (avatarFile) formData.set('avatar', avatarFile);

      const response = await fetch('/api/characters', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '创建失败');
      }

      toast({
        title: "成功",
        description: "角色创建成功",
      });

      // Redirect to character page or home
      router.push('/');
    } catch (error) {
      toast({
        title: "错误",
        description: error instanceof Error ? error.message : "创建失败",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">创建新角色</CardTitle>
          <p className="text-sm text-muted-foreground">
            创建一个新的 AI 角色，定制它的个性和能力
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 封面上传 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">角色封面</label>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              id="cover-upload"
              name="cover"
              onChange={(e) => handleFileChange(e, 'cover')}
            />
            <label
              htmlFor="cover-upload"
              className="flex items-center justify-center w-full h-48 rounded-lg border-2 border-dashed border-muted bg-muted/5 cursor-pointer hover:bg-muted/10 transition-colors relative overflow-hidden"
            >
              {coverPreview ? (
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                  <div className="mt-2">
                    <span className="text-sm text-primary">上传封面图片</span>
                  </div>
                </div>
              )}
            </label>
          </div>

          {/* 头像上传 */}
          <div className="space-y-2">
            <label className="text-sm font-medium">角色头像</label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                id="avatar-upload"
                name="avatar"
                onChange={(e) => handleFileChange(e, 'avatar')}
              />
              <label
                htmlFor="avatar-upload"
                className="w-24 h-24 rounded-full border-2 border-dashed border-muted bg-muted/5 flex items-center justify-center cursor-pointer hover:bg-muted/10 transition-colors relative overflow-hidden"
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-primary">上传头像</span>
                )}
              </label>
            </div>
          </div>

          {/* 名称 */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              角色名称
            </label>
            <Input
              id="name"
              name="name"
              placeholder="输入角色名称"
              className="bg-background"
              required
            />
          </div>

          {/* 描述 */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              角色描述
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="描述这个 AI 角色的特点和能力"
              rows={3}
              className="bg-background"
              required
            />
          </div>

          {/* 开场白 */}
          <div className="space-y-2">
            <label htmlFor="greeting" className="text-sm font-medium">
              开场白
            </label>
            <Textarea
              id="greeting"
              name="greeting"
              placeholder="设置角色的开场白"
              rows={2}
              className="bg-background"
              required
            />
          </div>

          {/* 系统 Prompt */}
          <div className="space-y-2">
            <label htmlFor="systemPrompt" className="text-sm font-medium">
              系统 Prompt
            </label>
            <Textarea
              id="systemPrompt"
              name="systemPrompt"
              placeholder="输入系统 Prompt，用于定义角色的行为和限制"
              rows={6}
              className="font-mono text-sm bg-background"
              required
            />
          </div>

          <div className="flex justify-end">
            <Button 
              type="submit"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? '创建中...' : '创建角色'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
