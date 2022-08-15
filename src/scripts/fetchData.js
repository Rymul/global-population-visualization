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
            checkData(dataAsJson) ? 
                singleCountryData[countryCode][code] = dataAsJson.data : 
                singleCountryData[countryCode][code] = errorMessageObj
        } else {
            singleCountryData[countryCode][code] = errorMessageObj
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

