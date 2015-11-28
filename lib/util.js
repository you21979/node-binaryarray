"use strict";

// 配列一つに入るビットの数
var BITS = 32;

// フラグ数から配列のサイズを求める
var getArraySize = exports.getArraySize = function(flagmax){
    return Math.ceil(flagmax/BITS);
};
// フラグ番号から配列の位置を求める
var getArrayIndex = exports.getArrayIndex = function(no){
    return Math.floor(no/BITS);
};
// フラグ番号から実際のフラグの位置を求める
var getFlagPos = exports.getFlagPos = function(no){
    return no % BITS;
};
var digitfix = exports.digitfix = function(str, b){
    if(str.length < b ){
        var len = b - str.length;
        for(var i = 0; i < len; ++i){
            str = '0' + str;
        }
    }
    return str;
};
var hexconv = exports.hexconv = function(n){
    switch (n) {
        case 10: return 'A';
        case 11: return 'B';
        case 12: return 'C';
        case 13: return 'D';
        case 14: return 'E';
        case 15: return 'F';
    }
    return n.toString();
};
// 数値からヘックスの文字列にする
var NumberToHexString = exports.NumberToHexString = function(num, digit){
    var remainder = 0;
    var str = '';
    while (num > 0) {
        remainder = num % 16;
        num = (num - remainder) / 16;
        str = hexconv(remainder) + str;
    }
    return digitfix(str, digit);
}

// 初期化済みの配列を作成する
var createArray = exports.createArray = function(size, init_val){
    init_val = init_val || 0;
    var w = new Uint32Array(size);
    for(var i = 0; i < size; ++i){
        w[i] = init_val;
    }
    return w;
}
