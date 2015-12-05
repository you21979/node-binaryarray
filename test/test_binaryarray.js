var assert = require('power-assert');
var BinaryArray = require('../');

describe('test', function() {
    describe('array length test', function() {
        [
        function(){
            var ba = new BinaryArray(0);
            assert(ba.maxnum === 0);
            assert(ba.storage.length === 0);
        },
        function(){
            var ba = new BinaryArray(1);
            assert(ba.maxnum === 1);
            assert(ba.storage.length === 1);
        },
        function(){
            var ba = new BinaryArray(32);
            assert(ba.maxnum === 32);
            assert(ba.storage.length === 1);
        },
        function(){
            var ba = new BinaryArray(33);
            assert(ba.maxnum === 33);
            assert(ba.storage.length === 2);
        },
        function(){
            var ba = new BinaryArray(64);
            assert(ba.maxnum === 64);
            assert(ba.storage.length === 2);
        },
        function(){
            var ba = new BinaryArray(65);
            assert(ba.maxnum === 65);
            assert(ba.storage.length === 3);
        }].forEach(function(f){f()})
    });
    describe('binary on test', function() {
        [
        function(){
            var ba = new BinaryArray(32);
            assert(ba.storage[0] === 0x00000000);
        },
        function(){
            var ba = new BinaryArray(32);
            ba.bitOn(0);
            assert(ba.storage[0] === 0x00000001);
            assert(ba.at(0) === 1);
        },
        function(){
            var ba = new BinaryArray(32);
            ba.bitOn(0);
            ba.bitOn(1);
            assert(ba.storage[0] === 0x00000003);
            assert(ba.at(0) === 1);
            assert(ba.at(1) === 1);
        },
        function(){
            var ba = new BinaryArray(32);
            ba.bitOn(0);
            ba.bitOn(1);
            ba.bitOn(2);
            assert(ba.storage[0] === 0x00000007);
            assert(ba.at(0) === 1);
            assert(ba.at(1) === 1);
            assert(ba.at(2) === 1);
        },
        function(){
            var ba = new BinaryArray(32);
            ba.bitOn(31);
            assert(ba.storage[0] === 0x80000000);
            assert(ba.at(31) === 1);
        },
        function(){
            var ba = new BinaryArray(33);
            ba.bitOn(32);
            assert(ba.storage[0] === 0x00000000);
            assert(ba.storage[1] === 0x00000001);
            assert(ba.at(31) === 0);
            assert(ba.at(32) === 1);
        },
        function(){
            var ba = new BinaryArray(32);
            ba.bitOn(0);
            assert(ba.storage[0] === 0x00000001);
            ba.bitOn(0);
            assert(ba.storage[0] === 0x00000001);
        }].forEach(function(f){f()})
    });
    describe('binary off test', function() {
        [
        function(){
            var ba = new BinaryArray(32);
            ba.storage[0] = 0xffffffff;
            ba.bitOff(0);
            assert(ba.storage[0] === 0xfffffffe);
            assert(ba.at(0) === 0);
            assert(ba.at(1) === 1);
        },
        function(){
            var ba = new BinaryArray(32);
            ba.storage[0] = 0xffffffff;
            ba.bitOff(31);
            assert(ba.storage[0] === 0x7fffffff);
            assert(ba.at(0) === 1);
            assert(ba.at(30) === 1);
            assert(ba.at(31) === 0);
        },
        function(){
            var ba = new BinaryArray(64);
            ba.storage[0] = 0xffffffff;
            ba.storage[1] = 0xffffffff;
            ba.bitOff(32);
            assert(ba.storage[0] === 0xffffffff);
            assert(ba.storage[1] === 0xfffffffe);
            assert(ba.at(31) === 1);
            assert(ba.at(32) === 0);
            assert(ba.at(33) === 1);
        },
        function(){
            var ba = new BinaryArray(32);
            ba.storage[0] = 0xfffffffe;
            ba.bitOff(0);
            assert(ba.storage[0] === 0xfffffffe);
            ba.bitOff(0);
            assert(ba.storage[0] === 0xfffffffe);
        }].forEach(function(f){f()})
    });
    describe('if array test', function() {
        [
        function(){
            var input = [1,1,1,1,1,1,1,1];
            var ba = BinaryArray.loadFromArray(input);
            assert(ba.maxnum === 8);
            assert(ba.storage[0] === 0x000000ff);
            var output = ba.toArray();
            assert(JSON.stringify(input) === JSON.stringify(output));
        },
        function(){
            var input = [
                1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1
            ];
            var ba = BinaryArray.loadFromArray(input);
            assert(ba.maxnum === input.length);
            assert(ba.storage[0] === 0xffffffff);
            assert(ba.storage[1] === 0x000000ff);
            var output = ba.toArray();
            assert(JSON.stringify(input) === JSON.stringify(output));
        }].forEach(function(f){f()})
    });
    describe('if serialize test', function() {
        [
        function(){
            var SPEC = {};
            for(var i = 0; i<33; i++){ SPEC['TEST_'+(i+1)] = i }
            var input = ['TEST_1','TEST_2','TEST_33'];
            var ba = BinaryArray.deserialize(input, SPEC, i);
            assert(ba.maxnum === i);
            assert(ba.storage[0] === 0x00000003);
            assert(ba.storage[1] === 0x00000001);
            var output = ba.serialize(SPEC);
            assert(JSON.stringify(input) === JSON.stringify(output));
        }].forEach(function(f){f()})
    });
    describe('if other test', function() {
        [
        function(){
            var input = [
                1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1,
                1,1,1,1,1,1,1,1
            ];
            var ba = BinaryArray.loadFromArray(input);
            assert(ba.toHexString() === 'FFFFFFFF');
        },
        function(){
            var input = [
                1,0,0,0,0,0,0,0,
                0,1,0,0,0,0,0,0,
                0,0,1,0,0,0,0,0,
                0,0,0,1,0,0,0,0,
                0,0,0,0,1,0,0,0,
                0,0,0,0,0,1,0,0,
                0,0,0,0,0,0,1,0,
                0,0,0,0,0,0
            ];
            var ba = BinaryArray.loadFromArray(input);
            assert(ba.toHexString() === '0040201008040201');
        },
        function(){
            var ba = BinaryArray.loadFromHexString(32, 'FFFFFFFF');
            assert(ba.toHexString() === 'FFFFFFFF');
        },
        function(){
            var input = [1,0,1,0,1,0,1];
            var ba = BinaryArray.loadFromArray(input);
            var json = ba.toJSON()
            assert(json === JSON.stringify(input));
        }].forEach(function(f){f()})
    });
    describe('other test', function() {
        [
        function(){
            var ba = new BinaryArray(1024);
            [0,1,2,3,4,5,10].forEach(function(v){ ba.bitOn(v) });
            assert(ba.check([0,1,2,3,4,5]))
            assert(!ba.check([0,1,2,3,4,5], [10]))
            assert(ba.check([0,1,2,3,4,5],[7,8,9]))
        },
        function(){
            var ba = new BinaryArray(1024);
            ba.bitOn(3);
            var obj = ba.rangeOf([0,1,2,3,4,5]);
            assert(!obj[0]);
            assert(obj[3]);
        },
        function(){
            var ba = new BinaryArray(1024);
            ba.bitOn(3);
            var obj = ba.rangeOf(3);
            assert(obj[3]);
        },
        function(){
            var ba = new BinaryArray(1024);
            ba.bitOn(3);
            try{
                var obj = ba.rangeOf("AAA");
            }catch(e){
            }
        },
        function(){
            var ba = new BinaryArray(1024);
            assert(ba.isRange(1023));
            assert(!ba.isRange(1024));
            assert(!ba.isRange(-1));
        }].forEach(function(f){f()})
    });
});


