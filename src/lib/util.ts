
// Number of bit
const BITS : number = 32;

/**
 * Calculate the array length from the number of flags
 * @param flagmax max bits
 * @returns array length
 */
export const getArraySize = (flagmax : number) : number => {
    return Math.ceil(flagmax / BITS);
}

/**
 * Find the position of the array from the flag number
 * @param no flag number
 * @returns array index
 */
export const getArrayIndex = (no : number) : number => {
    return Math.floor(no / BITS);
}

/**
 * Find the bit position from the flag number
 * @param no flag number
 * @returns bit index
 */
export const getFlagPos = (no : number) : number => {
    return no % BITS;
}

/**
 * Make it a number from hex string
 * @param num
 * @param digit
 * @returns hexstring
 */
export const NumberToHexString = (num : number, digit : number) : string => {
    const template = Array.from(Array(digit), () => 0).join('')
    const hexstring = num.toString(16).toUpperCase()
    return (template + hexstring).slice(-digit)
}

/**
 * Create an initialized typed-array
 * @param size array length
 * @param init_val initialize value
 * @returns initialized typed-arrray
 */
export const createArray = (size : number, init_val : number = 0) : Uint32Array => {
    const w = new Uint32Array(size);
    for(let i = 0; i < size; ++i){
        w[i] = init_val;
    }
    return w;
}

/**
 * max value of object propaties
 * @param spec enum-like Object
 * @returns max value
 */
export const getSpecMax = (spec : Object) : number => {
    return Object.keys(spec).reduce((r, k) => Math.max(r, spec[k]), 0) + 1
}

