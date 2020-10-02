function myCalculator(method, x, y) {
  switch (method) {
    case "add":
      return x + y;
      break;
    case "subtract":
      return x - y;
      break;
    case "multiply":
      return x * y;
      break;
    case "divide":
      return x / y;
      break;
    default:
      return "you need to specify a method";
  }
}
