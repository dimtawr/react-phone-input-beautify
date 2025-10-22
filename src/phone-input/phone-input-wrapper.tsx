'use client';

import clsx from 'clsx';
import React, { useLayoutEffect } from 'react';

import styles from './phone-input.module.scss';
import { usePhoneInput } from './phone-input-provider';

export function PhoneInputWrapper(props: React.HTMLAttributes<HTMLDivElement>) {
  const { isDialogOpen, isPortal, phoneInputRef, setDialogPosition, setPhoneInputRef } = usePhoneInput();
  const { className, style } = props;

  useLayoutEffect(() => {
    if (phoneInputRef?.current) {
      const triggerRect = phoneInputRef.current.getBoundingClientRect();
      // Calculate the top position of the dialog
      const popoverTop = triggerRect.height;

      setDialogPosition({ top: popoverTop });
    }
  }, [phoneInputRef, isDialogOpen]);

  return (
    <div
      {...props}
      className={clsx(styles.phoneInput, className)}
      ref={(ref) => {
        if (ref && !phoneInputRef?.current) {
          setPhoneInputRef({
            current: ref,
          });
        }
      }}
      style={{
        ...(!isPortal ? { position: 'relative' } : {}),
        ...style,
      }}
    />
  );
}
