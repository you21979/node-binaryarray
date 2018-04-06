import * as assert from 'assert'
import {BinaryArray} from '../lib/binaryarray'
import {getSpecMax} from "../lib/util"

describe('test', () => {
    it('array length test',() => {
        [
        ()=>{
            const ba = new BinaryArray(0);
            assert(ba.maxnum === 0);
            assert(ba.storage.length === 0);
        },
        ()=>{
            const ba = new BinaryArray(1);
            assert(ba.maxnum === 1);
            assert(ba.storage.length === 1);
        },
        ()=>{
            const ba = new BinaryArray(32);
            assert(ba.maxnum === 32);
            assert(ba.storage.length === 1);
        },
        ()=>{
            const ba = new BinaryArray(33);
            assert(ba.maxnum === 33);
            assert(ba.storage.length === 2);
        },
        ()=>{
            const ba = new BinaryArray(64);
            assert(ba.maxnum === 64);
            assert(ba.storage.length === 2);
        },
        ()=>{
            const ba = new BinaryArray(65);
            assert(ba.maxnum === 65);
            assert(ba.storage.length === 3);
        }].forEach((f) => { f() })
    });
    it('binary on test', () => {
        [
        ()=>{
            const ba = new BinaryArray(32);
            assert(ba.storage[0] === 0x00000000);
        },
        ()=>{
            const ba = new BinaryArray(32);
            ba.bitOn(0);
            assert(ba.storage[0] === 0x00000001);
            assert(ba.at(0) === 1);
        },
        ()=>{
            const ba = new BinaryArray(32);
            ba.bitOn(0);
            ba.bitOn(1);
            assert(ba.storage[0] === 0x00000003);
            assert(ba.at(0) === 1);
            assert(ba.at(1) === 1);
        },
        ()=>{
            const ba = new BinaryArray(32);
            ba.bitOn(0);
            ba.bitOn(1);
            ba.bitOn(2);
            assert(ba.storage[0] === 0x00000007);
            assert(ba.at(0) === 1);
            assert(ba.at(1) === 1);
            assert(ba.at(2) === 1);
        },
        ()=>{
            const ba = new BinaryArray(32);
            ba.bitOn(31);
            assert(ba.storage[0] === 0x80000000);
            assert(ba.at(31) === 1);
        },
        ()=>{
            const ba = new BinaryArray(33);
            ba.bitOn(32);
            assert(ba.storage[0] === 0x00000000);
            assert(ba.storage[1] === 0x00000001);
            assert(ba.at(31) === 0);
            assert(ba.at(32) === 1);
        },
        ()=>{
            const ba = new BinaryArray(32);
            ba.bitOn(0);
            assert(ba.storage[0] === 0x00000001);
            ba.bitOn(0);
            assert(ba.storage[0] === 0x00000001);
        }].forEach((f) => { f() })
    });
    it('binary off test', () => {
        [
        ()=>{
            const ba = new BinaryArray(32);
            ba.storage[0] = 0xffffffff;
            ba.bitOff(0);
            assert(ba.storage[0] === 0xfffffffe);
            assert(ba.at(0) === 0);
            assert(ba.at(1) === 1);
        },
        ()=>{
            const ba = new BinaryArray(32);
            ba.storage[0] = 0xffffffff;
            ba.bitOff(31);
            assert(ba.storage[0] === 0x7fffffff);
            assert(ba.at(0) === 1);
            assert(ba.at(30) === 1);
            assert(ba.at(31) === 0);
        },
        ()=>{
            const ba = new BinaryArray(64);
            ba.storage[0] = 0xffffffff;
            ba.storage[1] = 0xffffffff;
            ba.bitOff(32);
            assert(ba.storage[0] === 0xffffffff);
            assert(ba.storage[1] === 0xfffffffe);
            assert(ba.at(31) === 1);
            assert(ba.at(32) === 0);
            assert(ba.at(33) === 1);
        },
        ()=>{
            const ba = new BinaryArray(32);
            ba.storage[0] = 0xfffffffe;
            ba.bitOff(0);
            assert(ba.storage[0] === 0xfffffffe);
            ba.bitOff(0);
            assert(ba.storage[0] === 0xfffffffe);
        }].forEach((f) => { f() })
    });
    it('if array test', () => {
        [
        ()=>{
            const input = [1,1,1,1,1,1,1,1];
            const ba = BinaryArray.loadFromArray(input);
            assert(ba.maxnum === 8);
            assert(ba.storage[0] === 0x000000ff);
            const output = ba.toArray();
            assert(JSON.stringify(input) === JSON.stringify(output));
        },
        ()=>{
            const input = [
                1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1
            ];
            const ba = BinaryArray.loadFromArray(input);
            assert(ba.maxnum === input.length);
            assert(ba.storage[0] === 0xffffffff);
            assert(ba.storage[1] === 0x000000ff);
            const output = ba.toArray();
            assert(JSON.stringify(input) === JSON.stringify(output));
        }].forEach((f) => { f() })
    });
    it('if serialize test', () => {
        [
        ()=>{
            const SPEC = {};
            for(let i = 0; i<33; i++){ SPEC['TEST_'+(i+1)] = i }
            const input = ['TEST_1','TEST_2','TEST_33'];
            const SPEC_MAX = getSpecMax(SPEC);
            const ba = BinaryArray.deserialize(input, SPEC, SPEC_MAX);
            assert(ba.maxnum === SPEC_MAX);
            assert(ba.storage[0] === 0x00000003);
            assert(ba.storage[1] === 0x00000001);
            const output = ba.serialize(SPEC);
            assert(JSON.stringify(input) === JSON.stringify(output));
        }].forEach((f) => { f() })
    });
    it('if other test', () => {
        [
        ()=>{
            const input = [
                1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1
            ];
            const ba = BinaryArray.loadFromArray(input);
            assert(ba.toHexString() === 'FFFFFFFF');
        },
        ()=>{
            const input = [
                1,0,0,0,0,0,0,0,
                0,1,0,0,0,0,0,0,
                0,0,1,0,0,0,0,0,
                0,0,0,1,0,0,0,0,
                0,0,0,0,1,0,0,0,
                0,0,0,0,0,1,0,0,
                0,0,0,0,0,0,1,0,
                0,0,0,0,0,0
            ];
            const ba = BinaryArray.loadFromArray(input);
            assert(ba.toHexString() === '0040201008040201');
        },
        ()=>{
            const ba = BinaryArray.loadFromHexString(32, 'FFFFFFFF');
            assert(ba.toHexString() === 'FFFFFFFF');
        },
        ()=>{
            const input = [1,0,1,0,1,0,1];
            const ba = BinaryArray.loadFromArray(input);
            const json = ba.toJSON()
            assert(json === JSON.stringify(input));
        }].forEach((f) => { f() })
    });
    it('other test', () => {
        [
        ()=>{
            const ba = new BinaryArray(1024);
            [0,1,2,3,4,5,10].forEach((v) => { ba.bitOn(v) });
            assert(ba.check([0,1,2,3,4,5]))
            assert(!ba.check([0,1,2,3,4,5], [10]))
            assert(ba.check([0,1,2,3,4,5],[7,8,9]))
        },
        ()=>{
            const ba = new BinaryArray(1024);
            ba.bitOn(3);
            const obj = ba.rangeOf([0,1,2,3,4,5]);
            assert(!obj[0]);
            assert(obj[3]);
        },
        ()=>{
            const ba = new BinaryArray(1024);
            ba.bitOn(3);
            const obj = ba.rangeOf(3);
            assert(obj[3]);
        },
/* todo typescript type
        ()=>{
            let flag = 1;
            const ba = new BinaryArray(1024);
            ba.bitOn(3);
            try{
                const obj = ba.rangeOf("AAA");
            }catch(e){
                flag = 0;
            }
            assert(flag === 0);
        },
*/
        ()=>{
            const ba = new BinaryArray(1024);
            ba.bitOn(3);
            const ba2 = ba.clone()
            assert(ba2.at(3))
        },
        ()=>{
            enum EVENT_CLEAR {
                TUTORIAL,
                QUEST1,
                QUEST2,
                QUEST3,
                QUEST4,
                QUEST5,
                QUEST6,
                LASTBOSS,
                _SIZEOF
            }
            const ba = new BinaryArray(EVENT_CLEAR._SIZEOF)
            assert(ba.maxnum === EVENT_CLEAR._SIZEOF)
            ba.bitOn(EVENT_CLEAR.TUTORIAL);
            ba.bitOn(EVENT_CLEAR.QUEST1);
            ba.bitOn(EVENT_CLEAR.QUEST4);
            assert(ba.at(EVENT_CLEAR.TUTORIAL))
            assert(ba.at(EVENT_CLEAR.QUEST1))
            assert(ba.at(EVENT_CLEAR.QUEST4))
            assert(!ba.at(EVENT_CLEAR.LASTBOSS))
            const output = ba.serialize(EVENT_CLEAR);
            const ba2 = BinaryArray.deserialize(output, EVENT_CLEAR, EVENT_CLEAR._SIZEOF)
            assert(JSON.stringify(output) === JSON.stringify(ba2.serialize(EVENT_CLEAR)))
        },
        ()=>{
            const ba = new BinaryArray(1024);
            assert(ba.isRange(1023));
            assert(!ba.isRange(1024));
            assert(!ba.isRange(-1));
        }].forEach((f) => { f() })
    });
});


