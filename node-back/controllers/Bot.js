'use strict';

var m_abonent_get    = require('./bot_abonent_get')
var m_abonent_post   = require('./bot_abonent_post')



module.exports.bot_abonent_get = function bot_abonent_get(req, res, next) {
  m_abonent_get.apiAction(req, res, next)
}

module.exports.bot_abonent_post = function bot_abonent_post(req, res, next) {
  m_abonent_post.apiAction(req, res, next)
}
