var BinaryArray = require('..');

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
var EVENT_CLEAR_MAX = Object.keys(EVENT_CLEAR).reduce(function(r, k){ return Math.max(EVENT_CLEAR[k], r) }, 0) + 1;

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
