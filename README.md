# binaryarray

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

### application

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


if(ba.indexOf(EVENT_CLEAR.QUEST4)) console.log("ok")
if(!ba2.indexOf(EVENT_CLEAR.QUEST4)) console.log("ok")

```


