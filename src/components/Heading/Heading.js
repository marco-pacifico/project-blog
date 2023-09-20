'use client';
import React from 'react';
import useIsOnScreen from '../../hooks/is-on-screen';

import { HeadingsContext } from '@/components/BlogBody';

export const H2 = React.memo(function H2({ children }) {
  const { headings, setHeadings } = React.useContext(HeadingsContext);
  console.log(headings);
  const [headingRef, isOnScreen] = useIsOnScreen({ rootMargin: "0px 0px -40% 0px" });
  const id = children.toLowerCase().replace(/\s/g, "-");

  if (isOnScreen) {
    const newHeadings = [...headings];
    // get index of heading
    const index = newHeadings.findIndex((heading) => heading.id === id);
    const heading = { ...newHeadings[index], isOnScreen: true };
    newHeadings[index] = heading;
    console.log("render");
    setHeadings(newHeadings);
  }

  const color = isOnScreen ? "red" : "initial";
  
  return <h2 ref={headingRef} id={id} style={{scrollMargin: "24px 0 0 0", color}}>{children}</h2>;
});

export function H3({ children }) {
  const id = children.toLowerCase().replace(/\s/g, "-");
  return <h3 id={id} style={{scrollMargin: "24px 0 0 0"}}>{children}</h3>;
}


