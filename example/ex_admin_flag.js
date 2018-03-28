"use strict"
const BinaryArray = require('..')
const getMax = (spec) => Object.keys(spec).reduce((r, k) => Math.max(r, spec[k]), 0) + 1
const ROLE = {
    ADMIN_MANAGER : 0,
    DEVELOPPER : 1,
    BUSINESS_OWNER : 2,
    CUSTOMER_SUPPORT_VIEW : 3,
    CUSTOMER_SUPPORT_UPDATE : 4,
}
const ROLE_MAX = getMax(ROLE)

const ba = new BinaryArray(ROLE_MAX)
for(let i = 0; i < ROLE_MAX; ++i){
    ba.bitOn(i)
}

if(ba.at(ROLE.ADMIN_MANAGER)){
    console.log("ADMIN")
}

console.log(ba.serialize(ROLE))
console.log(ba.toArray(ROLE).join(""))

