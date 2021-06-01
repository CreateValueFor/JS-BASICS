const API_KEY = "2df5352bd99f09dbc1de0b7a1365efcf";
const COORDS = 'coords'

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
}

function handleGeoError(){
    console.log("Cant access geo location")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError)
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords ===null){
        askForCoords();
    } else{
        //getWeather
    }
}

function init(){
    loadCoords();
}
init();