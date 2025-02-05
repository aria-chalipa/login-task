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

neshanMap.on('click', function(e) {
    console.log(e.lngLat);
    const marker = new nmp_mapboxgl.Marker({
        color: 'blue',
        draggable: true,
        anchor: 'bottom'
    }).setLngLat([e.lngLat.lng , e.lngLat.lat]).addTo(neshanMap);
});



function logout() {
    localStorage.removeItem('userData');
    window.location.href = '../index.html';
}
