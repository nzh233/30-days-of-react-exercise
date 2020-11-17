import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BiCopyright } from "react-icons/bi";
import "./css/countriesDisplay.css"

function toThousands(number) {
  let num = (number || 0).toString(), result = '';
  while (num.length > 3) {
  result = ',' + num.slice(-3) + result;
  num = num.slice(0, num.length - 3);
  }
  if (num) { result = num + result; }
  return result;
}

const Country = ({countryInfo: {flagUrl, name, capital, languages, population, currencies}}) => {
  return (
    <div className="country">
      <div className="flag-wrapper">
        <img src={flagUrl} alt=""/>
      </div>
      <div className="card-name">{name}</div>
      <div className="country-info">
        <p><span className="info-class">Capital: </span>{capital}</p>
        <p><span className="info-class">Language: </span>{languages.join(", ")}</p>
        <p><span className="info-class">Population:</span>{toThousands(population)}</p>
        <p><span className="info-class">Currencies: </span>{currencies}</p>
      </div>
    </div>
  )
}
const Header = ({totalCount, searchedCount}) => {
  return (
    <header>
      <h1>WORLD COUNTRIES DATA</h1>
      <h2>Currently, we have {totalCount} countries and regions</h2>
      {searchedCount && <p>{totalCount.length} satisfied the search criteria</p>}
    </header>
  )
}
const Search = ({onSearchChange}) => {
  return (
    <div id="search">
      <div className="search-bar-wrapper">
        <input 
          type="text" 
          name="search-input" 
          onChange={onSearchChange} 
          autoComplete="false" 
          placeholder="Search countries by name, city or languages"
        />
      </div>
      <div className="goto-graph">
        <a href="#graph"><div></div></a>
      </div>
    </div>
  )
}
const Countries = ({displayCountries}) => {
  return (
    <div id="countries">
      {displayCountries.map(
        ({
          name,
          capital,
          currencies,
          languages,
          population,
          flag,
        }) => {
          const countryInfo = {flagUrl: flag, name, capital, languages, population, currencies};
          return <Country countryInfo={countryInfo} key={name}/>;
        }
      )}
    </div>
  )
}

const GraphItem = ({data: {name, width, number}}) => {
  const barWidth = {
    width: (width * 100).toFixed(2).toString() + "%",
  }
  return (
    <li className="graph-item">
      <div>{name.toString().toUpperCase()}</div>
      <div className="bar">
        <div className="colored-bar" style={barWidth}></div>
      </div>
      <div className="pop-number">{toThousands(number)}</div>
    </li>
  )
}

