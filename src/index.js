// index.js
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import axios from "axios";

import { BiCopyright } from "react-icons/bi";
import styled from "styled-components"
import "./css/catDisplay.css";

const getRes = async (url) => {
  const options = {
    url,
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json;charset=UTF-8"
    },
  }
  try {
    const response = await axios(options);
    const data = await response.data;
    if (response.status === 200) {
      return data;
    } else {
      throw new Error(`Got a wrong response with status: ${response.status}`)
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

const DisplayCard = ({
  catInfo: {
    id,
    name, 
    origin: country, 
    temperament,
    life_span: lifeSpan,
    weight: {
      metric: weight,
    },
    description,
  }
}) => {
  const [imgLink, setImgLink] = useState("/images/loading.gif");
  useEffect(
    () => {
      getRes(`https://api.thecatapi.com/v1/images/search?breed_id=${id}`)
      .then(
        (res) => {
          setImgLink(res[0].url);
        }
        , null
      );
    }, [id]);

  return (
    <div className="display-card-wrapper">
      <div className="display-card">
        <div className="img-wrapper">
          <img src={imgLink} alt=""></img>
        </div>
        <div className="cat-intro">
          <div className="card-title">
            <p className="card-name">{name}</p>
            <p className="card-country">{country}</p>
          </div>
          <div className="cat-attribute">
            <p>
              <span>Temperament: </span>
              {temperament}
            </p>
            <p>
              <span>Life Span: </span>
              {lifeSpan}
            </p>
            <p>
              <span>Weight: </span>
              {weight}
            </p>
          </div>
          <div className="cat-discription">
            <div>
              <div><span>Description</span></div>
              {description}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) 
}

const Header = ({catNumber, avgWeight, avgLifeSpan, isDay20}) => {
  return (
    <div id="header-wrapper">
      <h1 id="title">A Cat Display Page</h1>
      <Router>
        {isDay20 ? <Link to="/day-19">&lt;&lt; Day 19</Link> : <Link to="/day-20">Day 20 &gt;&gt;</Link>}
      </Router>
      <img 
        src="https://www.30daysofreact.com/static/media/favicon.e3a42d29.ico"
        alt=""
      />
        <h2>CATS PARADISE</h2>
      <h3>There are {catNumber} cat breeds</h3>
      <p>
        There are <span className="strong-number">{avgWeight}</span> Kg 
        and lives <span className="strong-number">{avgLifeSpan}</span> years
        on average.
      </p>
    </div>
  )
}

const Button = styled.button`
  border: 1px solid rgb(194, 191, 191);
  padding: 10px 15px;
  text-transform: uppercase;
  margin: 5px 20px 5px 0;
  font-weight: 400;
  border-radius: 2px;
  font-family: "Poppins";
  letter-spacing: 1.25px;
`

const Body = ({catData, isDay20, buttons}) => {
  return (
    <div id="body">
      {isDay20 && buttons.map()}
      {catData.map(
        (data) => {
          return (
            <DisplayCard
              key={data.id}
              catInfo={data}
            />
          )
        }
      )}
    </div>
  )
}

const Footer = () => {
  return (
    <div id="footer-wrapper">
      <p>Copyright<BiCopyright />balabalabala...</p>
      <p>Built by <a href="https://github.com/nzh233">nzh233</a></p>
    </div>
  )
}

const App = () => {
  const [catData, setCatData] = useState([]);
  const [avgWeight, setAvgWeight] = useState(0);
  const [avgLifeSpan, setAvgLifeSpan] = useState(0);
  const [buttons, setButtons] = useState([{
    text: "COUNTRY(X)",
    callback: () => {},
  }]);
  const [showedData, setShowedData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getRes("https://api.thecatapi.com/v1/breeds");
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
      
      setCatData(data);
      setShowedData(data);
      setAvgLifeSpan((lifeSum / count).toFixed(2));
      setAvgWeight((weightSum / count).toFixed(2));
    })();
  },[]);

  return (
    <>
      <Header
        catNumber={catData.length}
        avgWeight={avgWeight}
        avgLifeSpan={avgLifeSpan}
        isDay20={false}
      />
      <Body 
        catData={showedData}
      />
      <Footer />
    </>
  )
}
const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)