/**
 * Capitalizes a string.
 * 
 * @param string is the string to capitalize.
 * @returns a capitalized representation of the string.
 */
const capitalize = (string: string) => {
    return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase();
}

export default capitalize