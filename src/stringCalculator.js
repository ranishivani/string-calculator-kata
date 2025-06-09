/**
 * @param {string} input
 * @returns {number}
 */
function add(numbers) {
  if (!numbers) return 0;

  let delimiterRegex = /,|\n/;

  if (numbers.startsWith('//')) {
    const delimiterLineEnd = numbers.indexOf('\n');
    const customDelimiterPart = numbers.substring(2, delimiterLineEnd);
    numbers = numbers.substring(delimiterLineEnd + 1);

    // Handle multiple or multi-char delimiters like //[***][%%]
    const delimiterMatches = customDelimiterPart.match(/\[.*?\]/g);
    if (delimiterMatches) {
      const customDelimiters = delimiterMatches.map((d) => d.slice(1, -1));
      delimiterRegex = new RegExp(
        customDelimiters.map((d) => escapeRegExp(d)).join('|')
      );
    } else {
      delimiterRegex = new RegExp(escapeRegExp(customDelimiterPart));
    }
  }

  const tokens = numbers.split(delimiterRegex);

  // Check for malformed input like "1,\n2"
  if (numbers.match(/(,|\n){2,}/) || numbers.match(/(,|\n)$/)) {
    throw new Error('Malformed input: unexpected delimiter placement');
  }

  const negatives = [];
  const sum = tokens.reduce((acc, val) => {
    const num = Number(val);
    if (isNaN(num)) throw new Error(`Invalid number: '${val}'`);
    if (num < 0) negatives.push(num);
    return num <= 1000 ? acc + num : acc;
  }, 0);

  if (negatives.length) {
    throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
  }

  return sum;
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default add;
