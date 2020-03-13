/**
 * 封装storage
 */
const STORAGE_KEY = "mall";

export default {
  /**
   * 获取storage全部内容
   */
  getStorage() {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || {};
  },
  /**
   * 一个参数，获取storage某一个key
   * 两个参数，获取storage中moduleName中的key
   */
  getItem(key, moduleName) {
    if (moduleName) {
      let val = this.getItem(moduleName);
      return val[key];
    }
    return this.getStorage()[key];
  },
  /**
   * 两个参数，在storage添加一个key，并赋值value
   * 三个参数，在sotrage的某个moduleName中添加一个key，并赋值
   */
  setItem(key, value, moduleName) {
    if (moduleName) {
      let val = this.getItem(moduleName);
      val[key] = value;
      this.setItem(moduleName, val);
    } else {
      let val = this.getStorage();
      val[key] = value;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    }
  },
  /**
   * 一个参数，清除storage中的key
   * 两个参数，清除storage中moduleName中的key
   */
  clear(key, moduleName) {
    let val = this.getStorage();
    if (moduleName) {
      delete val[moduleName][key];
    } else {
      delete val[key];
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  }
};
