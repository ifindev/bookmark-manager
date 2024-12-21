'use client';

import { Button } from '@/components/base/button';
import { Card, CardContent } from '@/components/base/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/base/dropdown-menu';
import { cn } from '@/lib/utils';
import { Bookmark } from '@/models/bookmark';
import { MoreVertical, Pencil, Trash } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import DeleteBookmarkModal from './delete-bookmark-modal';

interface BookmarkListProps {
  initialBookmarks: Bookmark[];
}

const tagColors = [
  'bg-green-100 text-green-800',
  'bg-blue-100 text-blue-800',
  'bg-red-100 text-red-800',
];

export default function BookmarkList({ initialBookmarks }: BookmarkListProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bookmarkToDelete, setBookmarkToDelete] = useState<Bookmark | null>(
    null
  );

  const handleDelete = (bookmark: Bookmark) => {
    setBookmarkToDelete(bookmark);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (bookmarkToDelete) {
      // Mock delete operation
      setBookmarks(bookmarks.filter((b) => b._id !== bookmarkToDelete._id));
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bookmarks.map((bookmark) => (
        <Card key={bookmark._id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <Link href={`bookmarks/${bookmark._id}`}>
                  <h2 className="text-xl font-semibold mb-2">
                    {bookmark.title}
                  </h2>
                </Link>
                <p className="text-sm text-gray-500 mb-4">{bookmark.link}</p>
                <p className="text-sm text-gray-600">{bookmark.description}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/bookmarks/${bookmark._id}/edit`}>
                      <Pencil className="h-4 w-4" />
                      <span>Edit</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => handleDelete(bookmark)}>
                    <Trash className="h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {bookmark.tags?.map((tag, index) => (
                <span
                  key={index}
                  className={cn(
                    'px-2 py-1 text-xs font-medium rounded',
                    tagColors[index]
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      <DeleteBookmarkModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
