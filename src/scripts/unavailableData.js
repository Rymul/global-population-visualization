export const makeNoDataModal = () => {
    

    let canvas = document.getElementById('unavailable')

    //If no chart exist, we need to create a new canvs
    if(!canvas){
        document.querySelector('body')
        .append('div').attr('class', 'noData')
        document.querySelector('.noData')
        .append('div').attr('class', 'noDataContainer')
        document.querySelector('.noDataContainer')
        .append('canvas').attr('id', 'unavailable')
        document.querySelector('.modalContainer')


        canvas = document.getElementById('unavailable')
        document.getElementById('unavailable').innerHTML = "Data Unavailable"
        // canvas.innerHTML = "Data Unavailable"
        //If a chart does exist we need to delete the old canvas and create a new one
    } else {
        //create a nice chart
        //need to delete the canvas
        document.querySelector('#unavailable').remove();
        document.querySelector('.noDataContainer').append('canvas').attr('id', 'unavailable')
        canvas = document.getElementById('unavailable')
    }
}