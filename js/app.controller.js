import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { placeService } from './services/place.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onSearch = onSearch
window.onDelete = onDelete
window.onGoToPos = onGoToPos

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
    placeService.query()
        .then((places) => renderplaces(places))
}

function onSearch(ev) {
    ev.preventDefault()
    const input = document.querySelector('.search')
    let elValue = ev.target.value
    console.log(elValue)

}

function renderplaces(places) {
    console.log(places)
    const strHTML = places.map(place =>
        `
        <div>
        name:${place.name}
        lat:${place.lat}
        lng:${place.lng}
        <div class="action">
        <button class="go" onclick="onGoToPos(${place.lat, place.lng})">go</button>
        <button class="delete" onclick="onDelete('${place.id}')">delete</button>
        </div>
        </div>
        `)
    document.querySelector('.locs').innerHTML = strHTML.join('')
}

function onGoToPos(lat, lng) {
    // mapService.goToPos({pos})
    console.log(lat, lng)
}

function onDelete(id) {
    placeService.remove(id)
        .then(() => placeService.query())
        .then(places => renderplaces(places))
}
// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}