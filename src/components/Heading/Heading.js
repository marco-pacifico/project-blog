"use client";
import React from "react";
import useIsOnScreen from "../../hooks/is-on-screen";
import { HeadingsContext } from "@/components/BlogBody";

export const H2 = React.memo(function H2({ children }) {
  const id = React.useId();

  const { setHeadings } = React.useContext(HeadingsContext);

  console.log(`rending H2 ${id}`);

  // For intersection observer
  const [headingRef, isOnScreen] = useIsOnScreen({
    rootMargin: "50% 0px -50% 0px",
    threshold: 1,
  });

  // Create an id from the heading text
  const headingId = children.toLowerCase().replace(/\s/g, "-");

  React.useEffect(() => {
    console.log(`H2 ${headingId} is on screen`);
    if (isOnScreen) {
      setHeadings((prevHeadings) => {
        // Copy the headings array
        const newHeadings = [...prevHeadings];
        // Set the current heading to on screen, and all others to off screen
        newHeadings.forEach((heading) => {
          if (heading.id === headingId) {
            heading.isOnScreen = true;
          } else {
            heading.isOnScreen = false;
          }});

        // Return the new headings array, setting the state with the new headings array
        return newHeadings;
      });
    } 

    if (!isOnScreen) {
      console.log(`H2 ${headingId} is off screen`)
      setHeadings((prevHeadings) => {
        // Get the index of the current heading in the headings array
        const currentHeadingIndex = prevHeadings.findIndex(
          (heading) => heading.id === headingId
        );
        const newHeadings = [...prevHeadings];
        const lastHeadingIndex = newHeadings.length - 1;
        const nextHeadingIndex = currentHeadingIndex < lastHeadingIndex ? currentHeadingIndex + 1 : currentHeadingIndex;
        const nextHeading = newHeadings[nextHeadingIndex];
        
        // Don't set the current heading to off screen if the next headings isn't on screen yet
        if (!nextHeading.isOnScreen || currentHeadingIndex === lastHeadingIndex) {
          return prevHeadings;
        }

        // Otherwise set the current heading to off screen
        newHeadings[currentHeadingIndex] = { ...newHeadings[currentHeadingIndex], isOnScreen: false };

        return newHeadings;
      });
    };

  }, [headingId, isOnScreen, setHeadings]);

  return (
    <h2 ref={headingRef} id={headingId} style={{ scrollMargin: "24px 0 0 0" }}>
      {children}
    </h2>
  );
});

export function H3({ children }) {
  const id = children.toLowerCase().replace(/\s/g, "-");
  return (
    <h3 id={id} style={{ scrollMargin: "24px 0 0 0" }}>
      {children}
    </h3>
  );
}
