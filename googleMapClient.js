function initMap() {
    // Créer une nouvelle carte Google Maps centrée sur Paris
    return new google.maps.Map(document.getElementById("map"), {
        center: { lat: 45.75, lng: 4.85 },
        zoom: 12
    });
}

function addValueToMarkerList(value, markerList) {
    markerList.add(value);
    return markerList
};

function clearMarkers() {
    markerList = new Set();
}

function newMarker(lat, lon, title, mapDivId, callback ) {
    var marker = new google.maps.Marker({
        position: { lat: lat, lng: lon},
        map: mapDivId,
        title: title
    })
    var mainPage = $('#mainPage')
    marker.addListener("click", function () {
        callback(marker.title, mainPage);
    })
}