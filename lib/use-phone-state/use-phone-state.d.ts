import { CountryCode } from 'libphonenumber-js';
import z from 'zod';
export declare const phoneValidationSchema: ({ invalid, required }?: {
    invalid: string;
    required: string;
}) => z.ZodEffects<z.ZodString, string, string>;
export declare function getCountryCode(phone: string): "" | CountryCode | undefined;
export declare function formatPhoneNumber(phoneNumber: string, country?: string): string;
/**
 * Custom React hook to manage phone state including country and phone number.
 *
 * @param initialCountry Initial country code (ISO 3166-1 alpha-2).
 * @param initialPhoneNumber Initial phone number as a string.
 */
export declare const usePhoneState: ({ initialCountry, initialPhoneNumber }?: {
    initialCountry?: string | undefined;
    initialPhoneNumber?: string | undefined;
}) => {
    country: string;
    countryList: import("iso-3166/1").ISO31661AssignedEntry[];
    handleCountryChange: (newCountry: string) => void;
    handlePhoneNumberChange: (newPhoneNumber: string) => string;
    isValid: boolean;
    phoneNumber: string;
};
