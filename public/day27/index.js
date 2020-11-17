import React, { useRef } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const ref = useRef(null)
  const generateColor = () => {
    const rgbColor = Array(3);
    for (let singleColor of rgbColor) {
      singleColor = Math.floor(Math.random() * 256);
    }
    return rgbColor;
  }
  const onClick = () => {
    const colorsToGenerate = 27;
    const colors = Array(colorsToGenerate);
    const colorsReverse = Array(colorsToGenerate);
    for (let i = 0; i < colorsToGenerate; i++) {
      const color = generateColor();
      color.push(color);
      colorsReverse.push(color.map((singleColor) => 255 - singleColor));
    }
    
    ref.current.style.backgroundColor = '#61dbfb'
    ref.current.style.padding = '50px'
    ref.current.style.textAlign = 'center'
  }
  return (
    <div className='App'>
      <h1 ref={ref}>How to style HTML from the DOM tree using useRef</h1>
      <button onClick={onClick}>Style it</button>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)