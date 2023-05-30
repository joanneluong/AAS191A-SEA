// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':9}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

let CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});

CartoDB_Positron.addTo(map)



// let concert = L.featureGroup();
// let noConcert = L.featureGroup();

// let layers = {
//     "Respondent who has attended a live concert": concert,
//     "Respondent who has never attended a live concert": noConcert
// }

// add layer control box
L.control.layers(null,layers).addTo(map)

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

// create a function to add markers
function addMarker(data){
    // if(data["Have you ever attended a live concert?"] == "Yes"){
        circleOptions.fillColor = "blue"
        concert.addLayer(L.circleMarker([data.lat,data.lng], circleOptions).bindPopup(`<h2>${data["Where at UCLA do you feel most supported as a Southeast Asian student? "]}</h2>`))
        createButtons(data.lat,data.lng,data['Where at UCLA do you feel most supported as a Southeast Asian student?'])
    // }
    // else{
    //     circleOptions.fillColor = "red"
    //     noConcert.addLayer(L.circleMarker([0,0],circleOptions).bindPopup('<h2> Have never been to a live conert </h2>'))
    //     createButtons(0,0, "Have never been to a live concert", "")
    // }
    // return data['What venue did you see them at?']
}

function createButtons(lat,lng, loc){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"; // gives the button a unique id
    newButton.innerHTML = loc; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        const zoom = 13;
        map.flyTo([lat,lng],zoom); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('placeForButtons')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
}

const dataURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5fFbVnixndmfVEIDIrd-u4b-slbVGsNFv2OmRYxS3fTLNFFEmXdXDF4kuLuuItvaC8Pu_rd8In5TE/pub?output=csv"

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    results.data.forEach(data => {
        addMarker(data)
        //console.log(data)
    })
    // concert.addTo(map)
    // noConcert.addTo(map)
    // let allLayers = L.featureGroup([concert,noConcert]);
    // map.fitBounds(allLayers.getBounds());
}


loadData(dataURL)

