const map = L.map('map').setView([35.1796, 129.0756], 11);

let geojson;
let colorOn = false;

const nameToId = {
  "사상구": "sasanggu",
  "사하구": "sahagu",
  "남구": "namgu",
  "해운대구": "haeundaegu",
  "동래구": "dongnaegu",
  "연제구": "yeonjegu",
  "수영구": "suyeonggu",
  "금정구": "geumjeonggu",
  "북구": "bukgu",
  "기장군": "gijanggun",
  "부산진구": "busanjingu",
  "동구": "donggu",
  "서구": "seogu",
  "중구": "junggu",
  "영도구": "yeongdogu",
  "강서구": "gangseogu"
};

const districtColors = {
  sasanggu: "#FF6464",
  sahagu: "#FFC864", 
  namgu: "#FFFF64",
  haeundaegu: "#96C864",
  dongnaegu: "#FFC864",
  yeonjegu: "#FFC864",
  suyeonggu: "#009664",
  geumjeonggu: "#96C864",
  bukgu: "#FFC864",
  gijanggun: "#009664",
  busanjingu: "#FFFF64",
  donggu: "#96C864",
  seogu: "#FFFF64",
  junggu: "#009664",
  yeongdogu: "#96C864",
  gangseogu: "#96C864",
};

const defaultStyle = {
  color: "#000",
  weight: 1,
  fillColor: "#FFFFFF",
  fillOpacity: 1.0
};

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
      fillColor: '#bbf0ffff',
      fillOpacity: 0.5,
      interactive: false
    }).addTo(map);
  });

const colorStyle = (feature) => {
  const name = feature.properties.SIGUNGU_NM;
  const id = nameToId[name];
  const color = districtColors[id] || "#CCCCCC";
  return {
    color: "#000",
    weight: 1,
    fillColor: color,
    fillOpacity: 0.8
  };
};

fetch('data/busan_dong.geojson')
  .then(res => res.json())
  .then(dongJSON => {
    geojson = L.geoJSON(dongJSON, {
      style: defaultStyle,
      onEachFeature: (f, layer) => {
        // 마우스 오버 효과
        layer.on({
          mouseover: (e) => {
            e.target.setStyle({
              weight: 3,
              color: "#666",
              fillOpacity: 0.75
            });
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
              e.target.bringToFront();
            }
          },
          mouseout: (e) => {
            geojson.resetStyle(e.target);
          }
        });

        // 라벨
        if (f.properties.label_lat && f.properties.label_lng) {
          L.marker([f.properties.label_lat, f.properties.label_lng], { opacity: 0 })
            .addTo(map)
            .bindTooltip(f.properties.SIGUNGU_NM, {
              permanent: true,
              direction: "center",
              className: "dong-label",
              offset: L.point(-10, 30)
            });
        }
      }
    }).addTo(map);
  });

function toggleAllColors() {
  colorOn = !colorOn;
  geojson.setStyle(colorOn ? colorStyle : defaultStyle);
}

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