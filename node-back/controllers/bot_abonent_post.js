'use strict';

const apiTools  = require('../sub_modules/api_tools')
const request = require('request')

exports.apiAction = function(req, res, next) {

  var bodyVal                = req.swagger.params.body.value

  let reqOp = {
    'url':      'http://89.188.160.102:8010/secret_path',
    'method':   'POST',
    'json':     true, // Automatically stringifies the body to JSON
    'body':     bodyVal
  }


  request(reqOp, (requestErr, requestRes, requestBody) => {
    if (requestErr) {
      apiTools.apiResJson(res, {code: 202, message: 'error'}, 202)
    }
    else {
      if (requestRes.statusCode === 200) {
        apiTools.apiResJson(res, {code: 200, message: requestBody}, 200)
      }
      else {
        apiTools.apiResJson(res, {code: 202, message: 'response code '+requestRes.statusCode}, 202)
      }
    }
  })

}