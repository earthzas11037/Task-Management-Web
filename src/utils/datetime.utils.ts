import { format, parseISO } from 'date-fns';

/**
 * Converts an ISO string to a formatted date string.
 * @param {string} isoString - The ISO string to convert.
 * @param {string} dateFormat - The desired date format.
 * @returns {string} The formatted date string.
 */
export const formatISODate = (isoString: string, dateFormat: string = 'dd/MM/yy HH:mm:ss') => {
  try {
    if (!isoString) return '';
    const date = parseISO(isoString);
    return format(date, dateFormat);
  } catch (err) {
    return '';
  }
};
