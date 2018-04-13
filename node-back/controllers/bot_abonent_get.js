'use strict';

const apiTools  = require('../sub_modules/api_tools')
const request = require('request')

exports.apiAction = function(req, res, next) {

  var args            = req.swagger.params

  let reqOp = {
    url:      'http://89.188.160.102:8010/secret_path',
    method:   'GET'
  }

  let finalResult = []
  request(reqOp, (requestErr, requestRes, requestBody) => {
    let resultJson = JSON.parse(requestBody)
    
    resultJson.map( (row, i) => {
      finalResult.push({
        'tg_id':    row.id,
        'id':       row.do.id,
        'fio':      row.do.fio,
        'phone':    row.do.phone,
        'email':    row.do.email,
        'balance':  row.do.balance,
        'tarif':    row.do.tarif
      })
    })

    apiTools.apiResJson(res, finalResult, 200)
  })

  //apiTools.apiResJson(res, {code: 202, message: 'bot info'}, 202)
  

}