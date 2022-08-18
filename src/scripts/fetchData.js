import { dataCodes } from "../data/dataCodes"

const errorMessageObj = { error: 'Data Unavailable' }

/**
 * Given a country code aggregate data by it's economic data codes
 * 
 * @param {*} countryCode this is a singular country code in a string
 * @param {*} args this is an array of of data codes as strings
 * @returns { 'US': {'GDP': <dataObject>, ...}}
 */
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


/**
 * Checks that data returned by api fetch is available and populated
 * This deals with an edge case where the http query returns a status code of 200,
 * but the data is not populated
 * 
 * @param {*} dataAsJson 
 * @returns boolean
 */
const checkData = (dataAsJson) => {
    const { data } = dataAsJson
    return data.dates.length && data.values.length && data.status.length 
} 

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