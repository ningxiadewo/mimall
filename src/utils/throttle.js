/**
 * 节流函数（时间戳方法）
 * @param {fuction} fn
 * @param {number} delay
 */
export function throttle(fn, delay) {
  // 第一次进入，记录当前时间
  let prev = Date.now();
  return function(...args) {
    const context = this;
    // 记录下一次进入的时间
    let now = Date.now();
    // 上一次的时间和这一次的时间差如果大于该延迟时间，则执行回调函数,并记录当前时间
    // 说明在延迟时间内不执行回调函数，必须记录的上一次的和这一次的时间差大于或者等于延迟时间
    if (now - prev >= delay) {
      fn.apply(context, args);
      prev = Date.now();
    }
  };
}
