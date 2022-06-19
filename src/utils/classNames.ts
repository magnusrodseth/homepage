/**
 * @param classes is a variable length string array with classnames 
 * @returns the provided classnames separated by a space [" "]
 */
const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

export default classNames;