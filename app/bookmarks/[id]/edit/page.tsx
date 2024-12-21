'use client';

import { Button } from '@/components/base/button';
import { Input } from '@/components/base/input';
import { Textarea } from '@/components/base/textarea';
import { useToast } from '@/hooks/use-toast';
import { Bookmark } from '@/models/bookmark';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditBookmark({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [bookmark, setBookmark] = useState<Bookmark | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBookmark = async () => {
      const res = await fetch(`/api/bookmarks/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setBookmark(data);
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch bookmark. Please try again.',
          variant: 'destructive',
        });
      }
    };
    fetchBookmark();
  }, [params.id, toast]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const updatedBookmark = Object.fromEntries(formData);

    try {
      const res = await fetch(`/api/bookmarks/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBookmark),
      });

      if (res.ok) {
        toast({
          title: 'Bookmark updated',
          description: 'Your bookmark has been successfully updated.',
        });
        router.push(`/bookmarks/${params.id}`);
      } else {
        throw new Error('Failed to update bookmark');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update bookmark. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!bookmark) {
    return (
      <div className="w-screen h-screen flex items-center justify-center animate-spin">
        <LoaderCircle className="text-blue-600 w-16 h-16" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Edit Bookmark</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-700"
            >
              Link
            </label>
            <Input
              type="url"
              id="link"
              name="link"
              defaultValue={bookmark.link}
              required
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <Input
              type="text"
              id="title"
              name="title"
              defaultValue={bookmark.title}
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>

            <Textarea
              id="description"
              name="description"
              className="pt-2 bg-white"
              rows={3}
              placeholder="Enter a description...
              defaultValue={bookmark.description}"
            />
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags (comma-separated)
            </label>
            <Input
              type="text"
              id="tags"
              name="tags"
              defaultValue={bookmark.tags?.join(', ')}
            />
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
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
