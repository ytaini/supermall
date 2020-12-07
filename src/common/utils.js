
export function debounce(func, delay) {  //防抖函数

  let timer = null ;    

  return (...args) => {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
       func.apply(this, args);
    }, delay);
    /* 
      setTimeout中的函数，将会在事件的一次循环的最后执行
    */
  }
}