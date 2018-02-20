import React from 'react'

export class ScriptSum extends React.Component {

  constructor(args) {
    super(args)      // наполняю this от Page

    this.state = {
      showResult:       false,
      apiResult:        null,
      modBttnClass:     'gray-bttn',
      noLimit:          0,
      limit:            0
    }

    this.handleClkShowResult    = this.handleClkShowResult.bind(this)
    this.handleChangeTextNotes  = this.handleChangeTextNotes.bind(this)
    this.handleClkAction        = this.handleClkAction.bind(this)

    this.apiCmd = {
      token:      window.localStorage.getItem('token'),
      get:        'script_sum_get',
      put:        'script_sum_put',
    }


    //console.log(this.props.swgClient)
    this.getData = () => {
      var apiResultTemplate = []

      this.props.swgClient.apis.Script[this.apiCmd.get]({
        token: this.apiCmd.token
      })
      .then((res) => {

        if (res.status === 200) {
          this.setState({noLimit: res.body.noLimit, limit: res.body.limit, showResult: true})
        }
        else {
          if (res.body.message === 'token Unauthorized') {
            document.getElementById('auth-win').setAttribute('class', 'auth-win')
          }
        }

        
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

  handleChangeTextNotes(event) {
    let spltId = event.target.id.split('-')
    switch (spltId[1]) {
      case 'noLimit':
        this.setState({noLimit: event.target.value})
        break
      case 'limit':
        this.setState({limit: event.target.value})
        break
    }

    this.setState({modBttnClass: 'mod-bttn'})
    //this.setState({event.target.id: event.target.value})
  }

  handleClkAction(event) {
    switch (true) {

      case (event.target.value === 'mod'):
        this.props.swgClient.apis.Script[this.apiCmd.put]({
          token: this.apiCmd.token,
          body: {
            noLimit:    parseInt(this.state.noLimit),
            limit:      parseInt(this.state.limit)
          }
        })
        .then((res) => {
          this.setState({modBttnClass: 'gray-bttn'})
        })
        break
    }

  }


  render() {
    console.log('ScriptSum render')

    var finalTemplate =
    <div className='std-win'>
      <div className='std-item-header' onClick={this.handleClkShowResult}>{this.props.headerTxt}</div>

      <div className={this.state.showResult ? '' : 'display-none'}>
        Без ограничений:<br /><input id='1-noLimit' className='script-sum-input' type='text' value={this.state.noLimit} onChange={this.handleChangeTextNotes} /><br />
        Ограниченый:<br /><input id='1-limit' className='script-sum-input' type='text' value={this.state.limit} onChange={this.handleChangeTextNotes} /><br />

        <button className={this.state.modBttnClass} onClick={this.handleClkAction} value='mod'>Изменить</button>
      </div>

    </div>

    return finalTemplate
  }

}
