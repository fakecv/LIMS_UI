// 用于排期管理页面日期显示
export default function (Vue) {
  Vue.filter('dateDate', function (tplData) {
    let dateMM = tplData ? new Date(tplData) : new Date()
    return `${dateMM.getFullYear()}/${dateMM.getMonth() + 1}/${dateMM.getDate()}`
  })
  Vue.filter('dateDateNoYear', function (tplData) {
    let dateMM = tplData ? new Date(tplData) : new Date()
    return `${dateMM.getMonth() + 1}/${dateMM.getDate()}`
  })
  Vue.filter('mDate', function (tData) {
    let dateTT = tData ? new Date(tData) : new Date()
    let hours = dateTT.getHours() < 10 ? '0' : ''
    let min = dateTT.getMinutes() < 10 ? '0' : ''
    return `${hours + dateTT.getHours()}:${min + dateTT.getMinutes()}`
  })
  Vue.filter('myDate', function (txData) {
    const days = ['日', '一', '二', '三', '四', '五', '六']
    let dateT = txData ? new Date(txData) : new Date()
    return `星期${days[dateT.getDay()]}`
  })
}
