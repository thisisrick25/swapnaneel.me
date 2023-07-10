import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBlog,
  faListCheck,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons"

type HeaderLinks = {
  icon: React.ReactNode
  href: string
  text: string
}[]

export const HEADER_LINKS: HeaderLinks = [
  {
    icon: <FontAwesomeIcon icon={faBlog} />,
    href: '/blog',
    text: 'Blog',
  },
  {
    icon: <FontAwesomeIcon icon={faListCheck} />,
    href: '/projects',
    text: 'Projects',
  },
  {
    icon: <FontAwesomeIcon icon={faAddressCard} />,
    href: '/about',
    text: 'About',
  },
  {
    icon: <FontAwesomeIcon icon={faAddressCard} />,
    href: '/demo',
    text: 'Demo',
  },
]
