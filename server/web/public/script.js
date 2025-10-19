// Setup map
let map = L.map(document.getElementsByClassName("map")[0]).setView([34.222, -118.243], 17);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 24,
    ext: 'png',
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors'
}).addTo(map);
map.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>'); // Attribute Leaflet

let userMarker, accuracyCircle;

map.locate({ setView: false, maxZoom: 16, enableHighAccuracy: true });
if (map.zoomControl) {
    map.removeControl(map.zoomControl);
}

map.on('locationfound', function(e) {
    if (userMarker) {
        userMarker.setLatLng(e.latlng);
    } else {
        userMarker = L.circleMarker(e.latlng, {
            radius: 8,
            color: '#1e7898',
            weight: 3,
            opacity: 1,
            fill: true,
            fillColor: '#00bcf0',
            fillOpacity: 1
        }).addTo(map);

        // Accuracy circle
        if (e.accuracy > 32) {
            accuracyCircle = L.circle(e.latlng, {
                radius: e.accuracy || 0,
                color: '#1e7898',
                weight: 1,
                fillOpacity: 0.12
            }).addTo(map);
        }

        // Updates the marker in real-time
        if (navigator.geolocation && !window.__geoWatchId) {
            window.__geoWatchId = navigator.geolocation.watchPosition(function(pos) {
                const latlng = [pos.coords.latitude, pos.coords.longitude];
                const acc = pos.coords.accuracy || 0;
                userMarker.setLatLng(latlng);
                accuracyCircle.setLatLng(latlng).setRadius(acc);
            }, function(err) {
                console.error('watchPosition error', err);
            }, {
                enableHighAccuracy: true,
                maximumAge: 1000
            });
        }
    }
});

map.on('locationerror', function(e) {
    console.error('Location error:', e.message || e);
    const msg = e.message || 'Unable to retrieve your location';
});

var foodIcon = L.icon({
    iconUrl: 'src/foodIcon.svg',
    iconSize: [32, 32],
});

function addMarker(lat, lng, popupText) {
    const marker = L.marker([lat, lng], {
        icon: foodIcon
    }).addTo(map);
    if (popupText) {
        marker.bindPopup(popupText);
    }
}
function removeAllMarkers() {
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker && layer !== userMarker) {
            map.removeLayer(layer);
        }
    });
}

// Filter buttons
let activitiesVisible = false;
let communityVisible = false;
let foodVisible = false;

function updateMap() {
    console.log("Updating filter with settings:", {
        activities: activitiesVisible,
        community: communityVisible,
        food: foodVisible
    });
    document.getElementsByClassName('activities-filter-btn')[0].classList.toggle('active', activitiesVisible);
    document.getElementsByClassName('community-filter-btn')[0].classList.toggle('active', communityVisible);
    document.getElementsByClassName('food-filter-btn')[0].classList.toggle('active', foodVisible);
}

function toggleActivities() {
    activitiesVisible = !activitiesVisible;
    updateMap();
}
function toggleCommunity() {
    communityVisible = !communityVisible;
    updateMap();
}
function toggleFood() {
    foodVisible = !foodVisible;
    updateMap();
}

document.getElementsByClassName('activities-filter-btn')[0].addEventListener('click', toggleActivities);
document.getElementsByClassName('community-filter-btn')[0].addEventListener('click', toggleCommunity);
document.getElementsByClassName('food-filter-btn')[0].addEventListener('click', toggleFood);