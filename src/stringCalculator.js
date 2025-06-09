function add(numbers) {
  if (numbers === "") return 0;

  let delimiter = /,|\n/;
  let nums = numbers;

  if (numbers.startsWith("//")) {
    const multiDelims = numbers.match(/\/\/(\[.*\])\n/);
    if (multiDelims) {
      const allDelims = [...numbers.matchAll(/\[([^\]]+)\]/g)].map((m) => m[1]);
      delimiter = new RegExp(
        allDelims.map((d) => d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")
      );
      nums = numbers.split("\n")[1];
    } else {
      const singleDelim = numbers.match(/^\/\/(.)\n/);
      if (singleDelim) {
        delimiter = new RegExp(singleDelim[1]);
        nums = numbers.split("\n")[1];
      }
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
