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
    private findBitPosition(no : number) : TupleFlag {
        assert(this.maxnum > no, 'on:over flagmax')
        const idx = getArrayIndex(no)
        assert(idx >= 0 && idx < this.storage.length, 'on:over idx range')
        const pos = getFlagPos(no)
        const flag = 1 << pos
        return [idx, flag]
    }
    bitOn(no : number) : BinaryArray{
        const [idx, flag] = this.findBitPosition(no)
        this.storage[idx] |= flag
        return this
    }
    bitOff(no : number) : BinaryArray{
        const [idx, flag] = this.findBitPosition(no)
        if(this.storage[idx] & flag){
            this.storage[idx] ^= flag
        }
        return this
    }
    at(no : number) : number{
        const [idx, flag] = this.findBitPosition(no)
        return this.storage[idx] & flag ? 1 : 0
    }
    toArray() : Array<number>{
        const results : Array<number> = Array.from( Array(this.maxnum), (v, idx) => this.at(idx))
        return results
    }
    serialize(spec : Object) : Array<string>{
        assert(spec instanceof Object, 'spec is must be Object')
        const flaglist = this.toArray()
        return Object.keys(spec)
            .filter((k) => flaglist[spec[k]])
    }
    toJSON() : string{
        return JSON.stringify(this.toArray())
    }
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
    rangeOf(no_list : number | Array<number>) : Object{
        const xs = (no_list instanceof Array) ? no_list : [no_list]
        return xs.reduce((r : Object, no : number) => {
            r[no] = this.at(no)
            return r
        }, {})
    }
    check(on_list : Array<number>, off_list : Array<number> = []) : boolean{
        const on = this.rangeOf(on_list)
        const off = this.rangeOf(off_list)
        const x = Object.keys(on).reduce((r, v) => { return r & on[v] }, 1)
        const y = Object.keys(off).reduce((r, v) => { return r & ~off[v] }, 1)
        return (x & y) ? true : false
    }
    toHexString() : string{
        let str = ''
        const n = this.storage.length
        for(let i = n - 1; i >= 0; --i){
            str = str + numberToHexString(this.storage[i], 8)
        }
        return str
    }
    clone() : BinaryArray{
        return BinaryArray.loadFromArray(this.toArray())
    }
    static loadFromHexString(maxnum : number, str : string) : BinaryArray{
        const ba = new BinaryArray(maxnum)
        const s = 8
        let b   = str.length - s
        let e   = str.length - 0
        const n = str.length / s
        for(let i = 0; i < n; ++i){
            ba.storage[i] = parseInt(str.substring(b, e), 16)
            b -= s
            e -= s
        }
        return ba
    }
    static loadFromArray(flaglist : Array<number>) : BinaryArray{
        const ba = new BinaryArray(flaglist.length)
        flaglist.map((v : number, i : number) : TupleFlag => [i, v])
            .filter((tuple) => tuple[1])
            .forEach((tuple) => {
                ba.bitOn(tuple[0])
            })
        return ba
    }
    static deserialize(list : Array<string>, spec : Object, max : number) : BinaryArray{
        const ba = new BinaryArray(max)
        list.forEach((v) => { ba.bitOn(spec[v]) })
        return ba
    }
}
