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
ba.bitOn(EVENT_CLEAR.QUEST2);
ba.bitOn(EVENT_CLEAR.QUEST3);
ba.bitOn(EVENT_CLEAR.QUEST4);
ba.bitOff(EVENT_CLEAR.QUEST6);
ba.bitOff(EVENT_CLEAR.LASTBOSS);

if(ba.check([
    EVENT_CLEAR.QUEST1,
    EVENT_CLEAR.QUEST2,
    EVENT_CLEAR.QUEST3,
    EVENT_CLEAR.QUEST4
],[
    EVENT_CLEAR.QUEST6,
    EVENT_CLEAR.LASTBOSS
])){
    console.log("GO LAST BOSS");
}else{
    console.log("BOO");
}


