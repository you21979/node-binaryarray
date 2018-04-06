import * as assert from 'assert'
import { numberToHexString, createArray, getSpecMax } from './util'
import { getArraySize, getArrayIndex, getFlagPos } from './bitsize_util'

type TupleFlag = [number, number]

export class BinaryArray{
    readonly maxnum: number
    readonly storage: Uint32Array
    constructor(maxnum : number){
        this.maxnum = maxnum
        this.storage = createArray(getArraySize(maxnum), 0)
    }
    /**
     * resolve the internal position from the flag number.
     * @param no flag number
     * @returns Tuple of array index and bit flag
     */
    private findBitPosition(no : number) : TupleFlag {
        assert(this.maxnum > no, 'on:over flagmax')
        const idx = getArrayIndex(no)
        assert(idx >= 0 && idx < this.storage.length, 'on:over idx range')
        const pos = getFlagPos(no)
        const flag = 1 << pos
        return [idx, flag]
    }
    /**
     * Set the bit of the specified flag number
     * @param no flag number
     * @returns this instance
     */
    bitOn(no : number) : BinaryArray{
        const [idx, flag] = this.findBitPosition(no)
        this.storage[idx] |= flag
        return this
    }
    /**
     * Erase the bit of the specified flag number
     * @param no flag number
     * @returns this instance
     */
    bitOff(no : number) : BinaryArray{
        const [idx, flag] = this.findBitPosition(no)
        if(this.storage[idx] & flag){
            this.storage[idx] ^= flag
        }
        return this
    }
    /**
     * Get the value of the specified flag number
     * @param no flag number
     * @returns this instance
     */
    at(no : number) : number{
        const [idx, flag] = this.findBitPosition(no)
        return this.storage[idx] & flag ? 1 : 0
    }
    /**
     * Check whether the flag number is valid
     * @param no flag number
     * @returns 
     */
    isRange(no : number) : boolean{
        if(!(this.maxnum > no)){
                return false
        }
        const idx = getArrayIndex(no)
        if(!(idx >= 0 && idx < this.storage.length)){
            return false
        }
        return true
    }
    /**
     * Specify multiple flag numbers to acquire
     * @param no_list flag numbers
     * @returns
     */
    rangeOf(no_list : number | Array<number>) : Object{
        const xs = (no_list instanceof Array) ? no_list : [no_list]
        return xs.reduce((r : Object, no : number) => {
            r[no] = this.at(no)
            return r
        }, {})
    }
    /**
     * Specify multiple flag numbers and check whether condition is satisfied
     * @param on_list flag on list
     * @param off_list flag off list [optional]
     * @returns
     */
    check(on_list : Array<number>, off_list : Array<number> = []) : boolean{
        const on = this.rangeOf(on_list)
        const off = this.rangeOf(off_list)
        const x = Object.keys(on).reduce((r, v) => { return r & on[v] }, 1)
        const y = Object.keys(off).reduce((r, v) => { return r & ~off[v] }, 1)
        return (x & y) ? true : false
    }
    /**
     * export flag list
     * @returns flaglist
     */
    toArray() : Array<number>{
        const results : Array<number> = Array.from( Array(this.maxnum), (v, idx) => this.at(idx))
        return results
    }
    /**
     * Serialize flag data with Enum-like object.
     * @param enum-like object
     * @returns serialized string list
     */
    serialize(spec : Object) : Array<string>{
        assert(spec instanceof Object, 'spec is must be Object')
        const flaglist = this.toArray()
        return Object.keys(spec)
            .filter((k) => flaglist[spec[k]])
    }
    /**
     * JSON wrap toArray method
     * @returns JSON string
     */
    toJSON() : string{
        return JSON.stringify(this.toArray())
    }
    /**
     * internal storage to hex string
     * @returns hexstring
     */
    toHexString() : string{
        let str = ''
        const n = this.storage.length
        for(let i = n - 1; i >= 0; --i){
            str = str + numberToHexString(this.storage[i], 8)
        }
        return str
    }
    /**
     * make clone instance
     * @returns new instance
     */
    clone() : BinaryArray{
        return BinaryArray.loadFromArray(this.toArray())
    }
    /**
     * create new instance from hex string
     * @param maxnum max flag number
     * @param hexstr hexstring
     * @returns new instance
     */
    static loadFromHexString(maxnum : number, hexstr : string) : BinaryArray{
        const ba = new BinaryArray(maxnum)
        const s = 8 // uint32 hexstring size (4 * 2)
        let b   = hexstr.length - s
        let e   = hexstr.length - 0
        const n = hexstr.length / s
        for(let i = 0; i < n; ++i){
            ba.storage[i] = parseInt(hexstr.substring(b, e), 16)
            b -= s
            e -= s
        }
        return ba
    }
    /**
    * create new instance from flag array
     * @param flaglist
     * @returns new instance
     */
    static loadFromArray(flaglist : Array<number>) : BinaryArray{
        return flaglist.map((value : number, index : number) : TupleFlag => [index, value])
            .filter((tuple) => tuple[1])
            .reduce((ba : BinaryArray, tuple : TupleFlag) => {
                return ba.bitOn(tuple[0])
            }, new BinaryArray(flaglist.length))
    }
    /**
     * create new instance from serialize data
     * @param keylist enum-like key
     * @param spec enum-like object
     * @param maxnum max flag number
     * @returns new instance
     */
    static deserialize(keylist : Array<string>, spec : Object, maxnum : number) : BinaryArray{
        return keylist.map(key => spec[key]).reduce((ba : BinaryArray, no : number) => {
            return ba.bitOn(no)
        }, new BinaryArray(maxnum))
    }
}
