
let map;
let searchPlace;

export function createMap() {

    map = L.map('map').setView([59.33, 18.064], 14);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    getSearch();
}

export function getSearch() {

    searchPlace = document.getElementById("search");
    const button = document.getElementById("searchButton");

    button.addEventListener("click", () => {

        const searchValue = searchPlace.value;
        const bigLetterValue = searchValue.toUpperCase();

        mapPlace(bigLetterValue);
    });
}

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

function createMarker(latitudes, longitudes) {

    const lat = parseFloat(latitudes[0]);
    const lon = parseFloat(longitudes[0]);

    L.marker([lat, lon]).addTo(map);
    map.setView([lat, lon], 14);

    const cordPlace = document.getElementById("coordinates");
    cordPlace.innerHTML = `<p>Latitud: ${lat}, Longitud: ${lon} </p>`;
}