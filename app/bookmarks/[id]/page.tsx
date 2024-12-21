import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/base/card';
import LinkButton from '@/components/shared/link-button';
import { Bookmark } from '@/models/bookmark';
import {
  ArrowLeft,
  Bookmark as BookmarkIcon,
  FileText,
  LinkIcon,
  Tag,
} from 'lucide-react';
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
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold flex items-center">
                <BookmarkIcon className="w-6 h-6 mr-2 text-blue-500" />
                {bookmark.title}
              </CardTitle>
              <div className="space-x-2 flex items-center">
                <LinkButton
                  text="Edit"
                  href={`/bookmarks/${bookmark._id}/edit`}
                />
                <LinkButton
                  text="Back"
                  variant="ghost"
                  href="/"
                  icon={<ArrowLeft className="w-4 h-4" />}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <LinkIcon className="w-4 h-4" />
              <a
                href={bookmark.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {bookmark.link}
              </a>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
