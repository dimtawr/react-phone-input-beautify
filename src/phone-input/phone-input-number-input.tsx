'use client';

import clsx from 'clsx';
import React, { forwardRef, useEffect, useRef } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';

import styles from './phone-input.module.scss';
import { usePhoneInput } from './phone-input-provider';

export const PhoneInputNumberInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    const { props: phoneProps, state } = usePhoneInput();
    const { className, ...otherProps } = props;

    const inputRef = useRef<HTMLInputElement>(null);

    // Объединение ref и синхронизация внешнего и внутреннего ref
    useEffect(() => {
      if (typeof ref === 'function') {
        ref(inputRef.current);
      } else if (ref) {
        // eslint-disable-next-line no-param-reassign
        ref.current = inputRef.current;
      }
    }, [ref]);

    // Обработчик изменений, который обновляет состояние
    const calculateCursorPosition = (oldValue: string, newValue: string, oldPosition: number): number => {
      const digitsBeforeCursor = oldValue.slice(0, oldPosition).replace(/\D/g, '').length;

      let newPosition = 0;
      let digitCount = 0;

      for (let i = 0; i < newValue.length; i++) {
        if (/\d/.test(newValue[i])) {
          digitCount++;
        }
        if (digitCount > digitsBeforeCursor) {
          break;
        }
        newPosition = i + 1;
      }

      // Если удален пробел, сдвигаем курсор на одну позицию влево
      if (newValue.length > oldValue.length && newValue[oldPosition] === ' ') {
        newPosition = Math.max(0, newPosition - 1);
      }

      return newPosition;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target;
      const cursorPosition = input.selectionStart;
      const oldValue = input.value;
      const formattedNumber = state.handlePhoneNumberChange(input.value);

      if (formattedNumber !== null) {
        input.value = formattedNumber;
        if (cursorPosition !== null) {
          const newCursorPosition = calculateCursorPosition(oldValue, formattedNumber, cursorPosition);
          input.setSelectionRange(newCursorPosition, newCursorPosition);
        }
      }

      props.onChange?.(e);
    };

    return (
      <input
        {...otherProps}
        {...phoneProps.numberInputProps}
        className={clsx(phoneProps.numberInputProps.className, className)}
        onChange={handleChange}
        ref={inputRef}
      />
    );
  },
);

function PhoneInputWithForm(props: UseControllerProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const {
    field: { ref: inputRef, ...inputProps },
    formState,
  } = useController(props);
  const { state } = usePhoneInput();

  // Optionally, handle reset logic here by checking if field is not dirty
  useEffect(() => {
    if (!formState.isDirty) {
      state.handlePhoneNumberChange('');
    }
  }, [formState.isDirty]);

  return <PhoneInputNumberInput {...props} {...inputProps} ref={inputRef} />;
}

export default PhoneInputWithForm;

export function usePhoneInputNumberInput() {
  return {
    numberInputProps: {
      className: styles.phoneInputNumberInput,
      type: 'tel',
    },
  };
}
