import LinkButton from '@/components/shared/link-button';
import { Bookmark, Plus } from 'lucide-react';

export default async function Home() {
  return (
    <section className="min-h-screen bg-white w-full">
      <div className="mx-auto py-4 sm:px-6 lg:px-8 flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <Bookmark className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Your Next Adventure Awaits
          </h2>
          <p className="text-gray-500 mb-4">
            Select a bookmark to view or create something new
          </p>
          <LinkButton
            className="w-full"
            href="/bookmarks/new"
            text="New Bookmark"
            icon={<Plus className="w-4 h-4" />}
          />
        </div>
      </div>
    </section>
  );
}
