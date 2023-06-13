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

let layers = {
    "Respondent who feels UCLA is well equipped with resources for SEA students": supported,
}


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
        L.circleMarker([data.lat,data.lng], circleOptions).addTo(map).bindPopup(`<h3>Where at UCLA do you feel must supported as a Southeast Asian student?</h3>
        <p>${data["Where at UCLA do you feel most supported as a Southeast Asian student?"]}</p>
        <h3>Why do you feel supported in that location?</h3>
        <p>${data["Why do you feel supported in that location? "]}</p>`).on('click', function(){
            const element = document.getElementById(data["Where at UCLA do you feel most supported as a Southeast Asian student?"]); //scrolls to button response on marker click
            element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        })
        createDropdown(data.lat,data.lng, data["Where at UCLA do you feel most supported as a Southeast Asian student?"]);
    }
}

// add to the locations collapsible
function createDropdown(lat,lng, loc){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"; // gives the button a unique id
    newButton.innerHTML = loc; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        const zoom = 17;
        map.flyTo([lat,lng],zoom); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('locations')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
}

//add to the responses collapsible
function addResponse(data){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = data["Where at UCLA do you feel most supported as a Southeast Asian student?"]; // gives the button a unique id
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
}

// add survey information to the response
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


function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    results.data.forEach(data => {
        addResponse(data)
        addMarker(data)
    })
    supported.addTo(map)
}

const dataURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ5fFbVnixndmfVEIDIrd-u4b-slbVGsNFv2OmRYxS3fTLNFFEmXdXDF4kuLuuItvaC8Pu_rd8In5TE/pub?output=csv"
loadData(dataURL)

// create collapsible
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