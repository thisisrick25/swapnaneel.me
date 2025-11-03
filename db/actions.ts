import { prisma } from '@/lib/prisma';
import { unstable_noStore as noStore } from 'next/cache';

export async function increment(slug: string): Promise<number> {
  noStore();
  try {
    const existingView = await prisma.view.findUnique({
      where: {
        slug,
      }
    })

    if (existingView) {
      // If the view already exists, update the count and return the new value
      const updated = await prisma.view.update({
        where: { slug },
        data: {
          count: {
            increment: 1,
          },
        },
        select: { count: true },
      });
      return updated.count;
    } else {
      // If the view does not exist, create a new one and return 1
      const created = await prisma.view.create({
        data: {
          slug,
          count: 1,
        },
        select: { count: true },
      });
      return created.count;
    }
  }
  catch (error) {
    // Handle any errors
    console.error('Error incrementing view:', error);
    return 0;
  }
}
