module.exports = {
  smooth(value, last, factor = 0.7) {
    return last + (value - last) * factor;
  }
};