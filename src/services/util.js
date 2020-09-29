import React from 'react';

export const util = {
  useDebounce: (value, delay, callback) => {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(
      () => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
          setDebouncedValue(value);
          if (callback) callback(value);
        }, delay);

        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.

        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay], // Only re-call effect if value or delay changes
    );

    return debouncedValue;
  },
  sleep: (delay = 0) => new Promise((resolve) => {
    setTimeout(resolve, delay);
  }),
};
