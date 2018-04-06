// Number of bit
const BITS : number = 32;

/**
 * Returns the bit size defined by this module.
 * @returns bit size
 */
export const getBitSize = () : number => BITS

/**
 * Calculate the array length from the number of flags
 * @param flagmax max bits
 * @returns array length
 */
export const getArraySize = (flagmax : number) : number => Math.ceil(flagmax / BITS)

/**
 * Find the position of the array from the flag number
 * @param no flag number
 * @returns array index
 */
export const getArrayIndex = (no : number) : number => Math.floor(no / BITS)

/**
 * Find the bit position from the flag number
 * @param no flag number
 * @returns bit index
 */
export const getFlagPos = (no : number) : number => no % BITS

