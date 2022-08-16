
// import { Versor } from './versor';
// import { colors } from './colors'
// import * as d3 from "d3";
// import * as topojson from "topojson-client";


// export default async function createGlobe(){


//     const versor = new Versor();

//     const width = 900,
//         height = 600;


//     const svg = d3.select("body").append("svg").attr("width", width).attr("height", height).attr("class", "globe");
       

//     const projection = d3.geoOrthographic()
//         .scale((height - 10) / 2)
//         .translate([width / 2, height / 2])
//         .precision(0.1);

//     const path = d3.geoPath(projection)

//     const group = svg.append("group").attr("class", "group");

//     let render;

//     try{
//         console.log(path.context())
//         const world = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
//         console.log(world)
//         const sphere = {type: "Sphere"},
//             land = topojson.feature(world, world.objects.land),
//             countries = topojson.feature(world, world.objects.countries);

//             svg.selectAll('path').data(countries.features)
//             .enter().append('path').attr('class', 'country')
//             .attr('d', path).attr('data-name', ele => ele.properties.name);
//             // name = topojson.feature(world, world.objects.countries.geometries.properties)
//             // console.log(countries)
//             // console.log(name)
    

//         render = function() {
//             svg.selectAll("*").remove();
//             svg.selectAll('path').data(countries.features)
//             .enter().append('path').attr('class', 'country')
//             .attr('d', path).attr('data-name', ele => ele.properties.name);
//             // context.clearRect(0, 0, width, height);
//             // context.beginPath(), path(sphere), context.fillStyle = "#12ADC1", context.fill();
//             // context.beginPath(), path(land), context.fillStyle = "#000", context.fill();
//             // context.beginPath(), path(countries), context.strokeStyle = '#fff', context.stroke();
//             // context.beginPath(), path('804'), context.fillStyle = '#FF8C00' , context.fill();
//             // context.beginPath(), path(sphere), context.stroke();
//         };
//         console.log('hit this')
//         // render();
//     }catch(e){
//         console.log(e)
//     }




//     svg.call(d3.drag()
//         .on("start", dragstarted)
//         .on("drag", dragged));

//     // render = function() {},
//     let v0, // mouse position in Cartesian coordinates at start of drag gesture.
//         r0, // Projection rotation as Euler angles at start.
//         q0; // Projection rotation as versor at start.

//     // document.querySelector('.globe').addEventListener('mousedown', (e) => {
//     //     dragstarted(e)
//     //     dragged(e)
//     //     console.log('potato')
//     // });
    
//     function dragstarted(e) {
//         v0 = versor.cartesian(projection.invert(d3.pointer(e)));
//         r0 = projection.rotate();
//         q0 = versor.versor(r0);
//     }

//     function dragged(e) {
//         let v1 = versor.cartesian(projection.rotate(r0).invert(d3.pointer(e))),
//             q1 = versor.multiply(q0, versor.delta(v0, v1)),
//             r1 = versor.rotation(q1);
//         projection.rotate(r1);
//         render();
//     }

    
//     // 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
//     // "https://unpkg.com/world-atlas@1/world/110m.json"

    
//     // console.log(render)
  
// }




