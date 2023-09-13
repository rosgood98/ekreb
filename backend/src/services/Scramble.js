function scramble(a) {
    if (typeof a !== 'string') {
        throw new Error('Input must be a string');
    }
    
    a = a.split("");

    for (var b = a.length - 1; 0 < b; b--) {
        var c = Math.floor(Math.random() * (b + 1));
        d = a[b]; 
        a[b] = a[c]; 
        a[c] =d
    } 

    return a.join("");
}

module.exports = scramble;