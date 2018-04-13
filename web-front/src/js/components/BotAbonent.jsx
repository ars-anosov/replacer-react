import React from 'react'
import BotAbonentRow from './BotAbonentRow'

export class BotAbonent extends React.Component {

  constructor(args) {
    super(args)      // наполняю this от Page

    this.state = {
      showResult:       false,
      apiResult:        null
    }

    this.handleClkShowResult  = this.handleClkShowResult.bind(this)

    this.apiCmd = {
      token:      window.localStorage.getItem('token'),
      get:        'bot_abonent_get'
    }


    //console.log(this.props.swgClient)
    this.getData = () => {
      var apiResultTemplate = []



      this.props.swgClient.apis.Bot[this.apiCmd.get]({
        token: this.apiCmd.token
      })
      .then((res) => {

        if (res.status === 200) {
          res.body.map( (row, i) => {
            apiResultTemplate.push(<BotAbonentRow {...{Win: this}} row={row} idx={i+1} key={i+1}/>)
          })
        }
        else {
          if (res.body.message === 'token Unauthorized') {
            document.getElementById('auth-win').setAttribute('class', 'auth-win')
          }
        }

        this.setState({apiResult: apiResultTemplate, showResult: true})
      })
      .catch((err) => {
        // err
      })

    }

  }







  handleClkShowResult(event) {
    // Если результат скрыт, запрашиваем заново.
    if (!this.state.showResult) {
      this.setState({apiResult: null})
      this.getData()
    }

    this.setState({showResult: !this.state.showResult})
  }





  render() {
    console.log('BotAbonent render')

    var finalTemplate =
    <div className='std-win'>
      <div className='std-item-header' onClick={this.handleClkShowResult}>{this.props.headerTxt}</div>

      <div className={this.state.showResult ? '' : 'display-none'}>
        {this.state.apiResult}
      </div>

    </div>

    return finalTemplate
  }

}
