'use strict';

var apiTools  = require('../sub_modules/api_tools')

apiTools.apiResJson

exports.apiAction = function(req, res, next) {

  var args            = req.swagger.params

  // ----------------------------------------------------------------------------------
  // Здесь какая-нибудь процедура проверки достоверности "token" например в базе данных
  // ----------------------------------------------------------------------------------
  if (
    (args.auth_name.value === 'user' && args.auth_pass.value === 'test')
    ||
    (args.auth_name.value === 'user2' && args.auth_pass.value === 'test2')
    ) {
    // клиент ввел правильный пароль
    var token_new  = apiTools.randWDclassic(30)

    // мутирую переменную aaa
    req.myObj.aaa[args.auth_name.value] = token_new

    // отдаю клиенту временный token
    apiTools.apiResJson(res, {token: token_new}, 200)
  }
  else {
    apiTools.apiResJson(res, {code: 202, message: 'Пароль не подходит'}, 202);
  }

}