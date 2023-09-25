import { useMDXComponent } from 'next-contentlayer/hooks'
import { H2, H3, H4, H5 } from '@/lib/mdxStyle';

const components = {
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
};

// @ts-ignore
export default function MDXContent({ code }) {
  const MDX = useMDXComponent(code)

  return (
    <div className="prose prose-quoteless prose-neutral dark:prose-invert">
      <MDX components={components}/>
    </div>
  )
}
