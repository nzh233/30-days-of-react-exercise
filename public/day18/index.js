import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from "axios"

const CatInfoAvg = ({catInfo:{catCount, catWeightAvg, catLifeSpanAvg}}) => {
  return (
    <>
      <h1>Cats Paradise</h1>
      <p>There are {catCount} cat breeds</p>
      <p>
        On average a cat can weight
        about<span> {catWeightAvg} </span>Kg
        and live<span> {catLifeSpanAvg} </span>years
      </p>
    </>
  )
}

class App extends Component {
  state = {
    catInfo: {
      catCount: 0,
      catWeightAvg: 0, 
      catLifeSpanAvg: 0,
    },
  }

  componentDidMount() {
    this.fetchCatData();
  }

  fetchCatData = async () => {
    const options = {
      url: "https://api.thecatapi.com/v1/breeds",
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
    }
    try {
      const response = await axios(options);
      const data = await response.data;
      if (response.status === 200) {
        let count = data.length;
        const usefulData = data.map(({weight: {metric}, life_span}) => {
          return {weight: metric, life: life_span}
        })
        let weightSum = 0,
            lifeSum = 0;
        usefulData.forEach(({weight, life}) => {
          const weightRange = weight.split(" - ").map((x) => parseInt(x));
          const lifeSpanRange = life.split(" - ").map((x) => parseInt(x));
          weightSum += (weightRange[0] + weightRange[1]) / 2;
          lifeSum += (lifeSpanRange[0] + lifeSpanRange[1]) / 2;
        })
        this.setState({
          catInfo: {
            catCount: count, 
            catWeightAvg: (weightSum / count).toFixed(2), 
            catLifeSpanAvg: (lifeSum / count).toFixed(2),
          },
        })
      } else {
        throw new Error(`Got a wrong status ${response.status}`)
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <CatInfoAvg 
        catInfo={this.state.catInfo}
      />
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)