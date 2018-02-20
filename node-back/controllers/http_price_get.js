'use strict';

// https://habrahabr.ru/post/301426/

var apiTools  = require('../sub_modules/api_tools')
var cheerio   = require('cheerio')

exports.apiAction = function(req, res, next) {

  var request             = req.myObj.request.module
  var reqOptions          = {...req.myObj.request.reqOptions}
  var device              = req.swagger.params.device.value

  reqOptions.url = reqOptions.url+'/index.html'
  request(reqOptions, function(requestErr, requestRes, requestBody) {
    if (requestRes.statusCode === 200) {
      //console.log(requestRes.statusCode)
      //console.log(requestBody)

      var final = {'device': device}
      var $ = cheerio.load(requestBody)

      switch (device) {
        case 'tv':
          $('.option > .option__content > .option__items__wrap > .o-items > .o-items__product-1').map((i, row) => {
            final.price = parseInt($(row).attr('data-tv'))
          })
          apiTools.apiResJson(res, final, 200)
          break

        case 'tv-1':
          $('.tv-1').map((i, row) => {
            final.price = parseInt($(row).attr('data-tv-1-sum'))
          })
          apiTools.apiResJson(res, final, 200)
          break

        case 'wi-fi-1':
          $('.wi-fi-1').map((i, row) => {
            final.price = parseInt($(row).attr('data-wi-fi-1-sum'))
          })
          apiTools.apiResJson(res, final, 200)
          break

        case 'wi-fi-2':
          $('.wi-fi-2').map((i, row) => {
            final.price = parseInt($(row).attr('data-wi-fi-2-sum'))
          })
          apiTools.apiResJson(res, final, 200)
          break

        case 'wi-fi-3':
          $('.wi-fi-3').map((i, row) => {
            final.price = parseInt($(row).attr('data-wi-fi-3-sum'))
          })
          apiTools.apiResJson(res, final, 200)
          break

        default:
          apiTools.apiResJson(res, {code: 202, message: 'no device'}, 202)
          break
      }

    }
    else {
      apiTools.apiResJson(res, {code: 202, message: requestRes.statusCode}, 202)
    }
  })


}