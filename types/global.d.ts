// CSS module declarations for TypeScript
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// For side-effect CSS imports (like globals.css)
declare module '*.css';
