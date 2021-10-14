import { useState } from 'react';

const useToolTip = (initialState = false) => {
  const [active, setActive] = useState(() => initialState);
  return [active, setActive];
};

export default useToolTip;
