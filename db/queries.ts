import { prisma } from "@/lib/prisma";
import { connection } from 'next/server';
import { cache } from 'react';

// Cached query for all views - deduplicates within a single request
export const getViewsCount = cache(async (): Promise<{ slug: string; count: number }[]> => {
  await connection();
  try {
    const views = await prisma.view.findMany({
      select: {
        slug: true,
        count: true,
      },
    });

    return views;
  } catch (error) {
    console.error('Error fetching views count:', error);
    return [];
  }
});

// Cached query for single slug - deduplicates within a single request
export const getViewsCountBySlug = cache(async (slug: string): Promise<number> => {
  await connection();
  try {
    const view = await prisma.view.findUnique({
      where: {
        slug: slug,
      },
      select: {
        count: true,
      },
    });

    return view?.count || 0;
  } catch (error) {
    console.error('Error fetching views count for slug:', error);
    return 0;
  }
});
