var map = L.map('map').setView([29.963632950314803, 137.40167218213392], 5);

  // load a tile layer
 L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
}).addTo(map);

$.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson",function(data){
   var quake = L.icon({
    iconUrl: "https://img.icons8.com/plasticine/100/000000/error.png",
    iconSize: [55,50]
  }); 
  L.geoJson(data  ,{
    pointToLayer: function(feature,latlng){
	  return L.marker(latlng,{icon: quake});
    },  
    onEachFeature: function(feature,layer){
      layer.bindPopup('<h1>Magnitude: '+feature.properties.mag+'</h1><b>Location: '+feature.properties.place+'</b><p>ShakeMap: '+feature.properties.url+'</p>');
    }
  }  ).addTo(map); 
});

$.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson",function(data){ createFeatures(data.features);
});
  
function markerSize(magnitude) {
  return magnitude * 30000;
};

// Function to assign color depends on the Magnitude
function getColor(m) {

  var colors = ['lightgreen','yellowgreen','gold','orange','lightsalmon','tomato'];

  return  m > 5? colors[5]:
          m > 4? colors[4]:
          m > 3? colors[3]:
          m > 2? colors[2]:
          m > 1? colors[1]:
                 colors[0];
};

function createFeatures(data) {

  var earthquakes = L.geoJSON(data,{
     pointToLayer: function(feature, latlng){
      return new L.circle(latlng,
      { radius: markerSize(feature.properties.mag),
        fillColor: getColor(feature.properties.mag),
        fillOpacity: .7,
        color: 'grey',
        weight: .5
      }).addTo(map)
    }    
  
});
};

$.getJSON("https://raw.githubusercontent.com/ddmeyer23/active_volcanoes/main/data.geojson",function(data){
   var volcano = L.icon({
    iconUrl: "https://img.icons8.com/ios-glyphs/30/000000/volcano.png",
    iconSize: [20,15]
  }); 
  L.geoJson(data  ,{
    pointToLayer: function(feature,latlng){
	  return L.marker(latlng,{icon: volcano});
    },
    onEachFeature: function(feature,layer){
      layer.bindPopup('<h1> '+feature.properties.NAME_+'</h1><p>Location: '+feature.properties.LOCATION+'</p><p>Elev.(ft.): '+feature.properties.ELEV+'</p><p>Type: '+feature.properties.TYPE_);
    }
  }  ).addTo(map);
});

$.getJSON("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json", function (data) {
    L.geoJSON(data,
      {
        color: 'blue',
        weight: 2
      })
      .addTo(map);
  }); 
