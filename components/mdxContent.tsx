import { useMDXComponent } from 'next-contentlayer/hooks'

const components = {

};

// @ts-ignore
export default function MDXContent({ code }) {
  const MDX = useMDXComponent(code)

  return (
    <div className="prose prose-neutral max-w-max dark:prose-invert">
      <MDX components={components}/>
    </div>
  )
}
