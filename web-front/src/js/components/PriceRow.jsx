import React from 'react'


export default class PriceRow extends React.Component {
  
  constructor(args) {
    super(args)      // наполняю this от Win

    this.state = {
      device:             this.props.row.device,
      price:              this.props.row.price,
      showResult:         false,
      modBttnClass:       'gray-bttn'
    }

    this.handleChangeTextNotes  = this.handleChangeTextNotes.bind(this)
    this.handleClkShowResult    = this.handleClkShowResult.bind(this)
    this.handleClkAction        = this.handleClkAction.bind(this)

  }




  handleClkShowResult(event) {
    // Показываем/скрываем результат
    this.setState({showResult: !this.state.showResult})
  }

  handleClkAction(event) {
    var street_arr = []

    switch (true) {

      case (event.target.value === 'mod'):
        street_arr = this.state.price.split('\n')

        this.props.Win.props.swgClient.apis.Http[this.props.Win.apiCmd.put]({
          token: this.props.Win.apiCmd.token,
          body: {
            device:            this.state.device,
            price:             parseInt(this.state.price)
          }
        })
        .then((res) => {
          this.setState({modBttnClass: 'gray-bttn'})
        })

        break

      default:
        console.log('default')
        break

    }

  }






  handleChangeTextNotes(event) {
    let spltId = event.target.id.split('-')
    switch (spltId[1]) {
      case 'price':
        this.setState({price: event.target.value})
        break
    }

    this.setState({modBttnClass: 'mod-bttn'})
    //this.setState({event.target.id: event.target.value})
  }




  render() {
    console.log('render PriceRow')
    var finalTemplate = null
    let row = this.props.row

    var deviceNormalName = ''
    switch (this.state.device) {
      case 'tv-1':
        deviceNormalName = 'ТВ-приемник'
        break
    }

    finalTemplate =
    <div className='live-feed-item'>
      <div className='std-item-header-small' onClick={this.handleClkShowResult}>
        {deviceNormalName}
      </div>
      <div className={this.state.showResult ? 'live-feed-item-menu' : 'display-none'}>
        Цена: <input id={this.props.idx+'-price'} className='live-feed-input' type='text' value={this.state.price} onChange={this.handleChangeTextNotes} /><br />
        
        <button className={this.props.idx > 0 ? this.state.modBttnClass : 'display-none'} onClick={this.handleClkAction} value='mod'>Изменить</button>
        <button className={this.props.idx > 0 ? 'display-none' : 'add-bttn'} onClick={this.handleClkAction} value='add'>Добавить</button>
      </div>
    </div>

    return finalTemplate
  }

}