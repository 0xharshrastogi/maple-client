/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";

const useMediaQuery = (query, whenTrue, whenFalse) => {
  if (window && !window.matchMedia) {
    console.warn("window.matchMedia: Not Supported");
    return whenFalse;
  }

  const mediaQueryRef = useRef(window.matchMedia(query));
  const [matches, setMatches] = useState(() => mediaQueryRef.current.matches);

  useEffect(() => {
    const handler = () => setMatches(mediaQueryRef.current.matches);
    const target = mediaQueryRef.current;
    target.addEventListener("change", handler);

    return () => target.removeEventListener("change", handler);
  }, [mediaQueryRef]);

  return matches ? whenTrue : whenFalse;
};

export default useMediaQuery;
