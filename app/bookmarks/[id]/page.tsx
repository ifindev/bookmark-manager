import LinkButton from '@/components/shared/link-button';
import { Bookmark } from '@/models/bookmark';
import { Edit, FileText, LinkIcon, Tag } from 'lucide-react';
import { notFound } from 'next/navigation';

async function getBookmark(id: string): Promise<Bookmark> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/bookmarks/${id}`,
    { cache: 'no-store' }
  );
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

export default async function BookmarkDetail({
  params,
}: {
  params: { id: string };
}) {
  const bookmark = await getBookmark(params.id);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-700">
              {bookmark.title}
            </h2>
            <div className="space-x-2 flex items-center">
              <LinkButton
                variant="outline"
                aria-labelledby="Edit Button"
                text="Edit"
                icon={<Edit />}
                href={`/bookmarks/${bookmark._id}/edit`}
                className="p-2"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <LinkIcon className="w-4 h-4" />
            <a
              href={bookmark.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-blue-600 font-semibold"
            >
              {bookmark.link}
            </a>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <FileText className="w-5 h-5 text-gray-400 mt-1" />
          <p className="text-gray-600">{bookmark.description}</p>
        </div>
        <div className="flex items-start space-x-2">
          <Tag className="w-5 h-5 text-gray-400 mt-1" />
          <div className="flex flex-wrap gap-2">
            {bookmark.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
