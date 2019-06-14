function round(num) {
  if (num) {
    return +Number(num).toFixed(2);
  } else {
    return "N/A";
  }
}

export default round;
