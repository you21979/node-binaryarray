import * as assert from 'assert';
import * as util from './util';

export class BinaryArray{
    readonly maxnum: number;
    readonly storage: Uint32Array;
    constructor(maxnum : number){
        this.maxnum = maxnum
        this.storage = util.createArray(util.getArraySize(maxnum), 0)
    }
    bitOn(no : number) : BinaryArray{
        assert(this.maxnum > no, 'on:over flagmax');
        const idx = util.getArrayIndex(no);
        assert(idx >= 0 && idx < this.storage.length, 'on:over idx range');
        const pos = util.getFlagPos(no);
        const flag = 1 << pos;
        this.storage[idx] |= flag;
        return this;
    }
    bitOff(no : number) : BinaryArray{
        assert(this.maxnum > no, 'off:over flagmax');
        const idx = util.getArrayIndex(no);
        assert(idx >= 0 && idx < this.storage.length, 'off:over idx range');
        const pos = util.getFlagPos(no);
        const flag = 1 << pos;
        if(this.storage[idx] & flag){
            this.storage[idx] ^= flag;
        }
        return this;
    }
    at(no : number) : number{
        assert(this.maxnum > no, 'get:over flagmax');
        const idx = util.getArrayIndex(no);
        assert(idx >= 0 && idx < this.storage.length, 'is:over idx range');
        const pos = util.getFlagPos(no);
        const flag = 1 << pos;
        return this.storage[idx] & flag ? 1 : 0;
    }
    toArray() : Array<number>{
        const w : Array<number> = [];
        const max = this.maxnum;
        for(let i = 0; i < max; ++i ){
            w.push(this.at(i));
        }
        return w;
    }
    serialize(spec : Object) : Array<string>{
        assert(spec instanceof Object, 'spec is must be Object')
        const w = this.toArray();
        return Object.keys(spec)
            .filter((k) => w[spec[k]])
    }
    toJSON() : string{
        return JSON.stringify(this.toArray())
    }
    isRange(no : number) : boolean{
        if(!(this.maxnum > no)){
                return false;
        }
        const idx = util.getArrayIndex(no);
        if(!(idx >= 0 && idx < this.storage.length)){
            return false;
        }
        return true;
    }
    rangeOf(xs :  any) : Object{
        if(!(xs instanceof Array)){
            xs = [xs];
        }
        return xs.reduce((r, v) => {
            r[v] = this.at(v)
            return r;
        }, {})
    }
    check(on_list : Array<number>, off_list : Array<number> = []) : boolean{
        const on = this.rangeOf(on_list);
        const off = this.rangeOf(off_list);
        const x = Object.keys(on).reduce((r, v) => { return r & on[v] }, 1)
        const y = Object.keys(off).reduce((r, v) => { return r & ~off[v] }, 1)
        return (x & y) ? true : false
    }
    toHexString() : string{
        let str = '';
        const n = this.storage.length;
        for(let i = n - 1; i >= 0; --i){
            str = str + util.NumberToHexString(this.storage[i], 8);
        }
        return str;
    }
    clone() : BinaryArray{
        return BinaryArray.loadFromArray(this.toArray());
    }
    static loadFromHexString(maxnum : number, str : string) : BinaryArray{
        const ba = new BinaryArray(maxnum);
        const s = 8;
        let b   = str.length - s;
        let e   = str.length - 0;
        const n = str.length / s;
        for(let i = 0; i < n; ++i){
            ba.storage[i] = parseInt(str.substring(b,e), 16);
            b -= s;
            e -= s;
        }
        return ba;
    }
    static loadFromArray(xs : Array<number>) : BinaryArray{
        const ba = new BinaryArray(xs.length);
        xs.map((v, i) => [v, i])
            .filter((v) => v[0])
            .forEach((v) => {
                ba.bitOn(v[1]);
            })
        return ba;
    }
    static deserialize(list : Array<string>, spec : Object, max : number) : BinaryArray{
        const ba = new BinaryArray(max);
        list.forEach((v) => { ba.bitOn(spec[v]) })
        return ba;
    }
}
