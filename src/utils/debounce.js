/**
 * 防抖函数
 * @param {function} fn
 * @param {number} delay
 */
export function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(
      () => {
        fn.apply(this, args);
      },

      delay
    );
  };
}
