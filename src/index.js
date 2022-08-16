
import { fetchData } from './scripts/fetchData';
import { countryCodes } from './data/countryCodes';
import { dataCodes } from './data/dataCodes';



import { createGlobe, getCountryCode } from "./scripts/globe"

 

window.addEventListener('DOMContentLoaded', async (event) => {
    console.log('The Dom hath Loaded');
    createGlobe()

    let countryCode = getCountryCode(current)
    const allCountryData = {};
    const unitedStatesData = await fetchData(countryCode);
    Object.assign(allCountryData, unitedStatesData);
    console.log(allCountryData);

  

});









// console.log('Garret Sucks');