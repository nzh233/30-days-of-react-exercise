// src/index.js
// index.js
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Button from "./components/Button/Button"
class App extends Component {
    // declaring state
    // initial state
    state = {
        style: {
            backgroundColor: "blue",
            fontSize: "3rem",
            fontWeight: "600",
            position: 'fixed',
            left: "0",
            top: "0",
        }
    }
    shiftThis = () => {
        this.setState({
            style: {
                position: "fixed",
                backgroundColor: "blue",
                fontSize: "3rem",
                fontWeight: "600",
                left: Math.random() * 500 + "px",
                top: Math.random() * 500 + "px",
            }
        })
    }
  
    render() {  
      const style = this.state.style
      return (
        <Button 
            style={style}
            onClick={this.shiftThis}
            text={"30 days of react"}
        />
      )
    }
  }

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)