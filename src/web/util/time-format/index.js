/**
 * @name 时间格式转换
 */

/* public */

/**
 * @name 日时间格式转换
 * @param {Number} time 毫秒时间
 * @return {String} 日时间字符串
 */
function dayFormat(time) {
  let date = new Date(time)
  let day = `${date.getFullYear()}.${(date.getMonth()+1).toString().padStart(2,0)}.${date.getDate().toString().padStart(2,0)}`

  return day
}

/**
 * @name 钟点时间格式转换
 * @param {Number} time 毫秒时间
 * @return {String} 钟点时间字符串
 */
function clockFormat(time) {
  let date = new Date(time)
  let clock = `${date.getHours().toString().padStart(2,0)}:${date.getMinutes().toString().padStart(2,0)}:${date.getSeconds().toString().padStart(2,0)}`

  return clock
}


/* construct */

export default { dayFormat, clockFormat }
