
import { fetchData } from './scripts/fetchData';
import { countryCodes } from './data/countryCodes';
import { dataCodes } from './data/dataCodes';
import { Versor } from './scripts/versor';
import { colors } from './scripts/colors'
import * as d3 from "d3";
import * as topojson from "topojson-client";

 

window.addEventListener('DOMContentLoaded', async (event) => {
    console.log('The Dom hath Loaded');
    console.log(d3)

    // const allCountryData = {};
    // const unitedStatesData = await fetchData('US');
    // Object.assign(allCountryData, unitedStatesData);
    // console.log(allCountryData);

    const versor = new Versor()

    let canvas = d3.select("canvas"),
        width = canvas.property("width"),
        height = canvas.property("height"),
        context = canvas.node().getContext("2d");

    let projection = d3.geoOrthographic()
        .scale((height - 10) / 2)
        .translate([width / 2, height / 2])
        .precision(0.1);

    let path = d3.geoPath()
        .projection(projection)
        .context(context);

    canvas.call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged));

    let render = function() {},
        v0, // mouse position in Cartesian coordinates at start of drag gesture.
        r0, // Projection rotation as Euler angles at start.
        q0; // Projection rotation as versor at start.

    window.addEventListener('onclick', (e) => {
        dragstarted(e)
        dragged(e)
        console.log('potato')
    });
    
    function dragstarted(e) {
        v0 = versor.cartesian(projection.invert(d3.pointer(e)));
        r0 = projection.rotate();
        q0 = versor.versor(r0);
    }

    function dragged(e) {
        let v1 = versor.cartesian(projection.rotate(r0).invert(d3.pointer(e))),
            q1 = versor.multiply(q0, versor.delta(v0, v1)),
            r1 = versor.rotation(q1);
        projection.rotate(r1);
        render();
    }

    

    try{
        const world = await d3.json("https://unpkg.com/world-atlas@1/world/110m.json")
        console.log(world)
        let sphere = {type: "Sphere"},
            land = topojson.feature(world, world.objects.land),
            countries = topojson.feature(world, world.objects.countries);
            console.log(countries)

        render = function() {
            context.clearRect(0, 0, width, height);
            context.beginPath(), path(sphere), context.fillStyle = "#fff", context.fill();
            context.beginPath(), path(land), context.fillStyle = "#000", context.fill();
            // context.beginPath(), path(countries), context.fillStyle = '#2F4F4F', context.fill();
            context.beginPath(), path('804'), context.fillStyle = '#FF8C00' , context.fill();
            context.beginPath(), path(sphere), context.stroke();
        };
        console.log('hit this')
        render();
    }catch(e){
        console.log(e)
    }
    // console.log(render)
  

});









// console.log('Garret Sucks');