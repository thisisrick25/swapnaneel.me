import { increment } from '@/db/actions';
import { getViewsCount, getViewsCountBySlug } from '@/db/queries';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (slug) {
    // Fetch specific slug
    try {
      const count = await getViewsCountBySlug(slug);
      return NextResponse.json({ count });
    } catch (error) {
      console.error('Error fetching views:', error);
      return NextResponse.json({ error: 'Failed to fetch views' }, { status: 500 });
    }
  } else {
    // Fetch all views for list pages
    try {
      const views = await getViewsCount();
      return NextResponse.json({ views });
    } catch (error) {
      console.error('Error fetching views:', error);
      return NextResponse.json({ error: 'Failed to fetch views' }, { status: 500 });
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const newCount = await increment(slug);
    return NextResponse.json({ success: true, count: newCount });
  } catch (error) {
    console.error('Error incrementing views:', error);
    return NextResponse.json({ error: 'Failed to increment views' }, { status: 500 });
  }
}