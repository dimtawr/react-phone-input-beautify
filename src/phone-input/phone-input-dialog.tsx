'use client';

import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';

import { useClickOutside } from './handle-click-outside';
import styles from './phone-input.module.scss';
import { usePhoneInput } from './phone-input-provider';

export function PhoneInputDialog(
  props: Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
    children?: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
    open?: boolean;
  },
) {
  const { children, className, onOpenChange, open, ...otherProps } = props;
  const {
    dialogPosition,
    isDialogOpen,
    isPortal,
    props: { phoneInputDialogProps },
    setIsDialogOpen,
    triggerRef,
  } = usePhoneInput();
  const dialogOpen = typeof open === 'boolean' ? open : isDialogOpen;
  const dialogRef = useRef<HTMLDivElement>(null);

  useClickOutside([dialogRef, triggerRef], () => {
    if (dialogOpen) {
      setIsDialogOpen(false);
    }
  });

  useEffect(() => {
    if (onOpenChange) {
      onOpenChange(dialogOpen);
    }
  }, [dialogOpen]);

  if (!dialogPosition) return null;

  return (
    <div
      {...otherProps}
      {...phoneInputDialogProps}
      className={clsx(
        styles.phoneInputDialog,
        className,
        dialogOpen && styles.phoneInputDialogOpen,
        isPortal && styles.phoneInputDialogPortal,
      )}
      ref={dialogRef}
      style={{ top: dialogPosition.top }}
    >
      {children}
    </div>
  );
}

export function usePhoneInputDialog(props: { open: boolean }) {
  return {
    phoneInputDialogProps: {
      'aria-hidden': !props.open,
    },
  };
}
