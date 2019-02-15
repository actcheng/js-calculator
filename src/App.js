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
let seperator = /[x+\-/]/

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
      reset: false,
      displayText: displayDefault,
      displayExpr: '',
      result: displayDefault
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

  notDoubleDecimal(key){
    if (key!==buttons['decimal']){
      return true;
    } else {
      return !(/\./).test(this.state.displayText.split(seperator).pop())
    }
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

  calculation(expr){
    let exprArr = expr.split(/([x+\-/])/g);
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
    this.setState({
      displayText:exprArr[0],
      result: exprArr[0].toString(),
      reset: true})
  }

  handleInput(key){

    let text = this.state.result;
    if (this.state.reset){
       this.setState(this.baseState)
    } else {
      text = this.state.displayText;
    }

    if (exprKeys.includes(key)){
      if (text===displayDefault){
        if (numKeys.includes(key)){
          this.setState({displayText: key})
        }
      } else if (this.notDoubleDecimal(key)) {
        if (this.isConsecutiveOperator(key)){
          text = text.slice(0,-1)
        }
        if (key==='*'){
          this.setState({displayText: text.concat(buttons['multiply'])})
        } else {
          this.setState({displayText: text.concat(key)})
        }

      }
    } else if (key===buttons['equals']) {
      let expr = text
      if (operator.includes(expr.split('').pop())){
        expr = expr.slice(0,-1)
      }
      this.setState({ displayExpr:expr })
      this.calculation(expr);
    } else if (key===buttons['clear']) {
      this.setState({displayText: displayDefault, displayExpr:''})
    } else if (key===buttons['escape']){
        this.setState({displayText: text.slice(0,-1)})
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
  componentDidMount () {
        const script = document.createElement("script");
        script.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
        script.async = true;
        document.body.appendChild(script);
  }

  render() {
    return (
      <div className="App">
        <div id='calculator'>
          <div id='expression'>{this.state.displayExpr}</div>
          <div id='display'>{this.state.displayText}</div>
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
