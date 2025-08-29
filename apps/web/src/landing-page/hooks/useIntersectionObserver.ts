"use client";

import { useEffect } from "react";

export const useIntersectionObserver = (
  isLast: boolean,
  onLoadMore: () => void,
  cardRef: React.RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    if (!isLast) return;

    const observerOptions = {
      rootMargin: "100px",
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        onLoadMore();
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [isLast, onLoadMore, cardRef]);
};
