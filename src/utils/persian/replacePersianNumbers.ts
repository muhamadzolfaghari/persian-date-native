const PERSIAN_ZERO = 0x06f0;
const ARABIC_INDIC_ZERO = 0x0660;
const LATIN_ZERO = 0x0030;

/**
 * Replaces Persian (۰-۹) and Arabic-Indic (٠-٩) digits in the input string
 * with their corresponding Latin digits.
 *
 * @param input - The input string containing Persian or Arabic-Indic digits.
 * @returns The input string with those digits replaced by Latin digits.
 */
const replacePersianNumbers = (input: string) =>
  input.replace(/[۰-۹٠-٩]/g, (char) => {
    const code = char.charCodeAt(0);
    const zero = code >= PERSIAN_ZERO ? PERSIAN_ZERO : ARABIC_INDIC_ZERO;
    return String.fromCharCode(code - zero + LATIN_ZERO);
  });

export default replacePersianNumbers;
