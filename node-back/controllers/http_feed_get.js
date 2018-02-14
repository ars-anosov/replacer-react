'use strict';

// https://habrahabr.ru/post/301426/

var apiTools  = require('../sub_modules/api_tools')
var cheerio   = require('cheerio')

exports.apiAction = function(req, res, next) {

  var idx                 = req.swagger.params.idx.value
  
  var request             = req.myObj.request.module
  var reqOptions          = {...req.myObj.request.reqOptions}


  reqOptions.url = reqOptions.url+'/index.html'
  request(reqOptions, function(requestErr, requestRes, requestBody) {
    if (requestRes.statusCode === 200) {
      //console.log(requestRes.statusCode)
      //console.log(requestBody)
      
      var $ = cheerio.load(requestBody)
      var final = []

      // Короткие
      $('.lf-item__title > h4').map((i, row) => {
        final[i] = {short_title: '', short_img: '', short_comments: '', long_title: '',long_date: '', long_img: '', long_content: ''}
        final[i].short_title = $(row).text()
        
        //$(row).html(final[i].short_title + ' --- test')
        //final[i].short_title = $(row).text()

        // Длинные
        final[i].long_title = $( '#article-'+((i+1).toString()) + ' > .article__title').text()
        final[i].long_date = $( '#article-'+((i+1).toString()) + ' > .article__date').text()
        final[i].long_img = $( '#article-'+((i+1).toString()) + ' > .article__content > img').attr('src')
        final[i].long_content = $( '#article-'+((i+1).toString()) + ' > .article__content > p').text()
      })


      // Короткие еще пара свойств
      $('.lf-item__img > img').map((i, row) => {
        final[i].short_img = $(row).attr('src')
        
        //$(row).attr('src', final[i].short_img + ' --- test src')
        //final[i].short_img = $(row).attr('src')
      })

      $('.lf-item__comments').map((i, row) => {
        final[i].short_comments = $(row).text()
      })



      //console.log(final)
      if (idx) {
        final = [ final[idx - 1] ]
      }

      apiTools.apiResJson(res, final, 200)

    }
    else {
      apiTools.apiResJson(res, {code: 202, message: requestRes.statusCode}, 202)
    }
  })


}