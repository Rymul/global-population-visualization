
import { fetchData } from './scripts/fetchData';
import { countryCodes } from './data/countryCodes';
import { dataCodes } from './data/dataCodes';


import createGlobe from "./scripts/globe"

 

window.addEventListener('DOMContentLoaded', async (event) => {
    console.log('The Dom hath Loaded');
    createGlobe()

    // const allCountryData = {};
    // const unitedStatesData = await fetchData('US');
    // Object.assign(allCountryData, unitedStatesData);
    // console.log(allCountryData);

  

});









// console.log('Garret Sucks');