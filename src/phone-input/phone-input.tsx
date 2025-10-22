'use client';

import { ISO31661AssignedEntry } from 'iso-3166';
import React, { HTMLAttributes, useEffect, useMemo, useState } from 'react';

import { usePhoneState } from '../lib';
import { PhoneInputDialog, usePhoneInputDialog } from './phone-input-dialog';
import { PhoneInputItem, PhoneInputItemWithForm, usePhoneInputItem } from './phone-input-item';
import PhoneInputWithForm, { PhoneInputNumberInput, usePhoneInputNumberInput } from './phone-input-number-input';
import PhoneInputPortal from './phone-input-portal';
import { PhoneInputContextProvider } from './phone-input-provider';
import { PhoneInputTrigger, usePhoneInputTrigger } from './phone-input-trigger';
import { PhoneInputWrapper } from './phone-input-wrapper';

export function usePhone(
  props: {
    isDialogOpen: boolean;
  },
  state: ReturnType<typeof usePhoneState>,
) {
  const { numberInputProps } = usePhoneInputNumberInput();
  const { getListItemProps } = usePhoneInputItem({
    selected: state.country,
  });
  const { triggerProps } = usePhoneInputTrigger({
    open: props.isDialogOpen,
  });
  const { phoneInputDialogProps } = usePhoneInputDialog({
    open: props.isDialogOpen,
  });

  return {
    getListItemProps,
    numberInputProps,
    phoneInputDialogProps,
    triggerProps,
  };
}

type UsePhoneStateParams = Parameters<typeof usePhoneState>[0];

type ChildrenFunc = (props: {
  country: string;
  countryList: ISO31661AssignedEntry[];
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  open: boolean;
  phone: string;
}) => React.ReactNode;

export function PhoneInputRoot(
  props: Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
    onCountryChange?: (country: string) => void;
    onPhoneChange?: (phone: string) => void;
    onValidationChange?: (valid: boolean) => void;
  } & UsePhoneStateParams & {
      children?: (ChildrenFunc | React.ReactNode)[] | ChildrenFunc | React.ReactNode;
    },
) {
  const { children, initialCountry, initialPhoneNumber, onCountryChange, onPhoneChange, onValidationChange, ...rest } =
    props;
  const state = usePhoneState({
    initialCountry,
    initialPhoneNumber,
  });
  const [isOpen, setIsOpen] = React.useState(false);
  const phoneProps = usePhone({ isDialogOpen: isOpen }, state);
  const [onOpenChange, setOnOpenChange] = useState<(open: boolean) => void>();

  useEffect(() => {
    if (onCountryChange) {
      onCountryChange(state.country);
    }
  }, [props, state.country]);

  const dialogState = useMemo(
    () => ({
      isDialogOpen: isOpen,
      onOpenChange,
      setIsDialogOpen: setIsOpen,
      setOnOpenChange,
    }),
    [isOpen, onOpenChange],
  );

  useEffect(() => {
    if (onOpenChange) {
      setOnOpenChange(onOpenChange);
    }
  }, [onOpenChange]);

  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(state.isValid);
    }
  }, [onValidationChange, state.isValid]);

  useEffect(() => {
    if (onPhoneChange && state.phoneNumber) {
      onPhoneChange(state.phoneNumber);
    }
  }, [onPhoneChange, state.phoneNumber]);

  // Функция для обработки children
  const processChildren = (child: ChildrenFunc | React.ReactNode, key?: number) => {
    if (typeof child === 'function') {
      const redactored = child({
        country: state.country,
        countryList: state.countryList,
        onPhoneChange: (e) => state.handlePhoneNumberChange(e.target.value),
        open: isOpen,
        phone: state.phoneNumber ?? '',
      });

      return React.cloneElement(redactored as any, { key });
    }

    return React.cloneElement(child as any, { key });
  };

  // Обработка children, если это массив или одиночный элемент/функция
  const renderedChildren = Array.isArray(children)
    ? children.map((child, index) => processChildren(child, index))
    : processChildren(children);

  return (
    <PhoneInputContextProvider dialog={dialogState} props={phoneProps} state={state}>
      <PhoneInputWrapper {...rest}>{renderedChildren}</PhoneInputWrapper>
    </PhoneInputContextProvider>
  );
}

const PhoneInput = {
  Dialog: PhoneInputDialog,
  Item: PhoneInputItem,
  ItemWithForm: PhoneInputItemWithForm,
  NumberInput: PhoneInputNumberInput,
  NumberInputWithForm: PhoneInputWithForm,
  Portal: PhoneInputPortal,
  Root: PhoneInputRoot,
  Trigger: PhoneInputTrigger,
};
export { PhoneInput };
