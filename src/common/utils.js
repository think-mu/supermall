export function debounce(func, delay) {
  let timer = null

  return function (...args) {
   
    if(timer) clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this, args) //目的是不会总调用，只等时间超过delay才调用func
    }, delay);
  }
}