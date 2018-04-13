import React from 'react'

export class BotSpam extends React.Component {

  constructor(args) {
    super(args)      // наполняю this от Page

    this.state = {
      showResult:       false,
      apiResult:        null,
      modBttnClass:     'gray-bttn',
      spam:             ''
    }

    this.handleClkShowResult    = this.handleClkShowResult.bind(this)
    this.handleChangeTextNotes  = this.handleChangeTextNotes.bind(this)
    this.handleClkAction        = this.handleClkAction.bind(this)

    this.apiCmd = {
      token:      window.localStorage.getItem('token'),
      post:      'bot_abonent_post',
    }


  }







  handleClkShowResult(event) {
    // Если результат скрыт, запрашиваем заново.
    if (!this.state.showResult) {
      this.setState({apiResult: null})
    }

    this.setState({showResult: !this.state.showResult})
  }

  handleChangeTextNotes(event) {
    let spltId = event.target.id.split('-')
    switch (spltId[1]) {
      case 'spam':
        this.setState({spam: event.target.value})
        break
    }

    this.setState({modBttnClass: 'mod-bttn'})
    //this.setState({event.target.id: event.target.value})
  }

  handleClkAction(event) {
    switch (true) {

      case (event.target.value === 'mod'):
        this.props.swgClient.apis.Bot[this.apiCmd.post]({
          token: this.apiCmd.token,
          body: {
            spam:    this.state.spam
          }
        })
        .then((res) => {
          this.setState({modBttnClass: 'gray-bttn'})
          this.setState({spam: 'Отправлено'})
        })
        break
    }

  }


  render() {
    console.log('BotSpam render')

    var finalTemplate =
    <div className='std-win'>
      <div className='std-item-header' onClick={this.handleClkShowResult}>{this.props.headerTxt}</div>

      <div className={this.state.showResult ? '' : 'display-none'}>
        Текст рассылки:<br />
        <textarea id='1-spam' className='live-feed-textarea' value={this.state.spam} onChange={this.handleChangeTextNotes}></textarea><br />

        <button className={this.state.modBttnClass} onClick={this.handleClkAction} value='mod'>Отправить</button>
      </div>

    </div>

    return finalTemplate
  }

}
