import { useMDXComponent } from 'next-contentlayer/hooks'

const components = {
  h1: (props: any) => (
    <h2
      className="relative mt-8 pt-9 text-xl font-bold sm:text-3xl pb-2"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h3
      className="relative mt-10 pt-9 text-xl font-extrabold sm:text-2xl pb-2"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h4
      className="text-xl font-extrabold pb-1"
      {...props}
    />
  ),
  h4: (props: any) => (
    <h5
      className="text-lg font-bold pb-1"
      {...props}
    />
  ),

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
