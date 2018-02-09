# replacer-react-component

## Overview
React components for replacer-API interaction.
Works with backend API - [replacer-reactor](https://github.com/ars-anosov/replacer-react/tree/master/node-back).

## Usage
**specUrl** - path to [replacer-reactor](https://github.com/ars-anosov/replacer-react/tree/master/node-back) spec-file

``` js
import { OpenApiSwagger, LiveFeed } from 'replacer-react-component'

window.localStorage.setItem('token', 'test')

const specUrl = 'http://localhost:8008/spec/swagger.json'
const swg = new OpenApiSwagger(specUrl)

swg.connect((client, err) => {
  if (err) {
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
```

## Dependencies
- [swagger-js](https://github.com/swagger-api/swagger-js): for backend API [replacer-reactor](https://github.com/ars-anosov/replacer-react/tree/master/node-back) in [OpenAPI-Spec](https://github.com/OAI/OpenAPI-Specification) format
