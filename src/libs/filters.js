"use strict"

import utils from  './utils.js'

/**
 * @about 格式化时间
 * @param
 *      date:{number或date}毫秒时间，必填
 *      fmt:{string}需要生成的时间格式，选填 默认  MM-dd hh:mm
 * @return string   格式化时间字符串
 * @author bob
 */
exports.formatTime = function (date, format) {
    return utils.formatTime(date, format);
}


/**
 * @about 格式化价格
 * @param price(分)
 * @return string   格式化价格字符串
 * @author bob
 */
exports.formatPrice = function (price) {
    return utils.formatPrice(price);
}


