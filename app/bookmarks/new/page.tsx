'use client';

import { Button } from '@/components/base/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/card';
import { Input } from '@/components/base/input';
import { Textarea } from '@/components/base/textarea';
import { useToast } from '@/hooks/use-toast';
import { BookmarkIcon, FileText, LinkIcon, Tag, Type } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewBookmark() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const rawBookmark = Object.fromEntries(formData);
    const tags = rawBookmark['tags']
      .toString()
      .split(',')
      .map((tag) => tag.trim());

    const bookmark = {
      ...rawBookmark,
      tags,
    };

    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookmark),
      });

      if (res.ok) {
        const data = await res.json();
        toast({
          title: 'Bookmark created',
          description: 'Your new bookmark has been successfully created.',
        });
        router.push(`/bookmarks/${data._id}`);
      } else {
        throw new Error('Failed to create bookmark');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create bookmark. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <BookmarkIcon className="w-6 h-6 mr-2 text-blue-500" />
              Add New Bookmark
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="link"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Link
                </label>
                <div className="relative">
                  <Input
                    id="link"
                    name="link"
                    type="url"
                    required
                    className="pl-10"
                    placeholder="https://example.com"
                  />
                  <LinkIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <div className="relative">
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    required
                    className="pl-10"
                    placeholder="Bookmark Title"
                  />
                  <Type className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <div className="relative">
                  <Textarea
                    id="description"
                    name="description"
                    className="pl-10 pt-2"
                    rows={3}
                    placeholder="Enter a description..."
                  />
                  <FileText className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                </div>
              </div>
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tags
                </label>
                <div className="relative">
                  <Input
                    id="tags"
                    name="tags"
                    type="text"
                    className="pl-10"
                    placeholder="Enter tags, comma-separated"
                  />
                  <Tag className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save Bookmark'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
