
// 配列一つに入るビットの数
const BITS : number = 32;

// フラグ数から配列のサイズを求める
export const getArraySize = (flagmax : number) : number => {
    return Math.ceil(flagmax/BITS);
}

// フラグ番号から配列の位置を求める
export const getArrayIndex = (no : number) : number => {
    return Math.floor(no/BITS);
}

// フラグ番号から実際のフラグの位置を求める
export const getFlagPos = (no : number) : number => {
    return no % BITS;
}


export const digitfix = (str : string, b : number) : string => {
    if(str.length < b ){
        const len = b - str.length;
        for(let i = 0; i < len; ++i){
            str = '0' + str;
        }
    }
    return str;
};

export const hexconv = (n : number) : string => {
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
export const NumberToHexString = (num : number, digit : number) : string => {
    let remainder = 0;
    let str = '';
    while (num > 0) {
        remainder = num % 16;
        num = (num - remainder) / 16;
        str = hexconv(remainder) + str;
    }
    return digitfix(str, digit);
}

// 初期化済みの配列を作成する
export const createArray = (size : number, init_val : number = 0) : Uint32Array => {
    const w = new Uint32Array(size);
    for(let i = 0; i < size; ++i){
        w[i] = init_val;
    }
    return w;
}
