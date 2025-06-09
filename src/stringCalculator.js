function add(numbers) {
  if (numbers === "") return 0;

  let delimiter = /,|\n/;
  let nums = numbers;

  if (numbers.startsWith("//")) {
    const delimiterMatch = numbers.match(/^\/\/(.+)\n/);
    if (delimiterMatch) {
      delimiter = new RegExp(delimiterMatch[1]);
      nums = numbers.split("\n")[1];
    }
  }

  const parts = nums.split(delimiter).map(Number);
  const negatives = parts.filter((n) => n < 0);
  if (negatives.length > 0) {
    throw new Error(`Negatives not allowed: ${negatives.join(",")}`);
  }

  return parts.filter((n) => n <= 1000).reduce((sum, n) => sum + n, 0);
}

module.exports = add;
