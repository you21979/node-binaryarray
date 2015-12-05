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
            assert(ba.indexOf(0) === 1);
        },
        function(){
            var ba = new BinaryArray(32);
            ba.bitOn(0);
            ba.bitOn(1);
            assert(ba.storage[0] === 0x00000003);
            assert(ba.indexOf(0) === 1);
            assert(ba.indexOf(1) === 1);
        },
        function(){
            var ba = new BinaryArray(32);
            ba.bitOn(0);
            ba.bitOn(1);
            ba.bitOn(2);
            assert(ba.storage[0] === 0x00000007);
            assert(ba.indexOf(0) === 1);
            assert(ba.indexOf(1) === 1);
            assert(ba.indexOf(2) === 1);
        },
        function(){
            var ba = new BinaryArray(32);
            ba.bitOn(31);
            assert(ba.storage[0] === 0x80000000);
            assert(ba.indexOf(31) === 1);
        },
        function(){
            var ba = new BinaryArray(33);
            ba.bitOn(32);
            assert(ba.storage[0] === 0x00000000);
            assert(ba.storage[1] === 0x00000001);
            assert(ba.indexOf(31) === 0);
            assert(ba.indexOf(32) === 1);
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
            assert(ba.indexOf(0) === 0);
            assert(ba.indexOf(1) === 1);
        },
        function(){
            var ba = new BinaryArray(32);
            ba.storage[0] = 0xffffffff;
            ba.bitOff(31);
            assert(ba.storage[0] === 0x7fffffff);
            assert(ba.indexOf(0) === 1);
            assert(ba.indexOf(30) === 1);
            assert(ba.indexOf(31) === 0);
        },
        function(){
            var ba = new BinaryArray(64);
            ba.storage[0] = 0xffffffff;
            ba.storage[1] = 0xffffffff;
            ba.bitOff(32);
            assert(ba.storage[0] === 0xffffffff);
            assert(ba.storage[1] === 0xfffffffe);
            assert(ba.indexOf(31) === 1);
            assert(ba.indexOf(32) === 0);
            assert(ba.indexOf(33) === 1);
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
});


