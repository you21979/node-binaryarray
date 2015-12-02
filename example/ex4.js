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
    TANK : BinaryArray.deserialize({
        FIGHTER : 1,
        MONK : 1,
        KNIGHT : 1,
    }, JOB, JOB_MAX),
    CASTER : BinaryArray.deserialize({
        MAGE : 1,
        PRIEST : 1,
        SUMMONER : 1,
    }, JOB, JOB_MAX),
    HEALER : BinaryArray.deserialize({
        PRIEST : 1,
    }, JOB, JOB_MAX),
    EXJOB : BinaryArray.deserialize({
        SUMMONER : 1,
        KNIGHT : 1,
    }, JOB, JOB_MAX),
}

let job_id = JOB.FIGHTER;
if( JOB_GROUP.TANK.check([job_id],[]) ){
    console.log("tank job")
}else{
    console.log("not tank job")
}
