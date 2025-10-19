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
            document.cookie = '';
        }
    });
}

// Function to set fields after successful login
async function setFields(apiKey) {
    document.getElementById('adminKeyInputGroup').style.display = 'none';

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
}