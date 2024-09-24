import { useEffect, useState } from "react";

// Custom hook for debouncing
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handleDebounce);
  }, [value, delay]);

  return debouncedValue;
};
