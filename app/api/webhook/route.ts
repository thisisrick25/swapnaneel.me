import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createHmac, timingSafeEqual } from 'crypto'; // For verifying the signature
import { GITHUB_WEBHOOK_SECRET, GITHUB_CONTENT_PATH } from "@/lib/constants";

export async function POST(request: NextRequest) {
  // Ensure the request is coming from GitHub by checking the signature
  // GitHub sends the signature in the 'x-hub-signature-256' header
  const signature = request.headers.get('x-hub-signature-256');
  const payload = await request.text(); // Get the raw payload as text

  // 1. Verify the signature (important for security)
  if (GITHUB_WEBHOOK_SECRET) {
    const hmac = createHmac('sha256', GITHUB_WEBHOOK_SECRET);
    const digest = Buffer.from('sha256=' + hmac.update(payload).digest('hex'), 'utf8');
    const signatureBuffer = Buffer.from(signature || '', 'utf8');

    if (!signatureBuffer || !timingSafeEqual(digest, signatureBuffer)) {
      console.error('Invalid signature.');
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }
  } else {
    console.warn('WEBHOOK_SECRET is not set. Webhook signature verification skipped.');
    // In production, you should always set a secret.
  }

  try {
    const event = request.headers.get('x-github-event');
    const data = JSON.parse(payload); // Parse the payload after verification

    console.log(`Received GitHub event: ${event}`);

    // 2. Handle the 'push' event
    if (event === 'push') {
      // Check if the push is to the main branch (or your content branch)
      // You might need to adjust the branch name based on your setup
      const contentBranch = 'main'; // Use your content branch name
      if (data.ref === `refs/heads/${contentBranch}`) {
        console.log(`Push event on branch ${contentBranch}. Triggering revalidation.`);

        // Get all files that were added, modified, or removed in the push
        const changedFiles = data.commits.flatMap((commit: any) => [...commit.added, ...commit.modified, ...commit.removed]);

        // Filter for relevant blog content files
        const relevantChanges = changedFiles.filter((filePath: string) =>
          filePath.startsWith(GITHUB_CONTENT_PATH) && filePath.endsWith('.mdx')
        );

        if (relevantChanges.length > 0) {
          console.log(`Found relevant changes: ${relevantChanges.join(', ')}`);

          // Revalidate the main posts list page as content has changed
          console.log('Revalidating /posts');
          revalidatePath('/posts');

          // Revalidate specific blog post paths for added/modified files
          // We only revalidate paths for files that were added or modified,
          // not removed, as Next.js will handle 404 for removed paths.
          const blogPostPathsToRevalidate = relevantChanges
            .filter((filePath: string) => !data.commits.some((commit: any) => commit.removed.includes(filePath)))
            .map((filePath: string) => {
              // Extract the slug from the file path
              const slug = filePath.replace(GITHUB_CONTENT_PATH + '/', '').replace('.mdx', '');
              return `/posts/${slug}`;
            });

          blogPostPathsToRevalidate.forEach((path: string) => {
            console.log(`Revalidating path: ${path}`);
            revalidatePath(path);
          });

        } else {
          console.log('No relevant blog content changes found.');
        }


        // // You can inspect data.commits to find changed files and revalidate specific paths
        // // For simplicity, let's revalidate the main posts list page and all individual post pages
        // revalidatePath('/posts'); // Revalidate the main posts list page
        // revalidatePath('/posts/[slug]', 'page'); // Revalidate all individual post pages

        // const blogPostPaths = relevantChanges
        //   .map((filePath: string) => `/posts/${filePath.split('/').pop()?.replace('.mdx', '')}`); // Adjust path extraction based on your structure

        // blogPostPaths.forEach((path: string) => {
        //   console.log(`Revalidating path: ${path}`);
        //   revalidatePath(path);
        // });

      } else {
        console.log(`Push event on non-content branch: ${data.ref}. No revalidation triggered.`);
      }
    } else {
      console.log(`Ignoring event type: ${event}`);
    }

    return NextResponse.json({ message: 'Webhook received and processed' }, { status: 200 });

  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ message: 'Error processing webhook' }, { status: 500 });
  }
}

// Add a GET handler for testing the route (optional)
export async function GET() {
  return NextResponse.json({ message: 'GitHub webhook endpoint is active' });
}