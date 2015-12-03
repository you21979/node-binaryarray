"use strict"
const BinaryArray = require('..')

const JOB = Object.freeze({
    NONE : 0,
    FIGHTER : 1,
    MAGE : 2,
    PRIEST : 3,
    MONK : 4,
    KNIGHT : 5,
    SUMMONER : 6,
});

const JOB_MAX = Object.keys(JOB).reduce((r, k) => Math.max(r, JOB[k]), 0) + 1;

let ba = new BinaryArray(JOB_MAX);
ba.bitOn(JOB.FIGHTER);
ba.bitOn(JOB.PRIEST);
if(ba.check([JOB.FIGHTER, JOB.PRIEST], [JOB.KNIGHT])){
    ba.bitOn(JOB.KNIGHT);
    console.log("EXJOB GET")
}
let save = ba.serialize(JOB);
console.log(save);

let ba2 = BinaryArray.deserialize(save, JOB, JOB_MAX);
if(ba2.check([JOB.FIGHTER, JOB.PRIEST], [JOB.KNIGHT])){
    ba2.bitOn(JOB.KNIGHT);
    console.log("EXJOB GET")
}
console.log(ba2.serialize(JOB));

