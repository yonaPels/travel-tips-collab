
export const mapService = {
    initMap,
    addMarker,
    panTo,
    goToPos
}


// Var that is used throughout this Module (not global)
var gMap


function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            
            // Configure the click listener.
            gMap.addListener("click", (mapsMouseEvent) => {
               
             getClickdPos(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2))
                    
            })
            console.log('Map!', gMap)
        })
}

function goToPos(lat,lng){
   return gMap.center={lat,lng}
}

function getClickdPos(pos){
console.log(pos)
}
    

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyCQ4t1UeQOSoU0bHHsi5E_cNMpFpZ9Hhys' //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}