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

export async function getBlogViews() {
  noStore();
  try {
    const views = await prisma.view.aggregate({
      _sum: {
        count: true,
      },
    });

    return views._sum.count || 0;
  } catch (error) {
    // Handle any errors
    console.error('Error fetching blog views:', error);
    return 0;
  }
  // finally {
  //   // Close the Prisma client connection
  //   await prisma.$disconnect();
  // }
}

