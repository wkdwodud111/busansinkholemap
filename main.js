document.getElementById("gu-image-box").style.display = "none";

const guImageMap = {
  "사상구": ["images/사상구1.png", "images/사상구2.png"],
  "사하구": ["images/사하구1.png", "images/사하구2.png"],
  "남구": ["images/남구1.png", "images/남구2.png"],
  "해운대구": ["images/해운대구1.png", "images/해운대구2.png"],
  "동래구": ["images/동래구1.png"],
  "연제구": ["images/연제구1.png", "images/연제구2.png"],
  "수영구": ["images/수영구1.png", "images/수영구2.png"],
  "금정구": ["images/금정구1.png"],
  "북구": ["images/북구1.png", "images/북구2.png"],
  "기장군": ["images/기장군1.png", "images/기장군2.png"],
  "부산진구": ["images/부산진구1.png"],
  "서구": ["images/서구1.png"],
  "강서구": ["images/강서구1.png", "images/강서구2.png"],
  "중구": ["images/중구1.png", "images/중구2.png"],
  "영도구": ["images/영도구1.png"]
};

// =================== 각 구별 인포박스 정의 ===================

// 사상구 인포 ------------------------------------------------------------------
const infoSasanggu = [
  document.getElementById("info-sasanggu1"),
  document.getElementById("info-sasanggu2"),
  document.getElementById("info-sasanggu3"),
  document.getElementById("info-sasanggu4")
];

// 사하구 인포------------------------------------------------------------------
const infoSahagu = [
  document.getElementById("info-sahagu1"),
  document.getElementById("info-sahagu2"),
  document.getElementById("info-sahagu3"),
  document.getElementById("info-sahagu4"),
];

// 남구 인포------------------------------------------------------------------
const infoNamgu = [
  document.getElementById("info-namgu1"),
  document.getElementById("info-namgu2"),
  document.getElementById("info-namgu3"),
  document.getElementById("info-namgu4"),
];

// 해운대구 인포------------------------------------------------------------------
const infoHaeundaegu = [
  document.getElementById("info-haeundaegu1"),
  document.getElementById("info-haeundaegu2"),
  document.getElementById("info-haeundaegu3"),
  document.getElementById("info-haeundaegu4"),
];

// 동래구 인포------------------------------------------------------------------
const infoDongnaegu = [
  document.getElementById("info-dongnaegu1"),
  document.getElementById("info-dongnaegu2"),
  document.getElementById("info-dongnaegu3"),
  document.getElementById("info-dongnaegu4"),
];

// 연제구 인포------------------------------------------------------------------
const infoYeonjegu = [
  document.getElementById("info-yeonjegu1"),
  document.getElementById("info-yeonjegu2"),
  document.getElementById("info-yeonjegu3"),
  document.getElementById("info-yeonjegu4"),
];

// 수영구 인포------------------------------------------------------------------
const infoSuyeonggu = [
  document.getElementById("info-suyeonggu1"),
  document.getElementById("info-suyeonggu2"),
  document.getElementById("info-suyeonggu3"),
  document.getElementById("info-suyeonggu4"),
];

// 금정구 인포------------------------------------------------------------------
const infoGeumjeonggu = [
  document.getElementById("info-geumjeonggu1"),
  document.getElementById("info-geumjeonggu2"),
  document.getElementById("info-geumjeonggu3"),
  document.getElementById("info-geumjeonggu4"),
];

// 북구 인포------------------------------------------------------------------
const infoBukgu = [
  document.getElementById("info-bukgu1"),
  document.getElementById("info-bukgu2"),
  document.getElementById("info-bukgu3"),
  document.getElementById("info-bukgu4"),
];

// 기장군 인포------------------------------------------------------------------
const infoGijanggun = [
  document.getElementById("info-gijanggun1"),
  document.getElementById("info-gijanggun2"),
  document.getElementById("info-gijanggun3"),
  document.getElementById("info-gijanggun4"),
];

// 부산진구 인포------------------------------------------------------------------
const infoBusanjingu = [
  document.getElementById("info-busanjingu1"),
  document.getElementById("info-busanjingu2"),
  document.getElementById("info-busanjingu3"),
  document.getElementById("info-busanjingu4"),
];

// 동구 인포------------------------------------------------------------------
const infoDonggu = [
  document.getElementById("info-donggu1"),
  document.getElementById("info-donggu2"),
  document.getElementById("info-donggu3"),
  document.getElementById("info-donggu4"),
];

// 서구 인포------------------------------------------------------------------
const infoSeogu = [
  document.getElementById("info-seogu1"),
  document.getElementById("info-seogu2"),
  document.getElementById("info-seogu3"),
  document.getElementById("info-seogu4"),
];

