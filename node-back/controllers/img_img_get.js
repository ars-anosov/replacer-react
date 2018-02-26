'use strict';

var apiTools  = require('../sub_modules/api_tools')

var fs        = require('fs')
var path      = require('path')

//https://github.com/image-size/image-size
// Synchronous
var sizeOf = require('image-size');

exports.apiAction = function(req, res, next) {

  var args                 = req.swagger.params

  var dirPath = path.join(__dirname,'../static_result/img/')
  
  fs.readdir(dirPath, function(err, items) {
    if (err) {
      apiTools.apiResJson(res, {code: 202, message: 'readdir error'}, 202)
    }

    let finalResult = []

    items.forEach((row) => {
      if (row.match(/(png|jpg|jpeg)$/i)) {
        let dimensions = sizeOf(dirPath+row)
        // Выдаю только подходящие размеры
        if (dimensions.width >= 330 && dimensions.width <= 700 && dimensions.height >= 194 && dimensions.height <= 400) {
          finalResult.push(row)
        }
      }
    })
    
    if (args.filename.value) {
      // выдать массив только с одним элементом. доделаю позже.
    }

    apiTools.apiResJson(res, finalResult, 200)
  })


}