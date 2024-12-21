import { Input } from '@/components/base/input';
import BookmarkList from '@/components/bookmarks/bookmark-list';
import LinkButton from '@/components/shared/link-button';
import { Bookmark } from '@/models/bookmark';
import { Bookmark as BookmarkIcon, Plus, Search } from 'lucide-react';

async function getBookmarks(): Promise<Bookmark[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookmarks`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch bookmarks');
  }
  return res.json();
}

export default async function Home() {
  const bookmarks = await getBookmarks();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <BookmarkIcon className="w-8 h-8 mr-2 text-blue-500" />
            Bookmark Manager
          </h1>
          <LinkButton
            href="/bookmarks/new"
            text="Add New"
            icon={<Plus className="w-4 h-4" />}
          />
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search bookmarks..."
                className="pl-10"
              />
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <BookmarkList initialBookmarks={bookmarks} />
        </div>
      </main>
    </div>
  );
}
