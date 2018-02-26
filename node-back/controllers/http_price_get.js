'use strict';

// https://habrahabr.ru/post/301426/

var apiTools  = require('../sub_modules/api_tools')
var cheerio   = require('cheerio')

exports.apiAction = function(req, res, next) {

  var request             = req.myObj.request.module
  var reqOptions          = {...req.myObj.request.reqOptions}

  reqOptions.url = reqOptions.url+'/index.html'
  request(reqOptions, function(requestErr, requestRes, requestBody) {
    if (requestRes.statusCode === 200) {
      //console.log(requestRes.statusCode)
      //console.log(requestBody)

      var finalArr = []
      var price = null
      var $ = cheerio.load(requestBody)

      // tv
      $('.option > .option__content > .option__items__wrap > .o-items > .o-items__product-1').map((i, row) => {
        price = parseInt($(row).attr('data-tv'))
      })
      finalArr.push({'device': 'tv', 'description': 'Цифровое телевидение / месяц', 'price': price})

      // tv-1
      $('.tv-1').map((i, row) => {
        price = parseInt($(row).attr('data-tv-1-sum'))
      })
      finalArr.push({'device': 'tv-1', 'description': 'ТВ-приемник', 'price': price})

      // wi-fi-1
      $('.wi-fi-1').map((i, row) => {
        price = parseInt($(row).attr('data-wi-fi-1-sum'))
      })
      finalArr.push({'device': 'wi-fi-1', 'description': 'Wi-Fi для 1 ком.кв', 'price': price})

      // wi-fi-2
      $('.wi-fi-2').map((i, row) => {
        price = parseInt($(row).attr('data-wi-fi-2-sum'))
      })
      finalArr.push({'device': 'wi-fi-2', 'description': 'Wi-Fi для 2+ ком.кв', 'price': price})

      // wi-fi-3
      $('.wi-fi-3').map((i, row) => {
        price = parseInt($(row).attr('data-wi-fi-3-sum'))
      })
      finalArr.push({'device': 'wi-fi-3', 'description': 'Настройка Wi-Fi', 'price': price})

      apiTools.apiResJson(res, finalArr, 200)
    }
    else {
      apiTools.apiResJson(res, {code: 202, message: requestRes.statusCode}, 202)
    }
  })


}