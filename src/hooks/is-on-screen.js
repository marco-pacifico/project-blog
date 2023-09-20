import React from "react";

function useIsOnScreen({ root = null, rootMargin, threshold = 0 }) {
  const [isShown, setIsShown] = React.useState(false);
  const nodeToObserve = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        setIsShown(entry.isIntersecting);
      },
      { root, rootMargin, threshold }
    );

    observer.observe(nodeToObserve.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return [nodeToObserve, isShown];
}

export default useIsOnScreen;
