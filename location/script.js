// Initialize the map with a default location
var map = L.map('map').setView([51.505, -0.09], 13);  // Default to London

// Add a tile layer to the map (using OpenStreetMap tiles)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Geolocation options for better accuracy
const options = {
    enableHighAccuracy: true,
    timeout: 10000,  // Increased timeout to 10 seconds
    maximumAge: 0
};

// Function to show continue button
function showContinueButton() {
    const buttonContainer = document.createElement('div');
    buttonContainer.style.position = 'fixed';
    buttonContainer.style.bottom = '20px';
    buttonContainer.style.left = '50%';
    buttonContainer.style.transform = 'translateX(-50%)';
    buttonContainer.style.zIndex = '1000';

    const continueButton = document.createElement('button');
   
    continueButton.style.padding = '10px 20px';
    continueButton.style.fontSize = '16px';
    continueButton.style.cursor = 'pointer';
    continueButton.style.backgroundColor = '#4CAF50';
    continueButton.style.color = 'white';
    continueButton.style.border = 'none';
    continueButton.style.borderRadius = '5px';

    const a = document.createElement('a')
    a.style.color='white'
    a.textContent = 'Continue to Next Page';
    a.style.textDecoration = 'none'
    a.href = '../loading/index.html'



    continueButton.appendChild(a)
    buttonContainer.appendChild(continueButton);
    document.body.appendChild(buttonContainer);
}

// Function to set view to user's location
function setViewToUserLocation() {
    if ("geolocation" in navigator) {
        // Show loading indicator or message
        console.log('Requesting location...');
        alert('Please allow location access when prompted');
        
        navigator.geolocation.getCurrentPosition(
            // Success callback
            function(position) {
                console.log('Location received:', position);
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
                // Save location to localStorage
                const locationData = {
                    latitude: latitude,
                    longitude: longitude,
                    accuracy: position.coords.accuracy,
                    timestamp: new Date().toISOString()
                };
                localStorage.setItem('userLocation', JSON.stringify(locationData));
                console.log('Location saved to localStorage:', locationData);
                
                // Clear existing markers
                map.eachLayer((layer) => {
                    if (layer instanceof L.Marker) {
                        map.removeLayer(layer);
                    }
                });
                
                // Add accuracy circle
                const accuracy = position.coords.accuracy;
                L.circle([latitude, longitude], {
                    radius: accuracy,
                    color: 'blue',
                    fillColor: '#3388ff',
                    fillOpacity: 0.1
                }).addTo(map);
                
                // Add marker and fly to location
                var marker = L.marker([latitude, longitude]).addTo(map)
                    .bindPopup('You are here! (Accuracy: ' + Math.round(accuracy) + ' meters)')
                    .openPopup();
                
                map.flyTo([latitude, longitude], 16, {
                    animate: true,
                    duration: 1.5
                });
                
                console.log('Map updated to:', latitude, longitude);

                // Show the continue button after successfully getting location
                showContinueButton();
            },
            // Error callback
            function(error) {
                console.error('Error getting location:', error.code, error.message);
                alert('Error getting location. Please check your browser settings and try again.');
                
                let errorMessage = 'Error getting location - ';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage += 'Please enable location services in your browser settings';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage += 'Location information unavailable';
                        break;
                    case error.TIMEOUT:
                        errorMessage += 'Request timed out - please try again';
                        break;
                    default:
                        errorMessage += 'Unknown error occurred';
                }
                
                // Save error to localStorage
                localStorage.setItem('locationError', JSON.stringify({
                    error: errorMessage,
                    timestamp: new Date().toISOString()
                }));
                
                var marker = L.marker([51.505, -0.09]).addTo(map)
                    .bindPopup(errorMessage)
                    .openPopup();
            },
            options
        );
    } else {
        alert('Geolocation is not supported by this browser');
        console.log('Geolocation is not supported by this browser');
        var marker = L.marker([51.505, -0.09]).addTo(map)
            .bindPopup('Default location (geolocation not supported)')
            .openPopup();
    }
}

// Add a timestamp check when loading saved location
const savedLocation = localStorage.getItem('userLocation');
if (savedLocation) {
    const location = JSON.parse(savedLocation);
    const savedTime = new Date(location.timestamp);
    const now = new Date();
    const hoursSinceUpdate = (now - savedTime) / (1000 * 60 * 60);
    
    // Only use saved location if it's less than 24 hours old
    if (hoursSinceUpdate < 24) {
        console.log('Found recent saved location:', location);
        map.setView([location.latitude, location.longitude], 16);
        L.marker([location.latitude, location.longitude]).addTo(map)
            .bindPopup('Last known location (updated ' + Math.round(hoursSinceUpdate) + ' hours ago)')
            .openPopup();
        showContinueButton(); // Show button if we have a recent saved location
    } else {
        console.log('Saved location is too old, requesting new location');
        setViewToUserLocation();
    }
} else {
    setViewToUserLocation();
}

// Add a button to recenter the map to user's location
document.getElementById('locateMe')?.addEventListener('click', setViewToUserLocation);
