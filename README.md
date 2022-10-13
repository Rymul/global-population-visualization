# Our Home By the Numbers
---
---



Global Economic Data Visualization
---
---

This project is an interactive examination of global population.
This project contains a 3D rendering of the globe, where users can navigate around our planet
and investigate the population trends of different countries.
By selecting a country, a graph will appear showing the population over the time frame available.



In Our Home By the Numbers, users are able to:
---
---

* Find instructions on how to navigate the globe
* Navigate the globe by allowing it to rotate or by dragging the globe themselves
* Select individual countries to see their population trends


Technologies, Libraries, API's:
---
---

* D3.js
* Charts.js
* Econ DB API
* JSDelivr API
* Google fonts API


Demo:
---
---
![project-demo](https://user-images.githubusercontent.com/65626651/186016582-7ddfab1d-1d58-4b2e-88c5-c1d6d6cf3e11.gif)


* The nav bar contains links to my Github repo, my LinkedIn, and my personal website.
* The instructions on how to use the visualization will appear when the project is launched.
* The center will contain an globe users can interact will to explore the data of our home.
* When selecting a country, data for that country will be fetched from the EconDB API, and a table will appear showing the population data for that country.

```javascript
export const fetchData = async (countryCode, args = dataCodes) => {
    const singleCountryData = {}
    singleCountryData[countryCode] = {}
    for(const code of args){
        const data = await fetch(`https://www.econdb.com/api/series/${code}${countryCode}/?format=json`)
        if (data.ok){
            const dataAsJson = await data.json()
            const clean = cleanData(dataAsJson, countryCode)
            checkData(dataAsJson) ? 
                singleCountryData[countryCode] = clean : 
                singleCountryData[countryCode] = errorMessageObj
        } else {
            singleCountryData[countryCode] = errorMessageObj
        }
    }
    return singleCountryData
}
```

```javascript
const cleanData = (dataAsJson, country) => {
    const data = {}
    let dates = dataAsJson.data.dates,
        values = dataAsJson.data.values;
        if (country !== undefined){
            let c = country.toString();
            for (let i = 0; i < dates.length; i++){
                let strYear = parseInt(dates[i].slice(0, 4)),
                    strMonth = parseInt(dates[i].slice(5, 7)),
                    year = parseInt(strYear),
                    month = parseInt(strMonth),
                    val = parseInt(values[i]); 
                if (c === 'CN') {
                    val = val * 10000  
                } else if (val < 1000000 && (country.toString() !== 'LU' && country.toString() !== 'MO' && country.toString() !== 'NP' )){
                    val = val * 1000 
                }     
                if ( month === 1 ){
                    data[year] = val
                }
            }
        }
    return data
}
```


