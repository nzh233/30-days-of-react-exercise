// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import cssLogo from './images/css_logo.png'
import htmlLogo from './images/html_logo.png'
import reactLogo from './images/react_logo.png'

const Techs = ({techs}) => {
  return (
  <div id="front-techs">
    <p><strong>Front End Technologies</strong></p>
    <ul>
      {techs.map(({techName, filePath}) => <li key={techName}><img src={filePath} alt=""></img></li>)}
    </ul>
  </div>);
}

const Subscribe = ({action, inputs}) => {
  return  (
    <div id="subscribe">
      <h2>SBUSCRIBE</h2>
      <p>Sign up with your email address to recieve news and updates.</p>
      <form action={action} id="subscribe-form">
        {inputs.map((name) => <input id={name.split(" ").join("-")} placeholder={name.slice(0,1).toUpperCase() + name.slice(1).toLowerCase()} />)}
      </form>
      <input type="submit" id="submit" />

    </div>
  )
}

const hexaColor = () => {
  let str = '0123456789abcdef'
  let color = ''
  for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * str.length)
    color += str[index]
  }
  return '#' + color
}

const RandomColoredDiv = () => {
  const colors = [];

  let divStyles = {
    border: "none",
    borderRadius: "10px",
    width: "300px",
    height: "100px",
    margin: "1px",
  }
  for (let i = 0; i < 5; i++) {
    colors.push(hexaColor());
  }
  return colors.map((color) => {
    let background = { background: color};
    background = Object.assign(background, divStyles);
    return <div style={background}>{color}</div>;
  })
}

// The App, or the parent or the container component
const App = () => {
  const techs = [
    {
      techName: "cssLogo",
      filePath: cssLogo,
    },
    {
      techName: "htmlLogo",
      filePath: htmlLogo,
    },
    {
      techName: "reactLogo",
      filePath: reactLogo,
    }
  ]
  const inputs = [
    "first name",
    "last name",
    "email",
  ]
  return (
    <div className='app'>
      <Techs techs={techs} />
      <Subscribe action="#" inputs={inputs}/>
      <RandomColoredDiv />
    </div>
  )
}

const ColoredBlock = ({block: {text, color}}) => {
  const backgroundColor = {
    backgroundColor: color,
  }
  return (
    <div className="colored-block" style={backgroundColor}>
      <p>{text}</p>
    </div>
  )
}

const NumberGenerator = () => {
  const blocks = [];
  const isPrime = (num) => {
    if (num < 2) return false;
    if (num === 2) return true;
    for(let i = 2; i < Math.sqrt(num) + 1; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  };

  for (let i = 0; i <= 31; i ++) {
    let color = "#21bf74";
    if (isPrime(i)) {
      color = "#fc5e53";
    } else if ((i & 1) ===1) {
      color = "#fddb3b";
    }
    blocks.push(<ColoredBlock block={{text: i, color: color}} />)
  }
  return (
    <div id="number-generator" className="day6-title">
      <h2>30 Days of React</h2>
      <p className="day6-side-title">Number Generator</p>
      <div className="blocks">
        {blocks}
      </div>
    </div>
  );
}

const HexadecimalColors = () => {
  const blocks = [];
  for (let i = 0; i <= 31; i ++) {
    const color = hexaColor();
    blocks.push(<ColoredBlock block={{text: color, color: color}} />)
  }
  return (
    <div id="hexadecimal-colors" className="day6-title">
      <h2>30 Days of React</h2>
      <p className="day6-side-title">Hexadecimal Colors</p>
      <div className="blocks">
        {blocks}
      </div>
    </div>
  );
}

const PopulationItem = ({data: {country, width, population}}) => {
  const barWidth = {
    width: (width * 100).toFixed(2).toString() + "%",
  }
  console.log(country, width, population);
  const formatPop = (num) => {
    num = (num || 0).toString();
    let result = '';
    while (num.length > 3) {
      result = ',' + num.slice(-3) + result;
      num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
  }
  return (
    <li className="pop-item" key={country}>
      <div>{country.toString().toUpperCase()}</div>
      <div className="bar">
        <div className="colored-bar" style={barWidth}></div>
      </div>
      <div className="pop-number">{formatPop(population)}</div>
    </li>
  )
}

const WorldPopulation = () => {
  const tenHighestPopulation = [
    { country: 'World', population: 7693165599 },
    { country: 'China', population: 1377422166 },
    { country: 'India', population: 1295210000 },
    { country: 'USA', population: 323947000 },
    { country: 'Indonesia', population: 258705000 },
    { country: 'Brazil', population: 206135893 },
    { country: 'Pakistan', population: 194125062 },
    { country: 'Nigeria', population: 186988000 },
    { country: 'Bangladesh', population: 161006790 },
    { country: 'Russia', population: 146599183 },
    { country: 'Japan', population: 126960000 },
  ]
  const divisor = tenHighestPopulation[0].population;
  const items = tenHighestPopulation.map(
    ({country, population}) => 
      <PopulationItem 
        data={{
          country: country,
          width: population/divisor,
          population: population,
        }} 
        key={country.split(" ").join("-")}/>
  )

  return (
    <div id="hexadecimal-colors" className="day6-title">
      <h2>30 Days of React</h2>
      <p className="day6-side-title">World population</p>
      <p>Ten most populate countries</p>
      <ul className="items">
        {items}
      </ul>
    </div>
  );
}

const rootElement = document.getElementById('root')
// we render the App component using the ReactDOM package
ReactDOM.render(<WorldPopulation />, rootElement)