import React from 'react'
import PriceRow from './PriceRow'

export class Price extends React.Component {

  constructor(args) {
    super(args)      // наполняю this от Page

    this.state = {
      showResult:       false,
      apiResult:        null
    }

    this.handleClkShowResult  = this.handleClkShowResult.bind(this)

    this.apiCmd = {
      token:      window.localStorage.getItem('token'),
      get:        'http_price_get',
      put:        'http_price_put'
    }


    //console.log(this.props.swgClient)
    this.getData = () => {
      var apiResultTemplate = []

      this.props.swgClient.apis.Http[this.apiCmd.get]({
        token: this.apiCmd.token,
        device: 'tv-1'
      })
      .then((res) => {
        if (res.status === 200) {
          apiResultTemplate.push(<PriceRow {...{Win: this}} row={res.body} idx={1} key={1} />)
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
    console.log('Price render')

    var finalTemplate =
    <div className='live-feed-win'>
      <div className='std-item-header' onClick={this.handleClkShowResult}>{this.props.headerTxt}</div>

      <div className={this.state.showResult ? '' : 'display-none'}>
        {this.state.apiResult}
      </div>

    </div>

    return finalTemplate
  }

}
