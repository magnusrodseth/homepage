import { format, parseISO } from "date-fns";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * Finds the suffix for the provided date number.
 * @param date is the date number to find the suffix for.
 * @returns a string representation of the suffix for the date number.
 */
const suffix = (date: number): string => {
    if (date > 3 && date < 21) {
        return 'th';
    }

    switch (date % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

/**
 * Parses a provided DateTime object (from API) to a readable string.
 * @param date is the DateTime object as a string.
 * @returns a readable string representation of the DateTime.
 */
export const parseDate = (date: string): string => format(parseISO(date), "MMMM dd yyyy") 