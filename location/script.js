const neshanMap = new nmp_mapboxgl.Map({
    mapType: nmp_mapboxgl.Map.mapTypes.neshanVector,
    container: "map",
    zoom: 13,
    pitch: 0,
    center: [51.388973, 35.689197],
    minZoom: 2,
    maxZoom: 21,
    interactive: true,
    trackResize: true,
    mapKey: "web.e2aae8fdf7f84f3996923c1dbf55c5de", 
    poi: false,
    bearing: 10,
    traffic: false,
    mapTypeControllerOptions: {
        show: true,
        position: 'bottom-left'
    }
});

neshanMap.addControl(new nmp_mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
 
}));


let currentMarker;

neshanMap.on('click', function(e) {
    
    
    
    if (currentMarker) {
        currentMarker.remove();
    }
    currentMarker = new nmp_mapboxgl.Marker({
        color: 'blue',
        draggable: true,
        anchor: 'bottom'
    }).setLngLat([e.lngLat.lng , e.lngLat.lat]).addTo(neshanMap);

    
});

// map end

document.querySelector('.logout-button').addEventListener('click', function() {
    const lngLat = currentMarker.getLngLat();
    localStorage.setItem('lngLat', JSON.stringify(lngLat));
    window.location.href = '../loading/index.html';
});
