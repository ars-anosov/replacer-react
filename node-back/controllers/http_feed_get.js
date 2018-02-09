'use strict';

// https://habrahabr.ru/post/301426/

var apiTools = require('../sub_modules/api_tools')
var cheerio = require('cheerio')
var fs = require('fs')

exports.apiAction = function(req, res, next) {

  var args                = req.swagger.params
  
  var request             = req.myObj.request.module
  var reqOptions          = {...req.myObj.request.reqOptions}


  reqOptions.url = reqOptions.url+'index.html'
  request(reqOptions, function(requestErr, requestRes, requestBody) {
    if (requestRes.statusCode === 200) {
      //console.log(requestRes.statusCode)
      //console.log(requestBody)
      
      var $ = cheerio.load(requestBody)
      var final = []

      //Короткие
      $('.lf-item__title > h4').map((i, row) => {
        final[i] = {short_title: '', short_img: '', short_comments: '', long_title: '',long_date: '', long_img: '', long_content: ''}
        final[i].short_title = $(row).text()
        
        //$(row).html(final[i].short_title + ' --- test')
        //final[i].short_title = $(row).text()
      })

      $('.lf-item__img > img').map((i, row) => {
        final[i].short_img = $(row).attr('src')
        
        //$(row).attr('src', final[i].short_img + ' --- test src')
        //final[i].short_img = $(row).attr('src')
      })

      $('.lf-item__comments').map((i, row) => {
        final[i].short_comments = $(row).text()
      })

      
      //Длинные
      $('.article__title').map((i, row) => {
        final[i].long_title = $(row).text()
      })

      $('.article__date').map((i, row) => {
        final[i].long_date = $(row).text()
      })

      $('.article__content > img').map((i, row) => {
        final[i].long_img = $(row).attr('src')
      })

      $('.article__content > p').map((i, row) => {
        final[i].long_content = $(row).text()
      })


      //console.log(final)
      if (args.idx.value) {
        final = [ final[args.idx.value - 1] ]
      }

      apiTools.apiResJson(res, final, 200)


      fs.writeFileSync('./static_result/index_new.html', $.html({decodeEntities: false}));

    }
    else {
      apiTools.apiResJson(res, {code: 202, message: requestRes.statusCode}, 202)
    }
  })


}