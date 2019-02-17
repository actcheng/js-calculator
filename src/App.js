import React, { Component } from 'react';
import './App.css';

let buttons = {
  'one': '1',  'two': '2',  'three': '3',  'four': '4',  'five': '5',
  'six' : '6',  'seven': '7', 'eight': '8', 'nine': '9', 'zero': '0',
  'equals': '=', 'add': '+', 'subtract': '-','multiply': 'x',
  'divide': '/','clear':'C','clearE':'CE','decimal':'.',
  'escape':'←','negative':'+/-'
}

let displayDefault = '0'
let validKeys = Object.values(buttons)
let numKeys = ['1','2','3','4','5','6','7','8','9','0']
let exprKeys= ['1','2','3','4','5','6','7','8','9','0',
               '+','-','x','/','.','*']
let operator= ['x','/','+','-']

class Button extends Component {
  render() {
    let id = this.props.id;
    return(
      <div id={id} className='button' onClick={()=>this.props.handleClick(id)}>{buttons[id]}</div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      replace: true,
      displayNum: displayDefault,
      displayExpr: '',
      exprArr: [],
    }
    this.baseState = this.state
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.notDoubleDecimal = this.notDoubleDecimal.bind(this);
    this.isConsecutiveOperator = this.isConsecutiveOperator.bind(this);
    this.calculation = this.calculation.bind(this);
    this.combineNumber = this.combineNumber.bind(this);
  }

  notDoubleDecimal(displayNum){
      return !(/\./).test(displayNum)
  }

  isConsecutiveOperator(key){
      return (operator.includes(key) && operator.includes(this.state.displayText[this.state.displayText.length-1]))
  }

  combineNumber(exprArr, ind, op){
    let num1 = Number(exprArr[ind-1])
    let num2 = Number(exprArr[ind+1])
    let result = 0;

    switch (op) {
      case 'x':
        result = num1*num2;
        break;
      case '/':
        result = num1/num2;
        break;
      case '+':
        result = num1+num2;
        break;
      case '-':
        result = num1-num2;
        break;
      default:
        break;
      }
    exprArr.splice(ind-1,3,result)
    return exprArr;
  }

  calculation(exprArr){
    // multiply
    while (exprArr.indexOf('x')>-1){
      exprArr = this.combineNumber(exprArr,exprArr.indexOf('x'),'x')
    }
    // division
    while (exprArr.indexOf('/')>-1){
      exprArr = this.combineNumber(exprArr,exprArr.indexOf('/'),'/')
    }
    // from beginning
    while (exprArr.length>1){
      exprArr = this.combineNumber(exprArr,1,exprArr[1])
    }

    let ans = exprArr[0].toString();

    this.setState({
      replace: true,
      displayNum: ans,
      displayExpr: '',
      exprArr: [],
    })
    console.log('After calculation:',ans)
  }

  handleInput(key){
    console.log(this.state)

    let displayExpr = this.state.displayExpr;
    let displayNum = this.state.displayNum;
    let exprArr = this.state.exprArr;

    if (validKeys.includes(key)){
      // Number keys
      if (numKeys.includes(key)){
        if (this.state.replace===true){
          displayNum = key;
          this.setState({
            displayNum: displayNum,
            replace: false})
        } else {
          displayNum = displayNum.concat(key)
          this.setState({ displayNum: displayNum })
        }
      // decimal
      } else if (key===buttons['decimal'] && this.notDoubleDecimal(displayNum)){
        displayNum = displayNum.concat(key)
        this.setState({ displayNum: displayNum, replace: false })
      // operator
      } else if (operator.includes(key)){
        let op = key;

        if (key==='*'){
          op = buttons['multiply'];
        }

        if (operator.includes(exprArr[exprArr.length-1])){
          exprArr.pop()
          displayExpr = displayExpr.slice(0,-1)
        }
        exprArr.push(displayNum, op)
        displayExpr = displayExpr.concat(displayNum, op)
        this.setState({
          replace: true,
          displayExpr: displayExpr,
          exprArr: exprArr
        })
      // functions
      } else if (key===buttons['equals']) {
        exprArr.push(displayNum)
        this.calculation(exprArr);
      // calculation
      } else if (key===buttons['negative']) {
        displayNum = '-'.concat(displayNum)
        this.setState({ displayNum: displayNum})
      } else if (key===buttons['clear']) {
        this.setState(this.baseState)
      } else if (key===buttons['clearE']) {
        displayNum = displayDefault
        this.setState({ displayNum: displayNum , replace: true})
      }else if (key===buttons['escape']){
        displayNum = displayNum.slice(0,-1)
        this.setState({ displayNum: displayNum  })
      }
    }
  }
  handleClick(id){
    console.log(id,'clicked')
    this.handleInput(buttons[id])
  }
  handleKeyPress(event) {
    if (validKeys.includes(event.key)){
      this.handleInput(event.key);
      console.log(event.key,'pressed');
    } else if (event.keyCode === 13){
      this.handleInput('=');
    }
  }
  componentWillMount(){
    document.addEventListener("keydown", this.handleKeyPress.bind(this));
  }

  render() {
    return (
      <div className="App">
        <div id='calculator'>
          <div id='expression'>{this.state.displayExpr}</div>
          <div id='display'>{this.state.displayNum}</div>
          <div id='container'>
            <Button id='clearE' handleClick={this.handleClick.bind(this)} />
            <Button id='clear'  handleClick={this.handleClick.bind(this)} />
            <Button id='escape' handleClick={this.handleClick.bind(this)} />
            <Button id='divide' handleClick={this.handleClick.bind(this)} />
            <Button id='one'    handleClick={this.handleClick.bind(this)} />
            <Button id='two'    handleClick={this.handleClick.bind(this)} />
            <Button id='three'  handleClick={this.handleClick.bind(this)} />
            <Button id='multiply' handleClick={this.handleClick.bind(this)} />
            <Button id='four' handleClick={this.handleClick.bind(this)}/>
            <Button id='five' handleClick={this.handleClick.bind(this)}/>
            <Button id='six' handleClick={this.handleClick.bind(this)}/>
            <Button id='subtract' handleClick={this.handleClick.bind(this)}/>
            <Button id='seven' handleClick={this.handleClick.bind(this)}/>
            <Button id='eight' handleClick={this.handleClick.bind(this)}/>
            <Button id='nine' handleClick={this.handleClick.bind(this)}/>
            <Button id='add' handleClick={this.handleClick.bind(this)}/>
            <Button id='negative' handleClick={this.handleClick.bind(this)}/>
            <Button id='zero' handleClick={this.handleClick.bind(this)}/>
            <Button id='decimal' handleClick={this.handleClick.bind(this)}/>
            <Button id='equals' handleClick={this.handleClick.bind(this)}/>
          </div>
        </div>
        <p>Javascript calculator by CT</p>
      </div>
    );
  }
}

export default App;
