function polyfill(name, func) {
  if (Date.prototype[name] === undefined) {
    Date.prototype[name] = func;
  }
}

polyfill('betweenTime', function (start, end) {
  return (this.valueOf() >= start.valueOf() &&
  this.valueOf() <= end.valueOf());
});

polyfill('addMinutes', function (minutes) {
  return this.setMinutes(this.getMinutes() + minutes );
});