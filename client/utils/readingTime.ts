const WORDS_PER_MINUTE = 200;

/**
 * Calculates the reading time of a provided string.
 * Displays a minimum of "1 minute read".
 * Calculation is based on the following source: https://infusion.media/content-marketing/how-to-calculate-reading-time/
 * @param text is the string to calculate reading time
 * @returns the reading time, in number of minutes 
 */
export const readingTime = (text: string): number => Math.max(1, Math.floor(text.split(" ").length / WORDS_PER_MINUTE))