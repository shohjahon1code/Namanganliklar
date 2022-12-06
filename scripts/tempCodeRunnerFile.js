var isPalindrome = function (x) {
  const strined = String(x);
  const splitted = strined.split("");
  const reversed = splitted.reverse();
  const joined = reversed.join("");
  if (joined == x) {
    return joined;
  } else if (x <= 0) {
    return x;
  } else {
    return false;
  }
};

console.log(isPalindrome(0));