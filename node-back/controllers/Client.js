'use strict';

var m_token_get    = require('./client_token_get')



module.exports.token_get = function token_get(req, res, next) {
  m_token_get.apiAction(req, res, next)
}
