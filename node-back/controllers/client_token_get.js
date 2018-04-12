'use strict';

const apiTools  = require('../sub_modules/api_tools')
const userDb = [
  {uName: 'user', uPass: 'test'},
  {uName: 'user2', uPass: 'test2'}
]

exports.apiAction = function(req, res, next) {

  var args            = req.swagger.params

  // ----------------------------------------------------------------------------------
  // Здесь какая-нибудь процедура проверки достоверности "token" например в базе данных
  // ----------------------------------------------------------------------------------
  var authStatus = false
  userDb.map((row,i) => {
    if (args.auth_name.value === row.uName && args.auth_pass.value === row.uPass) { authStatus = true }
  })

  if (authStatus) {
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