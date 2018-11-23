// localStorage.setItem("key","value");//以“key”为名称存储一个值“value”
// localStorage.getItem("key");//获取名称为“key”的值
// localStorage.removeItem("key");//删除名称为“key”的信息。
export const setStorageItem = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const getStorageItem = (key) => {
  return JSON.parse(window.localStorage.getItem(key))
}

export const removeStorageItem = (key) => {
  window.localStorage.removeItem(key)
}
