import { prisma } from 'lib/prisma';
import { unstable_noStore as noStore } from 'next/cache';

export async function increment(slug: string) {
  noStore();
  try {
    const existingView = await prisma.view.findUnique({
      where: {
        slug,
      }
    })

    if (existingView) {
      // If the view already exists, update the count
      await prisma.view.update({
        where: { slug },
        data: {
          count: {
            increment: 1,
          },
        },
      });
    } else {
      // If the view does not exist, create a new one
      await prisma.view.create({
        data: {
          slug,
          count: 1,
        },
      });
    }
  }
  catch (error) {
    // Handle any errors
    console.error('Error incrementing view:', error);
  } 
  // finally {
  //   // Close the Prisma client connection
  //   await prisma.$disconnect();
  // }
}
