'use strict';

var m_abonent_get    = require('./bot_abonent_get')



module.exports.bot_abonent_get = function bot_abonent_get(req, res, next) {
  m_abonent_get.apiAction(req, res, next)
}
