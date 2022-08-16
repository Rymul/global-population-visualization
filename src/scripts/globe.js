import { Versor } from './versor';
import { colors } from './colors'
import * as d3 from "d3";
import * as topojson from "topojson-client";


export default async function createGlobe(){

    const versor = new Versor();

    let canvas = d3.select("canvas"),
        current = d3.select("#current"),
        // width = canvas.property("width"),
        // height = canvas.property("height"),
        context = canvas.node().getContext("2d"),
        rotationDelay = 3000,
        scaleFactor = 0.9,
        degPerSec = 6,
        angles = { x: -20, y: 40, z: 0 },
        colorCountry = '#a00',
        colorGraticule = '#ccc',
        graticule = d3.geoGraticule10(),
        lastTime = d3.now(),
        degPerMs = degPerSec / 1000,
        width, height, land, countries, countryList, autorotate, diff, rotation,
        currentCountry;


    let projection = d3.geoOrthographic()
        .scale((height - 10) / 2)
        .translate([width / 2, height / 2])
        .precision(0.1);

    let path = d3.geoPath()
        .projection(projection)
        .context(context);



    let render = function() {},
        v0, // mouse position in Cartesian coordinates at start of drag gesture.
        r0, // Projection rotation as Euler angles at start.
        q0; // Projection rotation as versor at start.

    // window.addEventListener('onclick', (e) => {
    //     dragstarted(e)
    //     dragged(e)
    //     console.log('potato')
    // });

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
    
    function mousemove() {
        let c = getCountry(this)
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
        console.log(path.context())
        const world = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
        let sphere = {type: "Sphere"},
            land = topojson.feature(world, world.objects.land);
        countries = topojson.feature(world, world.objects.countries);

            // canvas.selectAll('path').data(countries.features).enter()
            // .append('path').attr('class', 'country').attr('d', path)
            // .attr('data-name', ele => ele.properties.name);

            // name = topojson.feature(world, world.objects.countries.geometries.properties)

            console.log(countries)
            // console.log(name)

        render = function() {
            context.clearRect(0, 0, width, height);
            // context.stroke(graticule, colorGraticule);
            context.beginPath(), path(sphere), context.fillStyle = "#12ADC1", context.fill();
            context.beginPath(), path(land), context.fillStyle = "#000", context.fill();
            context.beginPath(), path(countries), context.strokeStyle = '#fff', context.stroke();
            if (currentCountry) {
                context.fill(currentCountry, colorCountry);
            }
            // context.beginPath(), path('804'), context.fillStyle = '#FF8C00' , context.fill();
            // context.beginPath(), path(sphere), context.stroke();
        };
        console.log('hit this')
        render();
    }catch(e){
        console.log(e)
    }

    
    try{
        const countryNames = await d3.tsv('https://gist.githubusercontent.com/mbostock/4090846/raw/07e73f3c2d21558489604a0bc434b3a5cf41a867/world-country-names.tsv')
        countryList = countryNames
    }catch(e){
        console.log(e)
    }
    
    // console.log(render)

    setAngles()

    canvas.call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended)
    )
    .on("mousemove", mousemove);
  

    window.addEventListener('resize', scale)
    scale()
    autorotate = d3.timer(rotate)
}