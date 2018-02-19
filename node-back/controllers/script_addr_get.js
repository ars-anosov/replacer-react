'use strict';

var apiTools  = require('../sub_modules/api_tools')

var path      = require('path')


exports.apiAction = function(req, res, next) {

  var request             = req.myObj.request.module
  var reqOptions          = {...req.myObj.request.reqOptions}

  reqOptions.url = reqOptions.url+'/assets/scripts/replacer__addr.js'

  var final = []

  request(reqOptions, function(requestErr, requestRes, requestBody) {
    if (requestRes.statusCode === 200) {
      
      // Получаю JSON объект -> jsonResult
      var clearResult = requestBody
      clearResult = clearResult.replace(/^var replacer__addr = /, '').replace(/\}\;/, '}');
      var jsonResult = JSON.parse(clearResult)
      
      // Формирую ответ в нужном формате -> final
      for (var key in jsonResult) {
        final.push({'city': key, 'street_arr': jsonResult[key]})
      }

      apiTools.apiResJson(res, final, 200)

    }
    else {
      apiTools.apiResJson(res, {code: 202, message: 'get file problem'}, 202)
    }

  })

}