function add(numbers) {
  if (numbers === "") return 0;

  let delimiter = /,|\n/;
  let nums = numbers;

  // Custom delimiter syntax
  if (numbers.startsWith("//")) {
    const delimiterMatch = numbers.match(/^\/\/(.+)\n/);
    if (delimiterMatch) {
      delimiter = new RegExp(delimiterMatch[1]);
      nums = numbers.split("\n")[1];
    }
  }

  return nums.split(delimiter).reduce((sum, num) => sum + Number(num), 0);
}

module.exports = add;
