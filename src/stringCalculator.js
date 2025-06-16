/**
 * @param {string} input
 * @returns {number}
 */
function add(numbers) {
  if (!numbers) return 0;

  // Check for malformed input like "1,\n2"
  handleIncorrectInput(numbers);

  const tokens = parseInt(numbers); // [1,2,3]

  handleNegatives(tokens);

  handleNaN(tokens);

  const sum = tokens.reduce((acc, num) => {
    return num <= 1000 ? acc + num : acc;
  }, 0);

  return sum;
}

function handleIncorrectInput(numbers) {
  if (numbers.match(/(,|\n){2,}/) || numbers.match(/(,|\n)$/)) {
    throw new Error('Malformed input: unexpected delimiter placement');
  }
}

function handleNaN(tokens) {
  tokens.some((num) => {
    if (isNaN(num)) throw new Error(`Invalid number: '${num}'`);
  });
}

function handleNegatives(tokens) {
  const negatives = tokens.filter((number) => number < 0);

  if (negatives.length) {
    throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
  }
}

function parseInt(numbers) {
  let delimiterRegex = /,|\n/;

  if (numbers.startsWith('//')) {
    const delimiterLineEnd = numbers.indexOf('\n'); //1,2,3\n4,5,6
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

  return tokens.map((token) => Number(token));
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default add;