// 중구 인포------------------------------------------------------------------
const infoJunggu = [
  document.getElementById("info-junggu1"),
  document.getElementById("info-junggu2"),
  document.getElementById("info-junggu3"),
  document.getElementById("info-junggu4"),
];

// 강서구 인포------------------------------------------------------------------
const infoGangseogu = [
  document.getElementById("info-gangseogu1"),
  document.getElementById("info-gangseogu2"),
  document.getElementById("info-gangseogu3"),
  document.getElementById("info-gangseogu4"),
];

// 영도구 인포------------------------------------------------------------------
const infoYeongdogu = [
  document.getElementById("info-yeongdogu1"),
  document.getElementById("info-yeongdogu2"),
  document.getElementById("info-yeongdogu3"),
  document.getElementById("info-yeongdogu4"),
];

// =================== 지도 및 GeoJSON 처리 ===================

const map = L.map('map', {
  zoomControl: false
}).setView([35.1796, 129.0756], 11);

L.control.zoom({
  position: 'bottomleft'
}).addTo(map);

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
  busanjingu: "#FFC864",
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

function toggleAllColors() {
  colorOn = !colorOn;
  geojson.setStyle(colorOn ? colorStyle : defaultStyle);
}

map.createPane("customPopupPane");
map.getPane("customPopupPane").style.zIndex = 850;

map.createPane("markerPane");
map.getPane("markerPane").style.zIndex = 800;

map.createPane("subwayPane");
map.getPane("subwayPane").style.zIndex = 700;

map.createPane("dongPane");
map.getPane("dongPane").style.zIndex = 600;

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
    fillOpacity: 0.75
  };
};

// =================== 인포박스 표시 및 라벨 ===================

function hideAllInfoBoxes() {
  document.querySelectorAll(".info-box").forEach(box => (box.style.display = "none"));
}

