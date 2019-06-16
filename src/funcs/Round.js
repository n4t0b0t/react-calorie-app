function round(num) {
  if (num) {
    return +Number(num).toFixed(0);
  } else {
    return "N/A";
  }
}

export default round;
