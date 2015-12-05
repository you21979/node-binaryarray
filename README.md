# binaryarray

[![NPM](https://nodei.co/npm/binaryarray.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/binaryarray)  
[![Build Status](https://secure.travis-ci.org/you21979/node-binaryarray.png?branch=master)](https://travis-ci.org/you21979/node-binaryarray)
[![Coverage Status](https://coveralls.io/repos/you21979/node-binaryarray/badge.png)](https://coveralls.io/r/you21979/node-binaryarray)

## install

```
npm i binaryarray
```

## usage

### simple

```
var BinaryArray = require('binaryarray');
var all_off = BinaryArray.loadFromArray([0,0,0,0,0,0,0,0]);
var all_on = BinaryArray.loadFromArray([1,1,1,1,1,1,1,1]);
```

### application1

* event flag

```
var BinaryArray = require('binaryarray');

var EVENT_CLEAR = {
    TUTORIAL : 0,
    QUEST1 : 1,
    QUEST2 : 2,
    QUEST3 : 3,
    QUEST4 : 4,
    QUEST5 : 5,
    QUEST6 : 6,
    LASTBOSS : 7,
}
var EVENT_CLEAR_MAX = Math.max.apply(Math, Object.keys(EVENT_CLEAR).map(function(k){ return EVENT_CLEAR[k] })) + 1;

var ba = new BinaryArray(EVENT_CLEAR_MAX)

ba.bitOn(EVENT_CLEAR.TUTORIAL);
ba.bitOn(EVENT_CLEAR.QUEST1);
ba.bitOn(EVENT_CLEAR.QUEST4);

var save = ba.toArray();
var ba2 = BinaryArray.loadFromArray(save);
console.log(save);
console.log(ba2.toArray());

ba2.bitOn(2);
ba2.bitOn(3);
ba2.bitOff(4);
console.log(ba.toHexString())
console.log(ba2.toHexString())


if(ba.at(EVENT_CLEAR.QUEST4)) console.log("ok")
if(!ba2.at(EVENT_CLEAR.QUEST4)) console.log("ok")

```

### application2

* job category

```
"use strict"
const BinaryArray = require("binaryarray")

const JOB = Object.freeze({
    NONE : 0,
    FIGHTER : 1,
    MAGE : 2,
    PRIEST : 3,
    MONK : 4,
    KNIGHT : 5,
    SUMMONER : 6,
});

const JOB_MAX = Math.max.apply(Math, Object.keys(JOB).map(k => JOB[k] )) + 1;

let JOB_GROUP = {
    TANK : BinaryArray.deserialize([
        'FIGHTER',
        'MONK',
        'KNIGHT'
    ], JOB, JOB_MAX),
    CASTER : BinaryArray.deserialize([
        'MAGE',
        'PRIEST',
        'SUMMONER'
    ], JOB, JOB_MAX),
    HEALER : BinaryArray.deserialize([
        'PRIEST'
    ], JOB, JOB_MAX),
    EXJOB : BinaryArray.deserialize([
        'SUMMONER',
        'KNIGHT'
    ], JOB, JOB_MAX),
}

let job_id = JOB.FIGHTER;
if( JOB_GROUP.TANK.at(job_id) ){
    console.log("tank job")
}else{
    console.log("not tank job")
}
```
