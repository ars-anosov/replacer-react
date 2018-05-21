import React from 'react'


export default class BotAbonentRow extends React.Component {
  
  constructor(args) {
    super(args)      // наполняю this от Win

    this.state = {
      showResult:         false,
      modBttnClass:       'gray-bttn'
    }

    this.handleClkShowResult    = this.handleClkShowResult.bind(this)

  }




  handleClkShowResult(event) {
    // Показываем/скрываем результат
    this.setState({showResult: !this.state.showResult})
  }









  render() {
    console.log('render BotAbonentRow')
    var finalTemplate = null
    let row = this.props.row

    finalTemplate =
    <div className='std-item'>
      <div className='std-item-header-small' onClick={this.handleClkShowResult}>
        <b>{row.tg_id}</b> {row.fio} (договор {row.id})
      </div>
      <pre className={this.state.showResult ? 'pre-monospace' : 'display-none'}>
        Telegram ID:         {row.tg_id}<br />
        Номер договора (ID): {row.id}<br />
        ФИО:                 {row.fio}<br />
        телефон:             {row.phone}<br />
        e-mail:              {row.email}<br />
        balance:             {row.balance}<br />
        tarif:               {row.tarif}
      </pre>
    </div>

    return finalTemplate
  }

}