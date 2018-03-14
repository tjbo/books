// using a couple api keys, because google only allows 1000 requests, and that is pretty easy to hit from a search bar
// that sendes network requests (each time a favorite loads, it counts as one as well)
let config = {
    apiKey1: 'AIzaSyCNOtJDIc07lHRsEtWezn8lOfFOOL2PevI',
    apiKey2: 'AIzaSyDF-cyWMyQz81H2KMu0j9JRgMPKBMhWDm4',
}

export { config as default }