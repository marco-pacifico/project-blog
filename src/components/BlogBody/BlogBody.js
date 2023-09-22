"use client";
import React from "react";
import TOC from "@/components/TOC";
import styles from "./blogBody.module.css";

// Create a new context for the headings
export const HeadingsContext = React.createContext();

function BlogBody({ initialHeadings, children }) {
  const [headings, setHeadings] = React.useState(initialHeadings);

  const memoizedContextValue = React.useMemo(() => ({
    headings,
    setHeadings,
  }), [headings]);

  return (
    <HeadingsContext.Provider value={memoizedContextValue}>
      <div className={styles.page}>
        <aside className={styles.toc}>
          <TOC headings={headings} />
        </aside>
        {children}
      </div>
    </HeadingsContext.Provider>
  );
}

export default BlogBody;

// const HeadingsProvider = ({ initialHeadings, children }) => {
//   const [headings, setHeadings] = React.useState(initialHeadings);

//   const memoizedContextValue = useMemo(() => ({
//     headings,
//     setHeadings,
//   }), [headings]);

//   return (
//     <HeadingsContext.Provider value={memoizedContextValue}>
//       {children}
//     </HeadingsContext.Provider>
//   );
// };
