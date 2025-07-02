import Link from 'next/link';
import { HEADER_LINKS } from 'config/links';

export default function Page() {
  const stuffsLink = HEADER_LINKS.find(link => link.href === '/more');
  const childLinks = stuffsLink?.children || [];

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">More Stuffs</h1>
      {childLinks.length > 0 ? (
        <ul className="list-disc pl-5">
          {childLinks.map(link => (
            <li key={link.href} className="mb-2">
              <Link href={link.href} className="text-blue-600 dark:text-blue-400 hover:underline">
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No additional items found.</p>
      )}
    </>
  );
}