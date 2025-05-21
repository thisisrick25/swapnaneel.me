type HeaderLink = {
  href: string
  text: string
  children?: HeaderLink[]
}

export const HEADER_LINKS: HeaderLink[] = [
  { href: '/posts', text: 'Posts' },
  { href: '/projects', text: 'Projects' },
  { href: '/more', text: 'Stuffs',
    children: [
      { href: '/more/commonplace-book', text: 'Commonplace Book' },
      { href: '/more/reading-list', text: 'Reading List' },
      { href: '/more/ideas', text: 'Ideas' },
      { href: '/more/bucket-list', text: 'Bucket List' },
      { href: '/more/courses', text: 'Courses' },
    ]
  }
]