const PopulationGraph = ({searchedResult, worldPopulation}) => {
  const sortedResult = searchedResult.slice().sort((a, b) => b.population - a.population).slice(0, 10);
  return (
    <ul>
      <GraphItem 
        data={{
          name: "World",
          width: 1,
          number: worldPopulation, 
        }}
        key="world"
      /> 
      {sortedResult.map(
        ({name, population}) => (
            <GraphItem
            data={{
              name: name,
              width: population / worldPopulation,
              number: population,
            }}
            key={name}
            />  
        )
      )}
    </ul>
  );
}
const LanguageGraph = ({searchedResult, mostUsedLanguageCount}) => {
  const languagesMap = new Map();
  searchedResult.forEach(({languages}) => {
    for (const language of languages) {
      if (languagesMap.has(language)) {
        languagesMap.set(language, languagesMap.get(language) + 1);
        if (languagesMap.get(language) > mostUsedLanguageCount) {
          mostUsedLanguageCount = languagesMap.get(language);
        }
      } else {
        languagesMap.set(language, 1);
      }
    }
  });
  console.log(languagesMap);
  const sortedLanguages = [...languagesMap].sort((a, b) => b[1] - a[1]).slice(0, 10);
  return (
    <ul>
      {sortedLanguages.map((language) => (
        <GraphItem
          data={{
            name: language[0],
            width: language[1] / mostUsedLanguageCount,
            number: language[1],
          }}
          key={language[0]}
        />
      ))}
    </ul>
  )
}
const Graph = ({searchedResult, worldPopulation, mostUsedLanguageCount, graphType, onClick}) => {
  return (
    <div id="graph">
      <div className="graph-caption">
        <div className="graph-category">
          <button type="button" onClick={onClick} value="population">POPULATION</button>
          <button type="button" onClick={onClick} value="languages">LANGUAGES</button>
        </div>
        <h3>10 Most populated countries from above</h3>
        <div className="bars">
          { graphType === "population" 
            && <PopulationGraph 
                searchedResult={searchedResult} 
                worldPopulation={worldPopulation} 
                /> }
          { graphType === "languages" 
            && <LanguageGraph 
                searchedResult={searchedResult} 
                mostUsedLanguageCount={mostUsedLanguageCount} 
                /> }
        </div>

      </div>
    </div>
  )
}
const Footer = () => {
  return (
    <div>
      <p>Copyright<BiCopyright /> balabala</p>
      <p>Built by nzh233</p>
    </div>
  )
}
const App = (props) => {
  // setting initial state and method to update state
  const [data, setData] = useState([]);
  const [displayCountries, setDisplayCountries] = useState([]);
  const [mostUsedLanguageCount, setMostUsedLanguageCount] = useState(1);
  const [worldPopulation, setWroldPopulation] = useState(0);
  const [graphType, setGraphType] = useState("population");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const url = 'https://restcountries.eu/rest/v2/all'
    try {
      const response = await fetch(url);
      const data = await response.json();
      const languagesMap = new Map();
      let worldPopulation = 0;
      let mostUsedLanguageCount = 1;
      data.forEach(({languages, population}) => {
        worldPopulation += population;
        for (const language of languages) {
          if (languagesMap.has(language.name)) {
            languagesMap.set(language.name, languagesMap.get(language.name) + 1);
            if (languagesMap.get(language.name) > mostUsedLanguageCount) {
              mostUsedLanguageCount = languagesMap.get(language.name);
            }
          } else {
            languagesMap.set(language.name, 1);
          }
        }
      });
      const usefulData = data.map(
        ({
          name,
          capital,
          currencies,
          languages,
          population,
          flag,
        }) => {
          return {
            name, 
            capital, 
            currencies: currencies.map(currency => currency.name).join(", "), 
            languages: languages.map(language => language.name), 
            population, 
            flag,
          };
        }
      );
      setData(usefulData);
      setDisplayCountries(usefulData);
      setWroldPopulation(worldPopulation);
      setMostUsedLanguageCount(mostUsedLanguageCount);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    if (value !== "") {
      const displayCountries = [];
      for (const country of data) {
        if ( country.name.toLowerCase().indexOf(value) !== -1 
          || country.capital.toLowerCase().indexOf(value) !== -1 
          || country.languages.join(" ").toLowerCase().indexOf(value) !== -1) {
            displayCountries.push(country);
          }
      }
      setDisplayCountries(displayCountries);
    } else {
      setDisplayCountries(data);
    }
  };

  const onGraphChange = (e) => {
    const {value} = e.target;
    if (value === "languages" && graphType === "population") {
      setGraphType("languages");
    } else if (value === "population" && graphType === "languages") {
      setGraphType("population");
    }
  }
  return (
    <>
      <Header 
        totalCount={data.length}
        searchedCount={displayCountries.length}
      />
      <Search 
        onSearchChange={onSearchChange}
      />
      <Countries 
        displayCountries={displayCountries}
      />
      <Graph 
        worldPopulation={worldPopulation}
        searchedResult={displayCountries}
        mostUsedLanguageCount={mostUsedLanguageCount}
        graphType={graphType}
        onClick={onGraphChange}
      />
      <Footer />
    </>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)