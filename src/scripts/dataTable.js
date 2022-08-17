
import { dataCodesObj } from "../data/dataCodes";



export function generateTableHead(table){
    let tHead = table.createTHead();
    let row = tHead.insertRow();
    for (let key in dataCodesObj) {
        let th = document.createElement('th');
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}




export function generateTable(table, data) {
    let gdp = Object.values(data).map(obj => obj.GDP.values[obj.GDP.values.length - 1])
   
    // console.log(Object.values(data).map(obj => obj.GDP.values.pop()),"bad bunny")
    // for (let country in data) {
    //     let row = table.insertRow();
    //     for (let key in country) {
    //         let cell = row.insertCell();
    //         let text = document.createTextNode(country[key]);
    //         cell.appendChild(text)
    //     }
    // }
    let countryOne = document.querySelector('.country-1')
    countryOne.innerHTML = (gdp[gdp.length - 1])
    let countryTwo = document.querySelector('.country-2')
    countryTwo.innerHTML = (gdp[gdp.length - 1])
    // console.log(countryTwo)

    // let cell =  table.insertRow().insertCell()
    // let text = document.createTextNode(gdp[gdp.length - 1])
    // cell.appendChild(text)

    // create 2 tr

}

export function deleteTable(table) {
    document.querySelector('thead').firstChild.remove()
}