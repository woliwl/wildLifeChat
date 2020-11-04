function now(){
    var date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
    minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
    seconds  = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(),
    mseconds = date.getMilliseconds();
    month >= 1 && month <= 9 ? (month = "0" + month) : "";
    day >= 0 && day <= 9 ? (day = "0" + day) : "";
    return hour + ':' + minute + ':' + seconds + ':' + mseconds;
}

// 时间戳转换
function filters(value) {
    var date = new Date(value),//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
    minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
    seconds  = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(),
    mseconds = date.getMilliseconds();
    month >= 1 && month <= 9 ? (month = "0" + month) : "";
    day >= 0 && day <= 9 ? (day = "0" + day) : "";
    return hour + ':' + minute + ':' + seconds + ':' + mseconds;
}
export default {
    now,
    filters
}
