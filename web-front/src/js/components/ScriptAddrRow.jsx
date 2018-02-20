import React from 'react'


export default class ScriptAddrRow extends React.Component {
  
  constructor(args) {
    super(args)      // наполняю this от Win

    this.state = {
      city:             this.props.row.city,
      streetsTxt:       this.props.streetsTxt,
      showResult:       false,
      modBttnClass:     'gray-bttn'
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

      case (event.target.value === 'del'):
        
        var confAnswer=window.confirm("Delete?")
        if (confAnswer) {
          this.props.Win.props.swgClient.apis.Script[this.props.Win.apiCmd.del]({
            token: this.props.Win.apiCmd.token,
            city: this.props.row.city
          })
          .then((res) => {
            this.setState({showResult: false})
            this.props.Win.getData()
          })
        }

        break

      case (event.target.value === 'mod'):
        street_arr = this.state.streetsTxt.split('\n')

        this.props.Win.props.swgClient.apis.Script[this.props.Win.apiCmd.put]({
          token: this.props.Win.apiCmd.token,
          idx: this.props.idx,
          body: {
            city:             this.state.city,
            street_arr:       street_arr,
          }
        })
        .then((res) => {
          this.setState({modBttnClass: 'gray-bttn'})
        })

        break

      case (event.target.value === 'add'):
        street_arr = this.state.streetsTxt.split('\n')
        
        this.props.Win.props.swgClient.apis.Script[this.props.Win.apiCmd.post]({
          token: this.props.Win.apiCmd.token,
          body: {
            city:             this.state.city,
            street_arr:       street_arr,
          }
        })
        .then((res) => {
          this.setState({showResult: false})
          this.props.Win.getData()
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
      case 'streetsTxt':
        this.setState({streetsTxt: event.target.value})
        break
      case 'city':
        this.setState({city: event.target.value})
        break
    }

    this.setState({modBttnClass: 'mod-bttn'})
    //this.setState({event.target.id: event.target.value})
  }




  render() {
    console.log('render ScriptAddrRow')
    var finalTemplate = null
    let row = this.props.row
    

    var rowColor = 'std-item-header-small'
    if (this.props.idx === 0) { rowColor = 'std-item-header-small-green' }

    finalTemplate =
    <div className='std-item'>
      <div className={rowColor} onClick={this.handleClkShowResult}>
        {this.state.city}
      </div>
      <div className={this.state.showResult ? 'std-item-menu' : 'display-none'}>
        <input id={this.props.idx+'-city'} className={this.props.idx === 0 ? 'script-addr-input' : 'display-none'} type='text' value={this.state.city} onChange={this.handleChangeTextNotes} /><br />
        Улицы:<br /><textarea id={this.props.idx+'-streetsTxt'} className='script-addr-textarea' value={this.state.streetsTxt} onChange={this.handleChangeTextNotes}></textarea><br />
        
        <button className={this.props.idx > 0 ? 'del-bttn' : 'display-none'} onClick={this.handleClkAction} value='del'>Удалить</button>&nbsp;
        <button className={this.props.idx > 0 ? this.state.modBttnClass : 'display-none'} onClick={this.handleClkAction} value='mod'>Изменить</button>
        <button className={this.props.idx > 0 ? 'display-none' : 'add-bttn'} onClick={this.handleClkAction} value='add'>Добавить</button>
      </div>
    </div>

    return finalTemplate
  }

}