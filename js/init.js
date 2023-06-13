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
        createDropdown(data.lat,data.lng, data["Where at UCLA do you feel most supported as a Southeast Asian student?"])
    }
    else if(data["Do you feel that UCLA is equipped with adequate resources resources/programs/events/ etc. to support Southeast Asian students? (either student led or university led)"] == "No"){
        circleOptions.fillColor = "red"
        L.circleMarker([data.lat,data.lng], circleOptions).addTo(map).bindPopup(`<h2>${data["Where at UCLA do you feel most supported as a Southeast Asian student?"]}</h2>
        <h3>${data["Why do you feel supported in that location? "]}</h3>`)
        createDropdown(data.lat,data.lng, data["Where at UCLA do you feel most supported as a Southeast Asian student?"])
    }
    else{
        circleOptions.fillColor = "green"
        L.circleMarker([data.lat,data.lng], circleOptions).addTo(map).bindPopup(`<h2>${data["Where at UCLA do you feel most supported as a Southeast Asian student?"]}</h2>
        <h3>${data["Why do you feel supported in that location? "]}</h3>`)
        createDropdown(data.lat,data.lng, data["Where at UCLA do you feel most supported as a Southeast Asian student?"])
    }
}

function createDropdown(lat,lng, loc){
    // old button functions
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"; // gives the button a unique id
    newButton.innerHTML = loc; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        const zoom = 17;
        map.flyTo([lat,lng],zoom); //this is the flyTo from Leaflet
    })


    // const option = document.createElement("option")
    // option.text = loc;
    // option.addEventListener('click', function(){
    //     const zoom = 17;
    //     map.flyTo([lat,lng],zoom); //this is the flyTo from Leaflet
    // })
    // const dropdownMenu = document.getElementById('myDropdown')
    // dropdownMenu.appendChild(option)

    const spaceForButtons = document.getElementById('locations')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.

}

function addResponse(data){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"; // gives the button a unique id
    addToResponse(newButton, "question", "Do you feel that UCLA is equipped with adequate resources resources/programs/events/ etc. to support Southeast Asian students? (either student led or university led)")
    addToResponse(newButton, "response", data["Do you feel that UCLA is equipped with adequate resources resources/programs/events/ etc. to support Southeast Asian students? (either student led or university led)"])
    addToResponse(newButton, "question", "Do you feel that UCLA is equipped with adequate resources resources/programs/events/ etc. to support Southeast Asian students? (either student led or university led)")
    addToResponse(newButton, "response", data["Do you feel that UCLA is equipped with adequate resources resources/programs/events/ etc. to support Southeast Asian students? (either student led or university led)"])
    addToResponse(newButton,"question", "Why do you feel that way?");
    addToResponse(newButton, "response", data["Why do you feel that way? "]);
    addToResponse(newButton, "question", "Where at UCLA do you feel most supported as a Southeast Asian student?");
    addToResponse(newButton, "response", data["Where at UCLA do you feel most supported as a Southeast Asian student?"]);
    addToResponse(newButton, "question", "Why do you feel supported in that location? ");
    addToResponse(newButton, "response", data["Why do you feel supported in that location? "]);
    addToResponse(newButton, "question", "What is your experience with resources/programs/events/ etc. for Southeast Asian students? (either student led or university led)");
    addToResponse(newButton, "response", data["What is your experience with resources/programs/events/ etc. for Southeast Asian students? (either student led or university led)"]);
    addToResponse(newButton, "question", "What resources/programs/events would you like to see in UCLA to support Southeast Asian students? ");
    addToResponse(newButton, "response", data["What resources/programs/events would you like to see in UCLA to support Southeast Asian students? "])
    addToResponse(newButton, "question", "What is your (expected) year of graduation? ");
    addToResponse(newButton, "response", data["What is your (expected) year of graduation? "]);
    newButton.setAttribute("lat",data.lat); // sets the latitude 
    newButton.setAttribute("lng",data.lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        const zoom = 17;
        map.flyTo([data.lat,data.lng],zoom); //this is the flyTo from Leaflet
    })
    const resp = document.getElementById('responses');
    resp.appendChild(newButton);

    // const spaceForResponse = document.getElementById('responses');
    // spaceForResponse.appendChild(newResponse);
}

function addToResponse(newResponse, type, text){
    if(type == "question"){
        const question = document.createElement('question');
        const content = document.createTextNode(text);
        question.appendChild(content);
        newResponse.appendChild(question);
    } 
    else{
        const p = document.createElement('p')
        const response1 = document.createTextNode(text);
         p.appendChild(response1);
        newResponse.appendChild(p);
    }
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
        addResponse(data)
        // addResponse(data)
    })
    supported.addTo(map)
    notSupported.addTo(map)
    dontKnow.addTo(map)
    let allLayers = L.featureGroup([supported,notSupported,dontKnow]);
    map.fitBounds(allLayers.getBounds());
}


loadData(dataURL)


  var coll = document.getElementsByClassName("collapsible");
  var i;
  
  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }