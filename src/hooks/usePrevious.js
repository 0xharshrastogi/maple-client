import React from "react";

export const usePrevious = (current, initial) => {
  const ref = React.useRef();
  const prev = ref.current || initial;

  React.useEffect(() => {
    if (!ref.current) return (ref.current = current);

    return () => {
      ref.current = current;
    };
  }, [current]);

  return prev;
};
