// Hide all inputs before login
document.querySelectorAll('.volunteerInputs').forEach(elem => elem.style.display = 'none');

// On click of login button, validate API key, set cookie, and run setFields()
document.getElementById('loginBtn').addEventListener('click', function() {
    let apiKey = document.getElementById('adminKey').value;

    fetch('/api/admin/getTokenData', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        },
        
    }).then(response => {
        if (response.ok) {
            const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
            document.cookie = `adminApiKey=${encodeURIComponent(apiKey)}; expires=${expires}; path=/; SameSite=Strict; Secure`;
            document.getElementById('adminKey').classList.remove('is-invalid');
            document.getElementById('adminKey').classList.add('is-valid');
            setFields(apiKey);
        } else {
            document.getElementById('adminKey').classList.remove('is-valid');
            document.getElementById('adminKey').classList.add('is-invalid');
        }
    });
});

// On click of logout button, clear cookie and reload page
document.getElementById('logoutBtn').addEventListener('click', function() {
    // Remove all cookies for current domain/path
    document.cookie.split(';').forEach(cookie => {
        const name = cookie.split('=')[0].trim();
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Strict; Secure';
    });
    location.reload();
})

// On page load, check for existing cookie and run setFields() if valid
if (document.cookie.split('; ').find(row => row.startsWith('adminApiKey='))) {
    let apiKey = decodeURIComponent(document.cookie.split('; ').find(row => row.startsWith('adminApiKey=')).split('=')[1]);
    fetch('/api/admin/getTokenData', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        },
        
    }).then(response => {
        if (response.ok) {
            const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
            document.cookie = `adminApiKey=${encodeURIComponent(apiKey)}; expires=${expires}; path=/; SameSite=Strict; Secure`;
            setFields(apiKey);
        } else {
            // Remove all cookies for current domain/path
            document.cookie.split(';').forEach(cookie => {
                const name = cookie.split('=')[0].trim();
                document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Strict; Secure';
            });
        }
    });
}

