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
let operator= ['+','-','x','/']
let seperator = /[+]/

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
      expression: '',
      displayText: displayDefault
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.notDoubleDecimal = this.notDoubleDecimal.bind(this);
    this.notConsecutiveOperator = this.notConsecutiveOperator.bind(this);
    this.calculation = this.calculation.bind(this);
  }
  notDoubleDecimal(key){
    if (key!==buttons['decimal']){
      return true;
    } else {
      return !(/\./).test(this.state.displayText.split(seperator).pop())
    }
  }
  notConsecutiveOperator(key){
      return !(operator.includes(key) && operator.includes(this.state.displayText[this.state.displayText.length-1]))
  }
  calculation(){

  }
  handleInput(key){
    if (exprKeys.includes(key)){
      // this.setState({expression:this.expression.concat(key)})
      if (this.state.displayText===displayDefault){
        if (numKeys.includes(key)){
          this.setState({displayText: key})
        }
      } else if (this.notDoubleDecimal(key) &&  this.notConsecutiveOperator(key)) {
        if (key==='*'){
          this.setState({displayText: this.state.displayText.concat(buttons['multiply'])})
        } else {
          this.setState({displayText: this.state.displayText.concat(key)})
        }
      }
    } else if (key===buttons['equals']) {
      this.setState({expression:this.state.displayText})
      this.calculation();
    } else if (key===buttons['clear']) {
      this.setState({displayText: displayDefault, expression:''})
    }

  }
  handleClick(id){
    this.handleInput(buttons[id])
    console.log(id,'clicked')
  }
  handleKeyPress(event) {
    if (validKeys.includes(event.key)){
      this.handleInput(event.key);
      console.log(event.key,'pressed');
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
          <div id='expression'>{this.state.expression}</div>
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
