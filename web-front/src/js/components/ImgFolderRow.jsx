import React from 'react'


export default class ImgFolderRow extends React.Component {
  
  constructor(args) {
    super(args)      // наполняю this от Win

    this.state = {
      showResult:       false,
    }

    this.handleClkShowResult    = this.handleClkShowResult.bind(this)

  }



  handleClkShowResult(event) {
    
    // Если результат скрыт, запрашиваем новые занчения
    if (!this.state.showResult) {
      // запрос данных
    }
    
    // Показываем/скрываем результат
    this.setState({showResult: !this.state.showResult})
  }



  render() {
    console.log('render ImgFolderRow')
    var finalTemplate = null
    let row = this.props.row
    const liveUrl = window.localStorage.getItem('liveUrl')  // Выставляется в самом начале в index.html

    finalTemplate =
    <div className='std-item'>
      <div className='std-item-header-small' onClick={this.handleClkShowResult}>
        {row}
      </div>
      <div className={this.state.showResult ? 'std-item-menu' : 'display-none'}>
        <img src={liveUrl+'/assets/images/'+row}></img><br />
      </div>
    </div>

    return finalTemplate
  }

}