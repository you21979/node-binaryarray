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
if( JOB_GROUP.TANK.indexOf(job_id) ){
    console.log("tank job")
}else{
    console.log("not tank job")
}

