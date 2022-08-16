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
    for (let country in data) {
        let row = table.insertRow();
        for (let key in country) {
            let cell = row.insertCell();
            let text = document.createTextNode(country[key]);
            cell.appendChild(text)
        }
    }
}