'use client';

import clsx from 'clsx';
import React from 'react';

import styles from './phone-input.module.scss';
import { usePhoneInput } from './phone-input-provider';

export function PhoneInputTrigger(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onClick } = props;
  const { isDialogOpen, setIsDialogOpen, setTriggerRef, triggerRef } = usePhoneInput();

  const handleTogglePopover = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsDialogOpen(!isDialogOpen);
    onClick?.(e);
  };

  const { children, className } = props;

  return (
    <button
      {...props}
      aria-expanded={isDialogOpen}
      aria-haspopup='listbox'
      aria-label='Country selector'
      className={clsx(styles.phoneInputTrigger, className)}
      data-open={isDialogOpen}
      onClick={handleTogglePopover}
      ref={(ref) => {
        if (ref && !triggerRef?.current) {
          setTriggerRef({
            current: ref,
          });
        }
      }}
      // eslint-disable-next-line no-use-before-define
      role='combobox'
      type='button'
    >
      {children}
    </button>
  );
}

export function usePhoneInputTrigger(props: { open: boolean }) {
  return {
    triggerProps: {
      'aria-expanded': props.open,
      'aria-haspopup': 'listbox',
      'aria-label': 'Select country',
      role: 'combobox',
      type: 'button',
    } as const,
  };
}
