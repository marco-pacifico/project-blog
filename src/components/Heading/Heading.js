'use client';
import React from 'react';
import useIsOnScreen from '../../hooks/is-on-screen';

import { HeadingsContext } from '@/components/BlogBody';

export const H2 = React.memo(function H2({ children }) {
  const { setHeadings } = React.useContext(HeadingsContext);
  // const memoizedHeadings = React.useMemo(() => headings, [headings]);

  console.log("rending H2");

  // For intersection observer
  const [headingRef, isOnScreen] = useIsOnScreen({ rootMargin: "0px 0px -40% 0px" });

  // Create an id from the heading text
  const headingId = children.toLowerCase().replace(/\s/g, "-");

  React.useEffect(() => {
    if (isOnScreen) {
      setHeadings((prevHeadings) => {
        const index = prevHeadings.findIndex((heading) => heading.id === headingId);
        // if (index !== -1) {
          const newHeadings = [...prevHeadings];
          newHeadings[index] = { ...newHeadings[index], isOnScreen: true };
          return newHeadings;
        // }
        // return prevHeadings;
      });
    }
  }, [headingId, isOnScreen, setHeadings]);

  
  return <h2 ref={headingRef} id={headingId} style={{scrollMargin: "24px 0 0 0"}}>{children}</h2>;
});

export function H3({ children }) {
  const id = children.toLowerCase().replace(/\s/g, "-");
  return <h3 id={id} style={{scrollMargin: "24px 0 0 0"}}>{children}</h3>;
}



// if (isOnScreen) {
//   const newHeadings = [...memoizedHeadings];
//   // get index of heading
//   const index = newHeadings.findIndex((heading) => heading.id === id);
//   const heading = { ...newHeadings[index], isOnScreen: true };
//   newHeadings[index] = heading;
//   console.log("render");
//   setHeadings(newHeadings);
// }

// const color = isOnScreen ? "red" : "initial";