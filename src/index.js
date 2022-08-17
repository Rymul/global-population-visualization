
import { fetchData } from './scripts/fetchData';
import { countryCodes } from './data/countryCodes';
import { Versor } from './scripts/versor';
import { initLRUCache } from './scripts/lruCache'
import { generateTable, generateTableHead, deleteTable } from './scripts/dataTable'
import { makeChart } from './scripts/popChart';
import * as d3 from "d3";
import * as topojson from "topojson-client";


 

window.addEventListener('DOMContentLoaded', async (event) => {
    console.log('The Dom hath Loaded');
    // createGlobe()
    

    const allCountryData = {},
          versor = new Versor(),
          table = document.querySelector('.data-table');

    let canvas = d3.select("canvas"),
        current = d3.select("#current"),
        context = canvas.node().getContext("2d"),
        water = {type: 'Sphere'},
        rotationDelay = 2000,
        scaleFactor = 0.9,
        degPerSec = 6,
        angles = { x: -20, y: 40, z: 0 },
        colorCountry = '#755014', // #AE7417, #B9770E
        colorBoarders = "#000",
        colorGraticule = "#ccc",
        colorLand = "#145A32",
        colorWater = "#5DADE2",  // #3182bd
        graticule = d3.geoGraticule10(),
        lastTime = d3.now(),
        degPerMs = degPerSec / 3000,
        width, height, land, countries, countryList, countryName, autorotate, diff, rotation,
        currentCountry,
        v0, // mouse position in Cartesian coordinates at start of drag gesture.
        r0, // Projection rotation as Euler angles at start.
        q0; // Projection rotation as versor at start.

    let projection = d3.geoOrthographic()
        .scale((height - 10) / 2)
        .translate([width / 2, height / 2])
        .precision(0.1);

    let path = d3.geoPath()
        .projection(projection)
        .context(context);


    function render() {
        context.clearRect(0, 0, width, height)
        fill(water, colorWater)
        stroke(graticule, colorGraticule)
        fill(land, colorLand)
        stroke(countries, colorBoarders)
        if (currentCountry) {
          fill(currentCountry, colorCountry)
        }
      }
      
    function fill(obj, color) {
        context.beginPath()
        path(obj)
        context.fillStyle = color
        context.fill()
    }
      
    function stroke(obj, color) {
        context.beginPath()
        path(obj)
        context.strokeStyle = color
        context.stroke()
    }


    function setAngles() {
        let rotation = projection.rotate()
        rotation[0] = angles.y
        rotation[1] = angles.x
        rotation[2] = angles.z
        projection.rotate(rotation)
      }
      
    function scale() {
        width = document.documentElement.clientWidth
        height = document.documentElement.clientHeight
        canvas.attr('width', width).attr('height', height)
        projection
            .scale((scaleFactor * Math.min(width, height)) / 2)
            .translate([width / 2, height / 2])
        render()
    }

    function rotate(elapsed) {
        let now = d3.now();
        diff = now - lastTime;
        if (diff < elapsed) {
            rotation = projection.rotate();
            rotation[0] += diff * degPerMs
            projection.rotate(rotation)
            render()
        }
        lastTime = now
    }

    function startRotation(delay) {
        autorotate.restart(rotate, delay || 0)
    }


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

    function dragended(e) {
        startRotation(rotationDelay)
    }


    function enter(country){
        let countryName = countryList.find(c => {
            return parseInt(c.id, 10) === parseInt(country.id, 10)
        })
        current.text(countryName && countryName.name || '')
        // console.log('countryName', countryName)
        return countryName && countryName.name || ''
    }

    function leave(country){
        current.text('')
    }


    // https://github.com/d3/d3-polygon
    function polygonContains(polygon, point) {
        let n = polygon.length
        let p = polygon[n - 1]
        let x = point[0], y = point[1]
        let x0 = p[0], y0 = p[1]
        let x1, y1
        let inside = false
        for (let i = 0; i < n; ++i) {
        p = polygon[i], x1 = p[0], y1 = p[1]
        if (((y1 > y) !== (y0 > y)) && (x < (x0 - x1) * (y - y1) / (y0 - y1) + x1)) inside = !inside
        x0 = x1, y0 = y1
        }
        return inside
  }
    
    function mousemove(e) {
        let c = getCountry(e)
        if (!c) {
          if (currentCountry) {
            leave(currentCountry)
            currentCountry = undefined
            render()
          }
          return
        }
        if (c === currentCountry) {
          return
        }
        currentCountry = c
        render()
        enter(c)
    }

    function getCountryCode(countryName) {
        if(countryName && Object.keys(countryCodes).includes(countryName)) {
            let countryCode = countryCodes[countryName]
            // console.log(countryCode)
            return countryCode
        } else {
            alert("Data Unavailable")
        }
    }
    
    async function loadCountryData(event){
        let c = getCountry(event)
        let name = enter(c)
        let countryCode = getCountryCode(name)
        
        if(!Object.keys(allCountryData).includes(countryCode)){
            const currentCountryData = await fetchData(countryCode);
            Object.assign(allCountryData, currentCountryData);
        }

        // console.log('ALL COUNTRY OBJ', allCountryData)
        // console.log('Country Code', countryCode)
        // console.log('US Obj', allCountryData[countryCode])

        makeChart(allCountryData, countryCode)

        // let count = document.querySelector('thead').children.length
        // if (count > 3){
        //     deleteTable(table)
        // }
        // generateTable(table, allCountryData);
    }

    function getCountry(event) {
        let pos = projection.invert(d3.pointer(event))
        return countries.features.find(function(f) {
          return f.geometry.coordinates.find(function(c1) {
            return polygonContains(c1, pos) || c1.find(function(c2) {
              return polygonContains(c2, pos)
            })
          })
        })
      }
    

    // 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
    // "https://unpkg.com/world-atlas@1/world/110m.json"

    try{
        const world = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
        // let sphere = {type: "Sphere"},
        // console.log(world)
            land = topojson.feature(world, world.objects.land);
            countries = topojson.feature(world, world.objects.countries);
            // name = topojson.feature(countries, countries.features.properties);
            // console.log(countries)
            // console.log(countries.features.properties.name)
            // console.log(name)
    }catch(e){
        console.log(e)
    }

    
    try{
        const countryNames = await d3.tsv('https://gist.githubusercontent.com/mbostock/4090846/raw/07e73f3c2d21558489604a0bc434b3a5cf41a867/world-country-names.tsv')
        // console.log(countryNames)
        countryList = countryNames
    }catch(e){
        console.log(e)
    }
    

    setAngles()

    canvas.call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended)
    )
    .on("mousemove", mousemove)
    .on("click", loadCountryData)
    // .on("click", generateTable)
   
       
  

    window.addEventListener('resize', scale);
    scale();
    autorotate = d3.timer(rotate);

    
    // generateTableHead(table);

});









// console.log('Garret Sucks');