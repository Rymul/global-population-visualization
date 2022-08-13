

// let endpoints = ['GDPUS', 'GDPDE']
// function to run api fetching
const data = (arr1, arr2)  => {
    const bigData = {}
    for (let i = 0; i < arr2.length; i++) {
        bigData[arr2[i]] = {}
        for (let j = 0; j < arr1.length; j++) {
            fetch(`https://www.econdb.com/api/series/${arr1[j]}${arr2[i]}/?format=json`).then(result => result.json()).then(stuff => console.log(stuff));
            // console.log(res);
            // console.log(res.json())
            // if(res.ok) {
            //     const countryData = await res.json();
            //     bigData[arr2[i]][arr1[j]] = countryData.data
            //     console.log(countryData)
            // } else {
            //     bigData[arr2[i]][arr1[j]] = 'Data Unavailable'
            // }
            
            // console.log(res);     
        
        }
    }
    console.log(bigData)
}
  






export { data }