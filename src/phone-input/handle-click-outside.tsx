'use client';

import React, { useEffect } from 'react';

const handleClickOutside = (event: MouseEvent, refs: (React.RefObject<HTMLElement> | undefined)[]) =>
  !refs.some((ref) => ref?.current?.contains(event.target as Node));

export function useClickOutside(
  refs: (React.RefObject<HTMLElement> | undefined)[],
  handler: (event: MouseEvent) => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (handleClickOutside(event, refs)) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [refs, handler]);
}
