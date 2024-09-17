export function clamp(num, lower, upper) {
  return Math.min(Math.max(num, lower), upper);
}

export function inRange(x, min, max) {
  return x >= min && x <= max;
}
