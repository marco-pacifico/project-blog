'use client';
import React from 'react';
import useIsOnScreen from '../../hooks/is-on-screen';

export function H2({ children }) {
  const [headingRef, isOnScreen] = useIsOnScreen({ rootMargin: "0px 0px -40% 0px" });
  const id = children.toLowerCase().replace(/\s/g, "-");
  const color = isOnScreen ? "red" : "initial";
  
  return <h2 ref={headingRef} id={id} style={{scrollMargin: "24px 0 0 0", color}}>{children}</h2>;
}

export function H3({ children }) {
  const id = children.toLowerCase().replace(/\s/g, "-");
  return <h3 id={id} style={{scrollMargin: "24px 0 0 0"}}>{children}</h3>;
}