// Function to set fields after successful login
async function setFields(apiKey) {
    document.getElementById('adminKeyInputGroup').style.display = 'none';
    document.querySelectorAll('.volunteerInputs').forEach(elem => elem.style.display = 'block');

    fetch('/api/admin/getTokenData', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        },
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => {
        console.log(data)
        const name = data.name;
        const isAdmin = data.isAdmin;
        const isHost = data.isHost;

        setLoginInfo(name, isAdmin, isHost);
    });

    function setLoginInfo(name, isAdmin, isHost) {
        // Sets name and role fields
        document.getElementById('nameDisplay').innerHTML = name;
        if (isHost) {
            document.getElementById('roleDisplay').innerHTML = 'Host';
        }
        else if (isAdmin) {
            document.getElementById('roleDisplay').innerHTML = 'Admin';
        }
        else if (!isAdmin && !isHost) {
            document.getElementById('roleDisplay').innerHTML = 'Volunteer';
        }
    }

    // On click of Get All Booths button, fetch and display booth list
    document.getElementById('getBoothsBtn').addEventListener('click', getBoothList);
    function getBoothList() {
        fetch('/api/booths/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(data => {
            console.log(data);
            const boothList = document.getElementById('boothList');
            boothList.innerHTML = '';
            data.forEach(booth => {
                // Booth List Item
                const li = document.createElement('li');
                li.className = 'list-group-item';
                // Booth Name
                const nameSpan = document.createElement('span');
                nameSpan.innerText = booth.name;
                // Booth ID
                const IDSpan = document.createElement('span');
                IDSpan.className = 'text-muted float-end';
                IDSpan.innerText = `${booth.id}`;
                // Booth Type
                const typeSpan = document.createElement('span');
                const hexMap = {
                    0: '#55452c', // Community
                    1: '#2e0404', // Food
                    2: '#1e3a98', // Activity
                    3: '#ffc107'  // Popup
                };
                const hex = hexMap[booth.boothCategory];
                typeSpan.className = 'badge badge-pill me-2';
                typeSpan.style.backgroundColor = hex;
                typeSpan.style.color = '#ffffff';
                let boothType = '';
                if (booth.boothCategory == 0) {
                    boothType = 'Community';
                }
                else if (booth.boothCategory == 1) {
                    boothType = 'Food';
                }
                else if (booth.boothCategory == 2) {
                    boothType = 'Activity';
                }
                else if (booth.boothCategory == 3) {
                    boothType = 'Popup';
                }
                else {
                    boothType = 'Uncategorized';
                }
                typeSpan.innerText = boothType;
                // If an indicator is needed for editing this booth
                console.log((booth.location[0].x + " " + booth.location[0].y))
                let needsLocationSpan = document.createElement('span');
                if (booth.location[0].x === 0 && booth.location[0].y === 0) {
                    needsLocationSpan.className = 'badge badge-danger me-2';
                    needsLocationSpan.innerHTML = 'NEEDS LOCATION';
                }
                // Delete Button
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'btn btn-sm btn-danger float-right';
                deleteBtn.addEventListener('click', function() {
                    console.log('Deleting booth ID:', booth.id);
                    fetch('/api/booths/deleteBooth?id=' + booth.id, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + apiKey
                        },
                    }).then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                    }).then(data => {
                        console.log(data);
                        getBoothList();
                    });
                });
                deleteBtn.innerText = 'Delete';

                // Appending
                li.appendChild(IDSpan);
                li.appendChild(nameSpan);
                li.appendChild(typeSpan);
                li.appendChild(needsLocationSpan);
                li.appendChild(deleteBtn);
                boothList.appendChild(li);
            });
        });
    }

    // Fetch and fill map for booth location selection
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

    // When the Add Booth Location & Image tab is opened, refresh map display
    document.getElementById('addBoothPhysical').addEventListener('click', function() {
        setTimeout(function() {
            console.log('Refreshing map display');
            map.invalidateSize();
            // Remove any existing markers from the map
            map.eachLayer(function(layer) {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });

            // Adds a draggable marker for location selection
            const draggableMarker = L.marker([34.22325, -118.24331], {
                draggable: true,
                autoPan: true
            }).addTo(map);

            // Place down booth icons on the map
            fetch('/api/booths/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(data => {
                data.forEach(booth => {
                    console.log(booth)
                    booth.location[0].x = parseFloat(booth.location[0].x);
                    booth.location[0].y = parseFloat(booth.location[0].y);
                    if (booth.location[0].x !== 0 && booth.location[0].y !== 0) {
                        console.log(booth.location[0].x + ", " + booth.location[0].y);

                        const markerHtmlStyles = `
                            background-color: #ff0000;
                            width: 1rem;
                            height: 1rem;
                            border-radius: 100%;
                            display: block;
                            left: -0.5rem;
                            top: -0.5rem;
                            position: relative;
                        `;

                        const icon = L.divIcon({
                            className: "boothMarker",
                            iconAnchor: [0, 0],
                            labelAnchor: [0, 0],
                            popupAnchor: [0, -36],
                            html: `<span style="${markerHtmlStyles}" />`
                        });

                        L.marker([booth.location[0].x, booth.location[0].y], {
                            title: booth.name,
                            icon: icon
                        }).addTo(map);
                    }
                });
            });

            // When the marker is dragged
            draggableMarker.on('dragend', function(e) {
                const { lat, lng } = e.target.getLatLng();
                console.log('Marker dragged to:', lat, lng);
                document.getElementById('addBoothCoordinatesX').value = lat;
                document.getElementById('addBoothCoordinatesY').value = lng;
            });
        }, 50);
    });

    // Reset add booth form
    function clearAddBoothForm() {
        fetch('/api/booths/nextBoothID', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(data => {
            console.log(data);
            document.getElementById('addBoothID').value = data.nextBoothID;
        });
        document.getElementById('addBoothName').value = '';
        document.getElementById('addBoothDescription').value = '';
        document.getElementById('addBoothCategory').value = '0';
    }
    clearAddBoothForm(); // Run it once on load

    // On submit of Add Booth form, send data to backend
    document.getElementById('addBoothSubmitBtn').addEventListener('click', function() {
        let boothData = {
            id: parseInt(document.getElementById('addBoothID').value),
            name: document.getElementById('addBoothName').value,
            description: document.getElementById('addBoothDescription').value,
            createdBy: "Engineering Expo Admin Panel",
            boothCategory: parseInt(document.getElementById('addBoothCategory').value),
        };
        fetch('/api/booths/createBooth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            },
            body: JSON.stringify(boothData)
        }).then(response => {
            clearAddBoothForm();
            getBoothList();
        })
    });

    function clearEditBoothForm() {
        document.getElementById('editBoothID').value = '';
        document.getElementById('editBoothName').innerText = '';
        document.getElementById('addBoothCoordinatesX').value = '';
        document.getElementById('addBoothCoordinatesY').value = '';
        document.getElementById('editBoothImageUpload').value = '';
        document.getElementById('editBoothImageUploadLabel').innerText = 'Upload Image';
    }

    // On input of a booth ID in edit booth, fetch and fill data
    document.getElementById('editBoothID').addEventListener('input', function() {
        let boothID = parseInt(document.getElementById('editBoothID').value);
        if (boothID){
            fetch(`/api/booths/get?id=${boothID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(data => {
                if (data.length > 0) {
                    editBoothName.innerText = `Editing Booth: ${data[0].name}`;
                }
                else {
                    editBoothName.innerText = `No booth found with ID ${boothID}`;
                }
            });
        }
        else {
            editBoothName.innerText = '';
        }
    });

    // On change of image upload, update label to show file name
    document.getElementById('editBoothImageUpload').addEventListener('change', function() {
        const fileName = this.files[0] ? this.files[0].name : 'Upload Image';
        document.getElementById('editBoothImageUploadLabel').innerText = fileName;
    });

    // On submit of Edit Booth form, send updated data to backend
    document.getElementById('editBoothSubmitBtn').addEventListener('click', function() {
        let boothID = parseInt(document.getElementById('editBoothID').value);
        let lat = parseFloat(document.getElementById('addBoothCoordinatesX').value);
        let lng = parseFloat(document.getElementById('addBoothCoordinatesY').value);
        let imageFile = document.getElementById('editBoothImageUpload').files[0];

        fetch(`/api/booths/get?id=${boothID}`, { // First get the existing booth data
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(data => {
            currentJson = data[0];
            currentJson.location[0].x = lat;
            currentJson.location[0].y = lng;

            fetch('/api/booths/updateBooth?id=' + boothID, { // Then send updated data to backend (Without image)
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apiKey
                },
                body: JSON.stringify(currentJson)
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then((data) => {
                console.log(data);
                console.log(boothID, imageFile);

                const form = new FormData();
                // Append image file to form data
                form.append('file', imageFile, imageFile.name);
                // Append booth ID to form data
                form.append('boothID', String(boothID));

                fetch('/api/booths/uploadBoothImage', { // Finally, upload the image if provided
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + apiKey,
                        'accept': 'application/json',
                    },
                    body: form
                }).then(response => {
                    if (response.ok) {
                        clearEditBoothForm();
                        getBoothList();
                    }
                });
            });
        });
    });

    // Admin Token Creation
    document.getElementById('addAdminBtn').addEventListener('click', function() {
        let role = document.getElementById('adminCreateRole').value;
        console.log(role);
        let admin = false;
        let host = false;
        if (role == 0) {
            admin = false;
            host = false;
        }
        else if (role == 1) {
            admin = true;
            host = false;
        }
        else if (role == 2) {
            admin = true;
            host = true;
        }

        fetch(`/api/admin/createToken?isAdmin=${admin}&isHost=${host}&assignedTo=${encodeURIComponent(document.getElementById('adminCreateName').value)}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
            },
        }).then(response => {
            if (response.ok) {
            return response.json();
            }
        }).then(data => {
            console.log(data);
            document.getElementById('adminCreateName').value = '';
            document.getElementById('adminTokenOutput').innerText = data.tokenData.token;
            document.getElementById('adminTokenNameOutput').innerHTML = data.tokenData.assignedTo;
        });
    });
}