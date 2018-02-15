'use strict'

import React from 'react';
import ReactDOM from 'react-dom'
import { OpenApiSwagger, LiveFeed, ImgFolder } from './components/replacer-react-component'

window.localStorage.setItem('token', 'test')            // По правильному, это должно устанавливаться отдельной компонентой авторизации
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
        <LiveFeed swgClient={client} headerTxt='Живая лента' />
        <ImgFolder swgClient={client} headerTxt='Картинки' />
      </div>,
      document.getElementById('root')
    )
  }
})