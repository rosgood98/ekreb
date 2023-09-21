// Function to scramble a word
// guarantees the end word is different from the start word if length >= 2

/**
 * Scrambled a word, guaranteeing it will never be the same as the original
 * @param {string} a Word to scramble
 * @return {string}  Scrambled word
 */
function scramble(a) {
  if (typeof a !== 'string') {
    throw new Error('Input must be a string');
  }

  const orig = a;

  a = a.split('');

  for (let b = a.length - 1; 0 < b; b--) {
    const c = Math.floor(Math.random() * (b + 1));
    d = a[b];
    a[b] = a[c];
    a[c] = d;
  }

  if (orig == a.join('')) {
    const temp = a[0];
    a[0] = a[1];
    a[1] = temp;
  }

  return a.join('');
}

module.exports = scramble;
