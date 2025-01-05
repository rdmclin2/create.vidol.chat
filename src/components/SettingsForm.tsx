'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Avatar from './Avatar';

export default function SettingsForm() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* 用户信息设置 */}
      <Card className="border border-border/50 bg-gradient-to-b from-background to-background/80">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">个人信息</CardTitle>
          <p className="text-sm text-muted-foreground">
            管理你的个人资料和偏好设置
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">头像</label>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur" />
                <Avatar emoji="👤" size="lg" />
              </div>
              <Button 
                variant="outline" 
                className="relative group bg-muted/5"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-10 blur group-hover:opacity-20 transition" />
                <span className="relative">更换头像</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">用户名</label>
            <Input
              id="username"
              placeholder="输入用户名"
              className="bg-muted/5"
            />
          </div>
        </CardContent>
      </Card>

      {/* 网站设置 */}
      <Card className="border border-border/50 bg-gradient-to-b from-background to-background/80">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">网站设置</CardTitle>
          <p className="text-sm text-muted-foreground">
            自定义网站的显示和行为
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="language" className="text-sm font-medium">语言</label>
            <Select>
              <SelectTrigger className="bg-muted/5">
                <SelectValue placeholder="选择语言" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zh">中文</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="theme" className="text-sm font-medium">主题</label>
            <Select>
              <SelectTrigger className="bg-muted/5">
                <SelectValue placeholder="选择主题" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">浅色</SelectItem>
                <SelectItem value="dark">深色</SelectItem>
                <SelectItem value="system">跟随系统</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end">
            <Button 
              type="submit"
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-20 blur group-hover:opacity-30 transition" />
              <span className="relative">保存设置</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
