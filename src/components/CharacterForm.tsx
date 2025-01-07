'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';

export default function CharacterForm({ 
  onUpdate 
}: { 
  onUpdate?: (info: { 
    name: string;
    gender: string;
    intro: string;
    opening: string;
    persona: string;
    model: string;
  }) => void 
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    intro: '',
    opening: '',
    persona: '',
    model: 'daily-chat',
  });

  // Update preview when form data changes
  useEffect(() => {
    if (!onUpdate) return;
    
    const timeoutId = setTimeout(() => {
      onUpdate({
        ...formData,
      });
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [formData, onUpdate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview URL
    const url = URL.createObjectURL(file);
    setImage(file);
    setImagePreview(url);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // Add files to form data if they exist
      if (image) formData.set('image', image);

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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Input 
              type="text"
              name="name"
              placeholder="Name your Talkie"
              className="w-[180px] bg-background"
              value={formData.name}
              onChange={handleInputChange}
              maxLength={18}
            />
            <div className="text-xs text-muted-foreground">{formData.name.length}/18</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">AI Writer</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Gender</label>
            <div className="flex items-center gap-2">
              {['Male', 'Female', 'Non-Binary'].map((gender) => (
                <label key={gender} className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="gender"
                    value={gender.toLowerCase()}
                    checked={formData.gender === gender.toLowerCase()}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">{gender}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Intro (Visible to other users)
            </label>
            <Textarea
              name="intro"
              placeholder="Briefly outline Talkie's background, identity, and experiences, highlighting its unique traits and narrative"
              rows={3}
              className="bg-background resize-none"
              value={formData.intro}
              onChange={handleInputChange}
              maxLength={2000}
            />
            <div className="text-xs text-muted-foreground text-right">{formData.intro.length}/2000</div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Opening</label>
            <Textarea
              name="opening"
              placeholder="The opening starts the conversation and sets the tone"
              rows={2}
              className="bg-background resize-none"
              value={formData.opening}
              onChange={handleInputChange}
              maxLength={500}
            />
            <div className="text-xs text-muted-foreground text-right">{formData.opening.length}/500</div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Persona & Prompt (Private)</label>
            <Textarea
              name="persona"
              placeholder="Provide detailed information about Talkie's chat persona, role, chat style, restrictions, and other relevant characteristics to create a complete character setup."
              rows={6}
              className="font-mono text-sm bg-background resize-none"
              value={formData.persona}
              onChange={handleInputChange}
              maxLength={2000}
            />
            <div className="text-xs text-muted-foreground text-right">{formData.persona.length}/2000</div>
            <p className="text-xs text-muted-foreground">
              You can preview and test your talkie in the preview console on the right. Modify until satisfied.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Image</label>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            id="image-upload"
            name="image"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image-upload"
            className="flex items-center justify-center w-full aspect-video rounded-lg border-2 border-dashed border-muted bg-muted/5 cursor-pointer hover:bg-muted/10 transition-colors relative overflow-hidden"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Image preview"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                <div className="mt-2">
                  <span className="text-sm text-primary">Add image to make your talkie more engaging</span>
                </div>
              </div>
            )}
          </label>
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
      </div>
    </form>
  );
}
