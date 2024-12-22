'use client';

import { cn } from '@/lib/utils';
import { Bookmark } from '@/models/bookmark';
import { BookmarkIcon, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Input } from '../base/input';
import LinkButton from '../shared/link-button';

type Props = {
  bookmarks: Bookmark[];
};

export default function Sidebar({ bookmarks }: Props) {
  // #region SEARCH STATE
  const [search, setSearch] = useState('');
  const filteredBookmark = bookmarks.filter(
    (bookmark) =>
      bookmark.title.toLowerCase().includes(search) ||
      bookmark.description?.toLowerCase().includes(search)
  );
  // #endregion

  // #region PARAMS TO GET ACTIVE BOOKMARK ID
  const params = useParams();
  const activeBookmarkId = params.id;
  // #endregion

  return (
    <aside className="w-72 border-r border-gray-200">
      <header className="flex flex-col gap-3 p-4 border-b border-b-gray-200">
        <h1 className="text-xl font-bold text-gray-900 flex items-center">
          Bookmark Manager
        </h1>

        <LinkButton
          className="w-full"
          href="/bookmarks/new"
          text="New Bookmark"
          icon={<Plus className="w-4 h-4" />}
        />
      </header>
      <div className="flex flex-col gap-0">
        <div className="p-4">
          <div className="relative">
            <Input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search bookmarks..."
              className="pl-10"
              value={search}
            />
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <ul className="flex flex-col divide-y divide-slate-100">
          {filteredBookmark.map((bookmark) => (
            <li key={bookmark._id} className="w-full">
              <Link
                href={`/bookmarks/${bookmark._id}`}
                className={cn(
                  'relative flex flex-col justify-start px-4 py-2 w-full gap-1 z-10',
                  'focus:outline-none focus:ring-1 focus:ring-blue-500/90 ',
                  activeBookmarkId === bookmark._id && 'bg-blue-50'
                )}
              >
                <div className="flex gap-2 items-center">
                  <BookmarkIcon className="w-4 h-4 text-blue-500" />
                  <p className="text-sm font-bold truncate">{bookmark.title}</p>
                </div>
                {bookmark.description && (
                  <p className="text-sm truncate">{bookmark.description}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
