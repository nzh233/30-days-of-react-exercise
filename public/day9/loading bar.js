// index.js
import React from 'react'
import ReactDOM from 'react-dom'

// class based component
class LoadingBar extends React.Component {
  render() {
    const {
      percentage,
      handleClick,
    } = this.props;
    let filledStyle = {
      width: percentage + "%",
    }
    return (
      <div className="loading-bar-wrapper">
        <div className="empty-bar">
          <div className="filled-bar" style={filledStyle} ></div>
        </div>
        <div className="percentage-number">{percentage} %</div>
        <button onClick={handleClick}>Start</button>
      </div>
    )
  }
}

const Button = ({method}) => <button onClick={method}>Start</button>
  
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    percentage: 0,
    interval: null,
  }
  startProgress = () => {
    if (this.state.interval === null) {
      this.state.interval = setInterval(()=> {
        if (this.state.percentage < 100) {
          this.setState({ percentage: this.state.percentage + 1 });
        } else {
          clearInterval(this.state.interval);
        }
      }, 100);
    } else {
      clearInterval(this.state.interval);
      this.state.interval = null;
    }

  }
  render() {
    return (
      <div className='app'>
        <LoadingBar 
          percentage={this.state.percentage}
          handleClick={this.startProgress}
        />
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)