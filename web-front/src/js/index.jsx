'use strict'

import React from 'react';
import ReactDOM from 'react-dom'
import { OpenApiSwagger, AuthWin, LiveFeed, ImgFolder, ScriptAddr, ScriptSum, Price, BotAbonent, BotSpam } from './components/replacer-react-component'

const specUrl = window.localStorage.getItem('specUrl')  // Выставляется в самом начале в index.html

const swg = new OpenApiSwagger(specUrl)

swg.connect((client, err) => {
  if (err) {
    //console.log(err)
    ReactDOM.render(
      <div className='std-win'>no spec - <a href={specUrl}>{specUrl}</a> !</div>,
      document.getElementById('root')
    )
  }
  else {
    ReactDOM.render(
      <div>
        <AuthWin swgClient={client} headerTxt='Авторизация' />
        <LiveFeed swgClient={client} headerTxt='Живая лента' />
        <ImgFolder swgClient={client} headerTxt='Картинки' />
        <ScriptAddr swgClient={client} headerTxt='Адреса' />
        <Price swgClient={client} headerTxt='Цены' />
        <ScriptSum swgClient={client} headerTxt='Тарифы' />
        <BotAbonent swgClient={client} headerTxt='Bot: Подписчики' />
        <BotSpam swgClient={client} headerTxt='Bot: Рассылка' />
      </div>,
      document.getElementById('root')
    )
  }
})