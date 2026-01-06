/**
 * Estimate reading time based on word count
 * Average reading speed: 200 words per minute
 */
export function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}
