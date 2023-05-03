import { utilService } from '/storage.service.js'
import { storageService } from './async-storage.service.js'


const PLACES_KEY = 'placesDB'


// export const placeService={

// }

_createPlaces()

function _createPlaces(){
    let Places = utilService.loadFromStorage(PET_KEY)
    if (!Places || !Places.length) {
        _createDemoPets()
    }

}

function _createDemoPets() {
    const petNames = ['Bobi', 'Charli', 'Pinchi']
    const petDescs = ['Bobi is an amazing dog', 'Charli is a curious cat', 'Just one look at Pinchi']

    const pets = petNames.map((petName, i) => {
        const pet = _createPet(petName)
        pet.desc = petDescs[i]
        return pet
    })

    utilService.saveToStorage(PET_KEY, pets)
}

function _createPlace(name,lat,ing) {
    id = utilService.makeId()
    name = name || utilService.randomPetName(pet.type)
    type = utilService.randomPetType()
    birth = utilService.randomPastTime()
    
}

// { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
//     { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }