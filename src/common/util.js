//格式化时间
export function formatDate(data,fmt) {
  if(/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  let o = {
    'M+': data.getMonth() + 1,
    'd+': data.getDate(),
    'h+': data.getHours(),
    'm+': data.getMinutes(),
    's+': data.getSeconds()
  }

  for (let k in o) {
    if(new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str)) 
    }
  }

  return fmt

}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

//获取时间差的分钟数
export function getDifferenceMin(data1,data2) {
  let different = data2.getTime() - data1.getTime()
  if (different <= 0) {
    return 0
  }
  return Math.floor(different/(60*1000))
} 

/**
 * 将秒转化为分
*/
export function countDown(seconds) {
  let days = Math.floor(seconds / (60 * 60 * 24))
  let rest = seconds % (60 * 60 * 24)
  let Hours = Math.floor(rest / (60*60))
  rest = rest % (60*60)
  let minutes = Math.floor(rest / 60)
  rest = rest % 60
  let sec = rest
  if (days > 0) {
    return padLeftZero(Hours+'')+'天'+padLeftZero(Hours+'')+"时"+padLeftZero(minutes+'')+"分"+padLeftZero(sec+'')+'秒'
  } else if (Hours > 0) {
    return padLeftZero(Hours+'')+"时"+padLeftZero(minutes+'')+"分"+padLeftZero(sec+'')+'秒'
  } else {
    return padLeftZero(minutes+'')+"分"+padLeftZero(sec+'')+'秒'
  }
}