'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';

export default function CharacterForm() {
  return (
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
          <div className="flex items-center justify-center w-full h-48 rounded-lg border-2 border-dashed border-muted bg-muted/5">
            <div className="text-center">
              <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
              <div className="mt-2">
                <input type="file" className="hidden" accept="image/*" id="cover-upload" />
                <label
                  htmlFor="cover-upload"
                  className="text-sm text-primary cursor-pointer hover:text-primary/80"
                >
                  上传封面图片
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 头像上传 */}
        <div className="space-y-2">
          <label className="text-sm font-medium">角色头像</label>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-muted bg-muted/5 flex items-center justify-center">
              <input type="file" className="hidden" accept="image/*" id="avatar-upload" />
              <label
                htmlFor="avatar-upload"
                className="text-sm text-primary cursor-pointer hover:text-primary/80"
              >
                上传头像
              </label>
            </div>
          </div>
        </div>

        {/* 名称 */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            角色名称
          </label>
          <Input
            id="name"
            placeholder="输入角色名称"
            className="bg-background"
          />
        </div>

        {/* 描述 */}
        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            角色描述
          </label>
          <Textarea
            id="description"
            placeholder="描述这个 AI 角色的特点和能力"
            rows={3}
            className="bg-background"
          />
        </div>

        {/* 开场白 */}
        <div className="space-y-2">
          <label htmlFor="greeting" className="text-sm font-medium">
            开场白
          </label>
          <Textarea
            id="greeting"
            placeholder="设置角色的开场白"
            rows={2}
            className="bg-background"
          />
        </div>

        {/* 系统 Prompt */}
        <div className="space-y-2">
          <label htmlFor="systemPrompt" className="text-sm font-medium">
            系统 Prompt
          </label>
          <Textarea
            id="systemPrompt"
            placeholder="输入系统 Prompt，用于定义角色的行为和限制"
            rows={6}
            className="font-mono text-sm bg-background"
          />
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            size="lg"
          >
            创建角色
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
