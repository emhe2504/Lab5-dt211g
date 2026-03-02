
/**@type {L.Map} Leaflet-karta */
let map;

/**@type {HTMLInputElement} Sökfält för plats */
let searchPlace;

/**
 * Skapar kartan från Leaflet och triggar nästa funktion
 */

export function createMap() {

    map = L.map('map').setView([59.33, 18.064], 14);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    getSearch();
}

/**
 * Skapar sökfunktion och tar värdet därifrån, skickar vidare
 */

export function getSearch() {

    searchPlace = document.getElementById("search");
    const button = document.getElementById("searchButton");

    button.addEventListener("click", () => {

        const searchValue = searchPlace.value;
        const bigLetterValue = searchValue.toUpperCase();

        mapPlace(bigLetterValue);
    });
}

/**
 * fetchar platsinfo API utifrån sök-value som skickas hit
 * @param {string} bigLetterValue - sökvärdet (med stor bokstav)
 */

export async function mapPlace(bigLetterValue) {

    const link = `https://nominatim.openstreetmap.org/search?q=${bigLetterValue}&format=json`;

    try {

        const linkInfo = await fetch(link);
        const jsonInfo = await linkInfo.json();

        mapSearch(jsonInfo);
    }

    catch (error) {

        searchPlace = document.getElementById("search");
        const errorPlacement = document.getElementById("errorPlacement");
        errorPlacement.innerHTML = "Verkar som det blev något fel, prova igen :)";

        searchPlace.addEventListener("input", () => {
            errorPlacement.innerHTML = "";
        });
    }
}

/**
 * Tar emot platsinfo från API
 * och skapar arrayer med
 * latitud samt longitud
 * @param {Array<Object>} jsonInfo - array med platsobjekt från API
 */

function mapSearch(jsonInfo) {

    const latitudes = [];
    const longitudes = [];

    jsonInfo.forEach(element => {

        const latitude = element.lat;
        const longitude = element.lon;

        latitudes.push(latitude);
        longitudes.push(longitude);
    });

    createMarker(latitudes, longitudes);

}

/**
 * Skapar markör på karta med första koordinaterna
 * i arrayerna + 
 * skriver ut koordinater på skärmen
 * @param {Array<number>} latitudes 
 * @param {Array<number>} longitudes 
 */

function createMarker(latitudes, longitudes) {

    const lat = parseFloat(latitudes[0]);
    const lon = parseFloat(longitudes[0]);

    L.marker([lat, lon]).addTo(map);
    map.setView([lat, lon], 14);

    const cordPlace = document.getElementById("coordinates");
    cordPlace.innerHTML = `<p>Latitud: ${lat}, Longitud: ${lon} </p>`;
}