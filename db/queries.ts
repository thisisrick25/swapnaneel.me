import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from 'next/cache';

export async function getViewsCount(): Promise<{ slug: string; count: number }[]> {
  noStore();
  try {
    const views = await prisma.view.findMany({
      select: {
        slug: true,
        count: true,
      },
    });

    return views;
  } catch (error) {
    // Handle any errors
    console.error('Error fetching views count:', error);
    return [];
  }
  // finally {
  //   // Close the Prisma client connection
  //   await prisma.$disconnect();
  // }
}

export async function getViewsCountBySlug(slug: string): Promise<number> {
  noStore();
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
}

