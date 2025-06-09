const add = require("../src/stringCalculator");

test("returns 0 for empty string", () => {
  expect(add("")).toBe(0);
});

test('returns 1 for "1"', () => {
  expect(add("1")).toBe(1);
});

test('returns 3 for "1,2"', () => {
  expect(add("1,2")).toBe(3);
});

test("handles new lines between numbers", () => {
  expect(add("1\n2,3")).toBe(6);
});

test("supports custom delimiter specified like //;\n", () => {
  expect(add("//;\n1;2")).toBe(3);
});
