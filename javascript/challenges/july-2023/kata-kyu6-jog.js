function nbrOfLaps(x, y) {
    let lcm = findLCM(x, y);
    return [lcm / x, lcm / y];
  }
  
  function findLCM(a, b) {
    // Function to find the Least Common Multiple (LCM) using the Greatest Common Divisor (GCD).
    return (a * b) / findGCD(a, b);
  }
  
  function findGCD(a, b) {
    // Function to find the Greatest Common Divisor (GCD) using Euclidean algorithm.
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
  