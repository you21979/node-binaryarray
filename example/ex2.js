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
var EVENT_CLEAR_MAX = Math.max.apply(Math, Object.keys(EVENT_CLEAR).map(function(k){ return EVENT_CLEAR[k] })) + 1;

var ba = new BinaryArray(EVENT_CLEAR_MAX)

ba.bitOn(EVENT_CLEAR.TUTORIAL);
ba.bitOn(EVENT_CLEAR.QUEST1);
ba.bitOn(EVENT_CLEAR.QUEST4);

var serialize = ba.serialize(EVENT_CLEAR);
console.log(serialize);

var ba2 = BinaryArray.deserialize(serialize, EVENT_CLEAR, EVENT_CLEAR_MAX);
console.log(ba2.serialize(EVENT_CLEAR));

