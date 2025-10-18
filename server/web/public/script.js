// Setup map

let map = L.map(document.getElementsByClassName("map")[0]).setView([34.222, -118.243], 17);
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    maxZoom: 24,
    ext: 'png',
    attribution: '&copy; <a href="https://www.stadiamaps.com">Stadia</a> contributors'
}).addTo(map);

let userMarker, accuracyCircle;

map.locate({ setView: true, maxZoom: 16, enableHighAccuracy: true });
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

let activitiesVisible = false;
let communityVisible = false;
let foodVisible = false;

function updateMap() {

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