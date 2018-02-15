'use strict';

var apiTools = require('./api_tools')

exports.checkAuth = function(req, res, next) {

  if (req.swagger) {
    // Объекта swagger присутствует.
    var args              = req.swagger.params

    if (args.auth_name && args.auth_pass) {
      // Прилетел запрос с 2-мя полями args.auth_name и args.auth_pass
      if (args.auth_name.path[1] === '/client/token' && args.auth_pass.path[1] === '/client/token') {
        // Клиент хочет обратиться в controller "token_get" для получения "token" на базе "args.auth_name" и "args.auth_pass". Пропускаю 
        next();
      }
      else {
        // Клиент хочет проскочить в controller отличный от "token_get"
        apiTools.apiResJson(res, {code: 401, message: 'token Unauthorized'}, 401);
      }
    }
    else {
      // У клиента есть token. Проверяю.
      
      var tokenCheckResult = ''
      // ----------------------------------------------------------------------------------
      // Здесь какая-нибудь процедура проверки достоверности "token" например в базе данных
      // ----------------------------------------------------------------------------------
      if (args.token.value === req.myObj.aaa['user']) { tokenCheckResult = 'результат проверки - Ок' }

      apiResponse(tokenCheckResult)
    }
  }
  else {
    // Нет объекта swagger. Просто считывается spec. Пропускаю.
    next();    
  }
  






  function apiResponse(tokenCheckResult) {
    if (tokenCheckResult) {
      // Если есть результат - наполняю req.myObj.aaa для следующих middleware действий. Пропускаю.
      req.myObj.aaa = tokenCheckResult
      next()
    }
    else {
      apiTools.apiResJson(res, {code: 202, message: 'token Unauthorized'}, 202);
    }
  }

}
