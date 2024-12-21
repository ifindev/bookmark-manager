import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const client = await clientPromise
  const db = client.db("bookmarkManager")
  const bookmark = await db.collection("bookmarks").findOne({ _id: new ObjectId(params.id) })
  if (!bookmark) {
    return NextResponse.json({ error: 'Bookmark not found' }, { status: 404 })
  }
  return NextResponse.json(bookmark)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const client = await clientPromise
  const db = client.db("bookmarkManager")
  const updatedBookmark = await request.json()
  const result = await db.collection("bookmarks").updateOne(
    { _id: new ObjectId(params.id) },
    { $set: updatedBookmark }
  )
  if (result.matchedCount === 0) {
    return NextResponse.json({ error: 'Bookmark not found' }, { status: 404 })
  }
  return NextResponse.json({ _id: params.id, ...updatedBookmark })
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const client = await clientPromise
  const db = client.db("bookmarkManager")
  const result = await db.collection("bookmarks").deleteOne({ _id: new ObjectId(params.id) })
  if (result.deletedCount === 0) {
    return NextResponse.json({ error: 'Bookmark not found' }, { status: 404 })
  }
  return NextResponse.json({ message: 'Bookmark deleted successfully' })
}