fetch('data/busan_dong.geojson')
  .then(res => res.json())
  .then(dongJSON => {
    geojson = L.geoJSON(dongJSON, {
      pane: "dongPane",
      style: defaultStyle,
      onEachFeature: (f, layer) => {
        const name = f.properties.SIGUNGU_NM;

layer.on({
  mouseover: (e) => {
    e.target.setStyle({
      weight: 3,
      color: "#666",
      fillOpacity: 0.75
    });

    hideAllInfoBoxes();

    if (name === "사상구") {
      infoSasanggu.forEach(box => box.style.display = "block");
      e.target.setStyle({
        fillColor: '#FF6464',
        fillOpacity: 0.75
      });
    }
    else if (name === "사하구") {
      infoSahagu.forEach(box => box.style.display = "block");
      e.target.setStyle({
        fillColor: '#FFC864',
        fillOpacity: 0.75
      });
    }
    else if (name === "남구") {
      infoNamgu.forEach(box => box.style.display = "block");
      e.target.setStyle({
        fillColor: '#FFFF64',
        fillOpacity: 0.75
      });
    }
    else if (name === "해운대구") {
      infoHaeundaegu.forEach(box => box.style.display = "block");
      e.target.setStyle({
        fillColor: '#96C864',
        fillOpacity: 0.75
      });
    }
    else if (name === "동래구") {
      infoDongnaegu.forEach(box => box.style.display = "block");
      e.target.setStyle({
        fillColor: '#FFC864',
        fillOpacity: 0.75
      });
    }
    else if (name === "연제구") {
      infoYeonjegu.forEach(box => box.style.display = "block");
      e.target.setStyle({
        fillColor: '#FFC864',
        fillOpacity: 0.75
      });
    }
    else if (name === "수영구") {
      infoSuyeonggu.forEach(box => box.style.display = "block");
      e.target.setStyle({
        fillColor: '#009664',
        fillOpacity: 0.75
      });
    }
    else if (name === "금정구") {
      infoGeumjeonggu.forEach(box => box.style.display = "block");
      e.target.setStyle({
        fillColor: '#96C864',
        fillOpacity: 0.75
      });
    }
    else if (name === "북구") {
      infoBukgu.forEach(box => box.style.display = "block");
      e.target.setStyle({
        fillColor: '#FFC864',
        fillOpacity: 0.75
      });
    }
    else if (name === "기장군") {
      infoGijanggun.forEach(box => box.style.display = "block");
      e.target.setStyle({
        fillColor: '#009664',
        fillOpacity: 0.75
      });
    }
    else if (name === "부산진구") {
      infoBusanjingu.forEach(box => box.style.display = "block");
      e.target.setStyle({
        fillColor: '#FFC864',
        fillOpacity: 0.75
      });
    }
    else if (name === "동구") {
      infoDonggu.forEach(box => box.style.display = "block");
      e.target.setStyle({
        fillColor: '#96C864',
        fillOpacity: 0.75
      });
    }
    else if (name === "서구") {
      infoSeogu.forEach(box => box.style.display = "block");
      e.target.setStyle({
        fillColor: '#FFFF64',
        fillOpacity: 0.75
      });
    }
    else if (name === "중구") {
      infoJunggu.forEach(box => box.style.display = "block");
      e.target.setStyle({
        fillColor: '#009664',
        fillOpacity: 0.75
      });
    }
    else if (name === "강서구") {
      infoGangseogu.forEach(box => box.style.display = "block");
      e.target.setStyle({
        fillColor: '#96C864',
        fillOpacity: 0.75
      });
    }
    else if (name === "영도구") {
      infoYeongdogu.forEach(box => box.style.display = "block");
      e.target.setStyle({
        fillColor: '#96C864',
        fillOpacity: 0.75
      });
    }
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      //e.target.bringToFront();
    }
  },

  mouseout: (e) => {
    if (!colorOn) {
      geojson.resetStyle(e.target);
      hideAllInfoBoxes(); 
    } else {
      e.target.setStyle({
        weight: 1,
        color: "#000"
      });
    }

    if (guImageMap[name]) {
      layer.on("click", () => {
        const imageBox = document.getElementById("gu-image-box");
        const image1 = document.getElementById("guImage1");
        const image2 = document.getElementById("guImage2");
        const imageList = guImageMap[name];

        if (imageBox.style.display !== "none" && imageBox.style.display !== "") {
          imageBox.style.display = "none";
        } else {
          image1.src = imageList[0];
          image1.style.display = "block";

          if (imageList.length > 1) {
            image2.src = imageList[1];
            image2.style.display = "block";
          } else {
            image2.style.display = "none";
          }

          imageBox.style.display = "block";
        }

        document.querySelectorAll(".info-box").forEach(box => {
          box.style.display = "none";
        });
      });
    }
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

// =================== 싱크홀 마커 ===================

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
        }).addTo(map);

        m.on('click', () => {
          const popup = L.popup({
            pane: 'customPopupPane',
            autoPan: true,
            autoPanPadding: [10, 10]
          })
            .setLatLng([p.lat, p.lng])
            .setContent(`
              <div style="font-size:14px;">
                <strong>${p.name}</strong><br>
                날짜: ${p.date}<br>
                크기: ${p.size}<br>
                깊이: ${p.depth}
              </div>
            `);
          map.openPopup(popup);
        });

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

let subwayLayer;

function toggleSubway() {
  const legend = document.getElementById("subway-legend");
  if (subwayLayer) {
    map.removeLayer(subwayLayer);
    subwayLayer = null;

    if (legend) legend.style.display = "none";
  } else {
    subwayLayer = L.layerGroup();  // 그룹 레이어로 생성

    const lineColors = {
      "부산 도시철도 1호선": "#f58220",   // 주황
      "부산 도시철도 2호선": "#00a84f",   // 초록
      "부산 도시철도 3호선": "#d9903d",   // 갈색
      "부산 경량도시철도 4호선": "#0078c8", // 파랑
      "부산김해경전철": "#5e4485",         // 보라
      "동해선": "#1e90ff"                 // 남색
    };

    // 노선들 추가
    ['line1','line2','line3','line4','line5','line6'].forEach(fname => {
      fetch(`data/${fname}.geojson`)
        .then(r => r.json())
        .then(geo => {
          const layer = L.geoJSON(geo, {
        pane: 'subwayPane',
            style: f => ({
              color: lineColors[f.properties.LINE_NM] || '#666',
              weight: 4
            })
          });
          subwayLayer.addLayer(layer);
        });
    });

// 정거장 추가
fetch('data/busan_subway.geojson')
  .then(r => r.json())
  .then(geo => {
    const stationLayer = L.geoJSON(geo, {
      pane: "subwayPane",
      pointToLayer: (f, latlng) => {
        const col = lineColors[f.properties.LINE_NM] || "#000";
        return L.circleMarker(latlng, {
          pane: "subwayPane",   // ★ 반드시 명시 ★
          radius: 4,
          color: "#000",
          weight: 1,
          fillColor: col,
          fillOpacity: 1
        });
      },
      onEachFeature: (f, layer) => {
        layer.bindPopup(`<b>${f.properties.STN_KOR}</b><br>${f.properties.LINE_NM}`);
      }
    });
    subwayLayer.addLayer(stationLayer);
  });

  subwayLayer.addTo(map);
  if (legend) legend.style.display = "block";
  }
}

function toggleRiskInfo() {
  const infoBox = document.getElementById("risk-info-box");
  if (infoBox.style.display === "none") {
    infoBox.style.display = "block";
  } else {
    infoBox.style.display = "none";
  }
}
