function scramble(a) {
    if (typeof a !== 'string') {
        throw new Error('Input must be a string');
    }

    let orig  = a;
    
    a = a.split("");

    for (var b = a.length - 1; 0 < b; b--) {
        var c = Math.floor(Math.random() * (b + 1));
        d = a[b]; 
        a[b] = a[c]; 
        a[c] =d
    }
    
    if (orig == a.join("")) {
        let temp = a[0];
        a[0] = a[1];
        a[1] = temp;
    }

    return a.join("");
}

module.exports = scramble;