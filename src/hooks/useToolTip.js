import { useEffect, useState } from 'react';

const useToolTip = (initialState = false, duration = 2000) => {
  const [active, setActive] = useState(() => initialState);

  useEffect(() => {
    if (!active) return;

    const onTimeout = () => setActive(false);

    const timeoutId = setTimeout(onTimeout, duration);
    return () => clearTimeout(timeoutId);
  }, [duration, active]);

  return [active, setActive];
};

export default useToolTip;
