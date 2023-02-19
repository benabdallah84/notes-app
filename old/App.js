
import React from 'react';
import './App.css';
import Title from './Title'
import Text from './Text'
import ClickCount from './ClickCount'
import Conditions from './Conditions'
import Styled from 'styled-components'
class App extends React.Component {

  
  
  constructor(props){
    super(props)
    this.state = {
      counter:0
    }

  }
  
  componentWillUnmount(){
    console.log("component will mount")
  }
  componentDidMount(){
    console.log("component did mount, uses to load data and change the state")
  }
  componentDidUpdate(){
    console.log("component did update, uses to perform an action depend on user experience ")
    if(this.state.counter === 10){
      console.log("you acheived 10 iterations!")
    }
  }
  hundleClickButton = () =>{
    alert("Hello Guy!")
  }
  hundleIncrement = () =>{
    this.setState({counter: this.state.counter + 1})
  }
  render() {
    const Container = Styled.div`
    color: red;
  `;
    console.log("render")
    return (
      <Container className="App">
        <Title content="javascript"/>
        <Text >
          <p>This courses are great!</p>
          <button onClick={this.hundleClickButton}>Click me</button>
        </Text>
        <p>{this.state.counter}</p>
        <button onClick={this.hundleIncrement}>+</button>
        <ClickCount/>
        <Conditions/>
      </Container>
    )
  }
}

export default App;
