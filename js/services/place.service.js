import { localStorageData } from './storage.service.js'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


const PLACES_KEY = 'placesDB'


export const placeService = {
    query,
    get,
    remove,
    save,
    getEmptyPlace,
}

_createPlaces()

function query() {
    return storageService.query(PLACES_KEY)
        .then(places => { return places })
}

function get(placeId) {
    return storageService.get(PLACES_KEY, placeId)
}

function remove(placeId) {
    return storageService.remove(PLACES_KEY, placeId)
}

function save(place) {
    if (place.id) {
        return storageService.put(PLACES_KEY, place)
    } else {
        return storageService.post(PLACES_KEY, place)
    }
}

function getEmptyPlace(name = '', lat = 0, lng = 0) {
    return { id: '', name, lat, lng }
}

function _createPlaces() {
    let Places = localStorageData.loadFromStorage(PLACES_KEY)
    if (!Places || !Places.length) {
        _createDemoPlaces()
    }
}

function _createDemoPlaces() {
    const demoPlaces = [{ name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }]


    const places = demoPlaces.map((place) => {
        const currPlace = _createPlace(place.name, place.lat, place.lng)
        return currPlace
    })
    localStorageData.saveToStorage(PLACES_KEY, places)
}
function _createPlace(name, lat, lng) {
    return {
        id: utilService.makeId(),
        name,
        lat,
        lng,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
    }
}

