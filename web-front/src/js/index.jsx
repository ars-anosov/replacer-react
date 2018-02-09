'use strict'

import React from 'react';
import ReactDOM from 'react-dom'
import { OpenApiSwagger, LiveFeed } from './components/replacer-react-component'

window.localStorage.setItem('token', 'test')


const specUrl = 'http://192.168.13.97:8008/spec/swagger.json'
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
        <LiveFeed swgClient={client} headerTxt='LiveFeed component' />
      </div>,
      document.getElementById('root')
    )
  }
})