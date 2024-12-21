import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const client = await clientPromise;
  const db = client.db('bookmarkManager');
  const bookmarks = await db.collection('bookmarks').find({}).toArray();
  return NextResponse.json(bookmarks);
}

export async function POST(request: Request) {
  const client = await clientPromise;
  const db = client.db('bookmarkManager');
  const rawBody = await request.text();
  const bookmark = JSON.parse(rawBody);
  const result = await db.collection('bookmarks').insertOne(bookmark);
  return NextResponse.json({ _id: result.insertedId.toString(), ...bookmark });
}
