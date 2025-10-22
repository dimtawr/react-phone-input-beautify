'use client';

import { iso31661 } from 'iso-3166';
import {
  AsYouType,
  CountryCode,
  getCountryCallingCode,
  getPhoneCode,
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from 'libphonenumber-js';
import { useState } from 'react';
import z from 'zod';

export const phoneValidationSchema = (
  { invalid, required } = {
    invalid: 'Invalid phone number',
    required: 'Phone number is required',
  },
) =>
  z
    .string({
      required_error: required,
    })
    .refine((value) => {
      try {
        return isValidPhoneNumber(value);
      } catch (error) {
        return false;
      }
    }, invalid);

export function getCountryCode(phone: string) {
  const parsedNumber = parsePhoneNumberFromString(phone);
  if (!parsedNumber) {
    return '';
  }
  return parsedNumber.country;
}

export function formatPhoneNumber(phoneNumber: string, country?: string) {
  const asYouType = new AsYouType(country as CountryCode);

  if (!phoneNumber) {
    return `+${getPhoneCode(country as CountryCode)}`;
  }

  const formattedNumber = asYouType.input(phoneNumber);

  if (formattedNumber) {
    return formattedNumber;
  }

  return phoneNumber;
}

/**
 * Custom React hook to manage phone state including country and phone number.
 *
 * @param initialCountry Initial country code (ISO 3166-1 alpha-2).
 * @param initialPhoneNumber Initial phone number as a string.
 */
export const usePhoneState = ({ initialCountry = 'US', initialPhoneNumber = '' } = {}) => {
  const [country, setCountry] = useState(initialCountry);
  const initialCountryCode = getCountryCallingCode(initialCountry as CountryCode);
  const [phoneNumber, setPhoneNumber] = useState(() => formatPhoneNumber(initialPhoneNumber, initialCountry));
  const [isValid, setIsValid] = useState(() => phoneValidationSchema().safeParse(initialPhoneNumber).success);

  // Resets the phone number to initial conditions
  const resetPhoneNumber = () => {
    setPhoneNumber(`+${initialCountryCode}`);
    setCountry(initialCountry);
    setIsValid(false);
  };

  // Formats phone number and updates states
  const formatAsYouType = (phone: string, currentCountry: string): string => {
    const asYouType = new AsYouType(currentCountry as CountryCode);
    return asYouType.input(phone.startsWith('+') ? phone : `+${phone}`);
  };

  // Updates phone number and validity based on the formatted input
  const updatePhoneNumberState = (formattedNumber: string) => {
    const asYouType = new AsYouType(country as CountryCode);
    asYouType.input(formattedNumber);
    const parsedNumber = asYouType.getNumber();
    setPhoneNumber(formattedNumber);

    if (parsedNumber && parsedNumber.isValid()) {
      setIsValid(true);
      const newCountry = parsedNumber.country;
      if (newCountry && newCountry !== country) {
        setCountry(newCountry);
      }
    } else {
      setIsValid(false);
    }
  };

  const handleCountryChange = (newCountry: string) => {
    try {
      const phoneCode = getCountryCallingCode(newCountry as CountryCode);
      setPhoneNumber(`+${phoneCode}`);
      setCountry(newCountry);
      setIsValid(false); // Assume phone number is not valid until verified
    } catch (error) {
      console.error('Error fetching country calling code:', error);
      setPhoneNumber('');
      setCountry(newCountry); // Still update the country
    }
  };

  const handlePhoneNumberChange = (newPhoneNumber: string): string => {
    const trimmedPhone = newPhoneNumber.trim();
    if (!trimmedPhone) {
      resetPhoneNumber();
      return '';
    }

    const formattedNumber = formatAsYouType(trimmedPhone, country);
    updatePhoneNumberState(formattedNumber);
    return formattedNumber;
  };

  return {
    country,
    countryList: iso31661,
    handleCountryChange,
    handlePhoneNumberChange,
    isValid,
    phoneNumber,
  };
};
