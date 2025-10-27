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
    backgroundColor: 'white'
});
var communityIcon = L.icon({
    iconUrl: 'src/communityIcon.svg',
    iconSize: [32, 32],
});
var activitiesIcon = L.icon({
    iconUrl: 'src/activitiesIcon.svg',
    iconSize: [32, 32],
});

function addMarker(lat, lng, category, popupText, id) {
    console.log(category)
    let marker;
    if (category == 0) {
        marker = L.marker([lat, lng], {
            icon: communityIcon

        }).addTo(map);
        marker.on('click', function () {
            console.log('Marker clicked ', id);
            scrollToBooth(id);
        });
    }
    if (category == 1) {
        marker = L.marker([lat, lng], {
            icon: foodIcon
        }).addTo(map);
        marker.on('click', function () {
            console.log('Marker clicked ', id);
            scrollToBooth(id);
        });
    }
    if (category == 2) {
        marker = L.marker([lat, lng], {
            icon: activitiesIcon
        }).addTo(map);
        marker.on('click', function () {
            console.log('Marker clicked ', id);
            scrollToBooth(id);
        });
    }
    marker.bindPopup(popupText);
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

    if (!communityVisible && !foodVisible && !activitiesVisible) {
        refreshBoothMaps(-1);
    }
    else if (communityVisible && !foodVisible && !activitiesVisible) {
        refreshBoothMaps(0);
    }
    else if (!communityVisible && foodVisible && !activitiesVisible) {
        refreshBoothMaps(1);
    }
    else if (!communityVisible && !foodVisible && activitiesVisible) {
        refreshBoothMaps(2);
    }
    else if (communityVisible && foodVisible && !activitiesVisible) {
        refreshBoothMaps(0);
        refreshBoothMaps(1, false);
    }
    else if (!communityVisible && foodVisible && activitiesVisible) {
        refreshBoothMaps(1);
        refreshBoothMaps(2, false);
    }
    else if (communityVisible && !foodVisible && activitiesVisible) {
        refreshBoothMaps(0);
        refreshBoothMaps(2, false);
    }
    else if (communityVisible && foodVisible && activitiesVisible) {
        refreshBoothMaps(-1);
    }
}

function findOnMap(lat, long) {
    console.log("Refreshing booth maps for location:", lat, long);
    document.getElementsByClassName("map")[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
    map.setView([lat, long], 21);
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

// Fill booths

function scrollToBooth(id) {
    const boothElement = document.getElementById(`booth-details-${id}`);
    // Collapse all collapsible booth details
    document.querySelectorAll('.collapse').forEach(el => {
        el.classList.remove('show');
    });
    if (boothElement) {
        // Expand the booth details if collapsed
        if (!boothElement.classList.contains('show')) {
            updateBoothDetails(id);
            boothElement.classList.add('show');
        }
        document.getElementById(`booth-details-${id}`).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function updateBoothDetails(boothId) {
    console.log("Updating booth id: ", boothId);
    fetch(`/api/booths/get/?id=${boothId}`)
        .then(response => response.json())
        .then(booth => {
            console.log("Booth data:", booth);
            const detailsDiv = document.getElementById(`booth-details-${boothId}`);
            detailsDiv.innerHTML = `
                <div class="row">
                    <div class="col">
                        <img src="${booth[0].boothImage}" alt="Booth Image" style="width: 100%; height: auto;">
                    </div>
                    <div class="col">
                        <p><b>Description:</b> ${booth[0].description}</p>
                        <p><b>Category:</b> ${booth[0].boothCategory == 0 ? 'Community' : booth[0].boothCategory == 1 ? 'Food' : 'Activities'}</p>
                        <button id="button${booth[0].id}" class="findOnMap btn btn-primary">Find on Map</button>
                    </div>
                </div>
            `;
            document.getElementById(`button${booth[0].id}`).addEventListener('click', () => {
                activitiesVisible = false;
                communityVisible = false;
                foodVisible = false;
                updateMap();
                findOnMap(booth[0].location[0].x, booth[0].location[0].y);
            });
        });
}

let boothData;
fetch('/api/booths/all')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        boothData = data
        // Add all booths to the map initially
        refreshBoothMaps(-1);
        // Populate booth list
        for (const booth of boothData) {
            const activitiesList = document.getElementById("activities-info");
            const foodList = document.getElementById("food-info");
            const communityList = document.getElementById("community-info");
            const boothItem = document.createElement("li");
            const moreButton = document.createElement("button");
            moreButton.type = "button";
            moreButton.classList.add("btn", "btn-link", "p-0");
            moreButton.style.float = "none";
            moreButton.setAttribute('data-toggle', 'collapse');
            moreButton.setAttribute('data-target', `#booth-details-${booth.id}`);
            moreButton.addEventListener('click', () => updateBoothDetails(booth.id));
            moreButton.innerText = " More";
            boothItem.classList.add("list-group-item", "d-flex", "align-items-center", "justify-content-between");
            const nameSpan = document.createElement("span");
            nameSpan.textContent = booth.name;

            boothItem.style.listStyleType = "none";
            boothItem.appendChild(nameSpan);
            boothItem.appendChild(moreButton);
            if (booth.boothCategory == 0) {
                communityList.appendChild(boothItem);
            }
            if (booth.boothCategory == 1) {
                foodList.appendChild(boothItem);
            }
            if (booth.boothCategory == 2) {
                activitiesList.appendChild(boothItem);
            }

            // Make collapsible details
            const detailsDiv = document.createElement("div");
            detailsDiv.classList.add("collapse", "card");
            detailsDiv.id = `booth-details-${booth.id}`;
            if (booth.boothCategory == 0) {
                communityList.appendChild(detailsDiv);
            }
            if (booth.boothCategory == 1) {
                foodList.appendChild(detailsDiv);
            }
            if (booth.boothCategory == 2) {
                activitiesList.appendChild(detailsDiv);
            }
        }
    });

function refreshBoothMaps(category, removeMarkers = true) {
    if (removeMarkers) {
        removeAllMarkers();
    }
    for (const booth of boothData) {
        if (category == -1 || booth.boothCategory == category) {
            console.log("Adding booth:", booth);
            addMarker(booth.location[0].x, booth.location[0].y, booth.boothCategory, `${booth.name}`, booth.id);
        }
    }
}

