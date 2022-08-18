// maybe - might just add these as a html element

export const instructions = () => {


    let canvas = document.getElementById('instructions')

    //If no chart exist, we need to create a new canvs
    if(!canvas){
    d3.select('body')
    .append('div').attr('class', 'instructionsContainer')
    d3.select('.instructionsContainer')
    .append('canvas').attr('id', 'instructions')
    d3.select('.instructionsContainer')

    canvas.innerHTML = 'Select a country to explore its population'

    canvas = document.getElementById('instructions')
    //If a chart does exist we need to delete the old canvas and create a new one
    } else {
    //create a nice chart
    //need to delete the canvas
    d3.select('#instructions').remove();
    d3.select('.instructionsContainer').append('canvas').attr('id', 'instructions')
    canvas = document.getElementById('instructions')
    }
}