type HeaderLink = {
  href: string
  text: string
  children?: HeaderLink[]
}

export const HEADER_LINKS: HeaderLink[] = [
  { href: '/blog', text: 'Posts' },
  { href: '/projects', text: 'Projects' },
  { href: '/more', text: 'Stuffs',
    children: [
      { href: '/commonplace-book', text: 'Commonplace Book' },
      { href: '/reading-list', text: 'Reading List' },
      { href: '/ideas', text: 'Ideas' },
      { href: '/bucket-list', text: 'Bucket List' },
      { href: '/courses', text: 'Courses' },
    ]
  }
]
