document.addEventListener("DOMContentLoaded", function () {
    var myMap = L.map("map").setView([37.09, -95.71], 5);
  
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(myMap);
  
    var url =
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.features.forEach((earthquake) => {
          var coords = earthquake.geometry.coordinates;
          var mag = earthquake.properties.mag;
          var depth = coords[2];
  
          var circle = L.circle([coords[1], coords[0]], {
            color: "red",
            fillColor: getColor(depth),
            fillOpacity: 0.8,
            radius: mag * 20000,
          });
  
          circle.bindPopup(
            `<strong>Magnitude: ${mag}</strong><br>Depth: ${depth} km`
          );
  
          circle.addTo(myMap);
        });
      });
  
    function getColor(depth) {
      return "blue";
    }
  });