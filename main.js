const map = L.map('map').setView([35.1796, 129.0756], 11);

map.createPane('markerPane');
map.getPane('markerPane').style.zIndex = 650;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

fetch('data/busan_boundary.geojson')
  .then(res => res.json())
  .then(boundaryJSON => {
    const boundaryCoords = boundaryJSON.features[0].geometry.coordinates;
    const world = [[[ -90,-180 ],[ -90,180 ],[ 90,180 ],[ 90,-180 ]]];
    L.polygon([ ...world, ...boundaryCoords ], {
      stroke: false,
      fillColor: '#ffffff',
      fillOpacity: 0.85,
      interactive: false
    }).addTo(map);
  });

fetch('data/busan_dong.geojson')
  .then(res => res.json())
  .then(dongJSON => {
    L.geoJSON(dongJSON, {
      style: () => ({
        color: '#000',
        weight: 1,
        fillColor: '#AEDFF7',
        fillOpacity: 0.6
      }),
      onEachFeature: (f, layer) => {
        layer.on('mouseover', () => layer.setStyle({ fillColor: '#FFA500' }));
        layer.on('mouseout', () => layer.setStyle({ fillColor: '#AEDFF7' }));

        // 마커형 라벨 따로 생성
        if (f.properties.label_lat && f.properties.label_lng) {
          L.marker([f.properties.label_lat, f.properties.label_lng], { opacity: 0 })
        .addTo(map)
        .bindTooltip(f.properties.SIGUNGU_NM, {
          permanent: true,
          direction: 'center',
          className: 'dong-label',
          offset: L.point(-10, 30)  // 왼쪽 아래로 약간 이동
        });
        }
      }
    }).addTo(map);
  });

let sinkholeMarkers = [];
let markersVisible  = false;
let sinkholeData    = [];

function toggleMarkers () {
  if (!markersVisible) {
    const load = sinkholeData.length
      ? Promise.resolve(sinkholeData)
      : fetch('data/sinkholes.json').then(r => r.json()).then(d => (sinkholeData = d));

    load.then(data => {
      data.forEach(p => {
        const m = L.circleMarker([p.lat, p.lng], {
          pane: 'markerPane',
          radius: 5,
          color: '#ff0000',
          fillColor: '#ff6666',
          fillOpacity: 0.9
        })
          .addTo(map)
          .bindPopup(
            `<div style="font-size:14px;">
               <strong>${p.name}</strong><br>
               날짜: ${p.date}<br>
               크기: ${p.size}<br>
               깊이: ${p.depth}
             </div>`
          );
        sinkholeMarkers.push(m);
      });
      markersVisible = true;
    });
  } else {
    sinkholeMarkers.forEach(m => map.removeLayer(m));
    sinkholeMarkers = [];
    markersVisible  = false;
  }
}
