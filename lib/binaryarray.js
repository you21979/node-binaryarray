"use strict";
var assert = require('assert');
var util = require('./util');

var BinaryArray = module.exports = function(maxnum){
    this.maxnum = maxnum;
    this.storage = util.createArray(util.getArraySize(maxnum), 0);
}
BinaryArray.prototype.toArray = function(){
    var w = [];
    var max = this.maxnum;
    for(var i = 0; i < max; ++i ){
        w.push(this.indexOf(i));
    }
    return w;
}
BinaryArray.prototype.serialize = function(spec){
    assert(spec instanceof Object, 'spec is must be Object')
    var w = this.toArray();
    return Object.keys(spec)
        .filter(function(k){ return w[spec[k]] })
        .map(function(k){ return k })
}
BinaryArray.prototype.toJSON = function(){
    return JSON.stringify(this.toArray())
}
BinaryArray.prototype.isRange = function(no){
    if(!(this.maxnum > no)){
            return false;
    }
    var idx = util.getArrayIndex(no);
    if(!(idx >= 0 && idx < this.storage.length)){
        return false;
    }
    return true;
}
BinaryArray.prototype.indexOf = function(no){
    assert(this.maxnum > no, 'get:over flagmax');
    var idx = util.getArrayIndex(no);
    assert(idx >= 0 && idx < this.storage.length, 'is:over idx range');
    var pos = util.getFlagPos(no);
    var flag = 1 << pos;
    return this.storage[idx] & flag ? 1 : 0;
}
BinaryArray.prototype.rangeOf = function(xs){
    if(!(xs instanceof Array)){
        xs = [xs];
    }
    var self = this;
    return xs.reduce(function(r, v){
        r[v] = self.indexOf(v)
        return r;
    }, {})
}
BinaryArray.prototype.check = function(on_list, off_list){
    var on = this.rangeOf(on_list);
    var off = this.rangeOf(off_list || []);
    var x = Object.keys(on).reduce(function(r,v){ return r & on[v] }, 1)
    var y = Object.keys(off).reduce(function(r,v){ return r & ~off[v] }, 1)
    return (x & y) ? true : false
}
BinaryArray.prototype.bitOn = function(no){
    assert(this.maxnum > no, 'on:over flagmax');
    var idx = util.getArrayIndex(no);
    assert(idx >= 0 && idx < this.storage.length, 'on:over idx range');
    var pos = util.getFlagPos(no);
    var flag = 1 << pos;
    this.storage[idx] |= flag;
    return this;
}
BinaryArray.prototype.bitOff = function(no){
    assert(this.maxnum > no, 'off:over flagmax');
    var idx = util.getArrayIndex(no);
    assert(idx >= 0 && idx < this.storage.length, 'off:over idx range');
    var pos = util.getFlagPos(no);
    var flag = 1 << pos;
    if(this.storage[idx] & flag){
        this.storage[idx] ^= flag;
    }
    return this;
}
BinaryArray.prototype.toHexString = function(){
    var str = '';
    var n = this.storage.length;
    for(var i=n-1;i>=0;--i){
        str = str + util.NumberToHexString(this.storage[i], 8);
    }
    return str;
}
BinaryArray.loadFromHexString = function(maxnum, str){
    var ba = new BinaryArray(maxnum);
    var s = 8;
    var b = str.length-s;
    var e = str.length-0;
    var n = str.length/s;
    for(var i=0;i<n;++i){
        ba.storage[i] = parseInt(str.substring(b,e),16);
        b -= s;
        e -= s;
    }
    return ba;
}
BinaryArray.loadFromArray = function(xs){
    var ba = new BinaryArray(xs.length);
    xs.map(function(v, i){ return [v, i] })
        .filter(function(v){ return v[0] })
        .forEach(function(v){
            ba.bitOn(v[1]);
        })
    return ba;
}
BinaryArray.deserialize = function(list, spec, max){
    var ba = new BinaryArray(max);
    //Object.keys(obj).forEach(function(k){ return ba.bitOn(spec[k]) });
    list.forEach(function(v){ ba.bitOn(spec[v]) })
    return ba;
}

