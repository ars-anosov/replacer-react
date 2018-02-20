import React from 'react'
import ScriptAddrRow from './ScriptAddrRow'

export class ScriptAddr extends React.Component {

  constructor(args) {
    super(args)      // наполняю this от Page

    this.state = {
      showResult:       false,
      apiResult:        null,
    }

    this.handleClkShowResult  = this.handleClkShowResult.bind(this)
 
    this.apiCmd = {
      token:      window.localStorage.getItem('token'),
      get:        'script_addr_get',
      post:       'script_addr_post',
      put:        'script_addr_put',
      del:        'script_addr_del',
    }


    //console.log(this.props.swgClient)
    this.getData = () => {
      var apiResultTemplate = []

      this.props.swgClient.apis.Script[this.apiCmd.get]({
        token: this.apiCmd.token
      })
      .then((res) => {

        if (res.status === 200) {
          var row_new =   {
            'city': 'Новый Населенный пункт',
            'street_arr': []
          }

          apiResultTemplate.push(<ScriptAddrRow {...{Win: this}} row={row_new} streetsTxt='' idx={0} key={0} />)
          
          res.body.map( (row, i) => {

            // массив превращаю в строки
            let streetsTxt = ''
            row.street_arr.map((addrRow, i) => {
              if (addrRow) { streetsTxt = streetsTxt + addrRow+'\n' }
            })

            apiResultTemplate.push(<ScriptAddrRow {...{Win: this}} row={row} streetsTxt={streetsTxt} idx={i+1} key={i+1} />)
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
    console.log('ScriptAddr render')

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
