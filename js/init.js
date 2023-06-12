// declare variables
let mapOptions = {'center': [34.0690,-118.444],'zoom':15}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);


let CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});

CartoDB_Positron.addTo(map)


let supported = L.featureGroup();
let notSupported = L.featureGroup();
let dontKnow = L.featureGroup();

let layers = {
    "Respondent who feels UCLA is well equipped with resources for SEA students": supported,
    "Respondent who does not know if UCLA is well equipped with resources for SEA students": dontKnow,
    "Respondent who does not feel  UCLA is well equipped with resources for SEA students": notSupported
}

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
    if(data["Do you feel that UCLA is equipped with adequate resources resources/programs/events/ etc. to support Southeast Asian students? (either student led or university led)"] == "Yes"){
        circleOptions.fillColor = "blue"
        L.circleMarker([data.lat,data.lng], circleOptions).addTo(map).bindPopup(`<h2>${data["Where at UCLA do you feel most supported as a Southeast Asian student?"]}</h2>
        <h3>${data["Why do you feel supported in that location? "]}</h3>`)
        createButtons(data.lat,data.lng, data["Where at UCLA do you feel most supported as a Southeast Asian student?"])
    }
    else if(data["Do you feel that UCLA is equipped with adequate resources resources/programs/events/ etc. to support Southeast Asian students? (either student led or university led)"] == "No"){
        circleOptions.fillColor = "red"
        L.circleMarker([data.lat,data.lng], circleOptions).addTo(map).bindPopup(`<h2>${data["Where at UCLA do you feel most supported as a Southeast Asian student?"]}</h2>
        <h3>${data["Why do you feel supported in that location? "]}</h3>`)
        createButtons(data.lat,data.lng, data["Where at UCLA do you feel most supported as a Southeast Asian student?"])
    }
    else{
        circleOptions.fillColor = "green"
        L.circleMarker([data.lat,data.lng], circleOptions).addTo(map).bindPopup(`<h2>${data["Where at UCLA do you feel most supported as a Southeast Asian student?"]}</h2>
        <h3>${data["Why do you feel supported in that location? "]}</h3>`)
        createButtons(data.lat,data.lng, data["Where at UCLA do you feel most supported as a Southeast Asian student?"])
    }
}

function createButtons(lat,lng, loc){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"; // gives the button a unique id
    newButton.innerHTML = loc; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        const zoom = 17;
        map.flyTo([lat,lng],zoom); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('placeForButtons')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
}

// // function addResponses(data){
//     const newResponse = 
//     const spaceForResponses = document.getElementById('responses')
//     spaceForResponses.appendChild(newResponse);
// //     <h2>${data["Where at UCLA do you feel most supported as a Southeast Asian student?"]}</h2>
// // }

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
        // addResponse(data)
    })
    supported.addTo(map)
    notSupported.addTo(map)
    dontKnow.addTo(map)
    let allLayers = L.featureGroup([supported,notSupported,dontKnow]);
    map.fitBounds(allLayers.getBounds());
}


loadData(dataURL)

