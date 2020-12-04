var osm_layer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png');


var mymap = L.map('mapid').setView([49.49544809215964, 4.9706268310546875], 5);


var routesLayer = L.geoJson(null, {
        onEachFeature(feature, layer)
        {layer.bindPopup('<p><b>' + feature.properties.name + '</b></p><p>'+ parseFloat(turf.length(feature.geometry, {units: 'kilometers'})).toFixed(0) + ' km</p>')},
        style:function(feature) {
            return {color: "green"}
        }
    });


// Definition of all the files URL
var list_files = [
"routes\/Bad Bentheim - Amsterdam.gpx",
"routes\/Berlin - Hamburg.gpx",
"routes\/Clermont-Ferrand - Narbonne.geojson",
"routes\/Étampes - Nantes.gpx",
"routes\/Flensburg - Niebüll.gpx",
"routes\/Gard.kml",
"routes\/Gennetines - Fontainebleau.gpx",
"routes\/GTRhône abrégée.geojson",
"routes\/Livron - Vernoux.geojson",
"routes\/Lyon - Jasserie.gpx",
"routes\/Lyon - Sainté.gpx",
"routes\/Lyon - Trets.gpx",
"routes\/Lyon -Yvoire.gpx",
"routes\/Malsherbes - Gennetines.gpx",
"routes\/Melun - Lyon.gpx",
"routes\/Müllheim - Mâcon.gpx",
"routes\/Strasbourg - Oberndorf.gpx",
"routes\/Vernoux - Sainté.kml",
"routes\/Vexin français.kml"];

//console.log(list_files);

// Loop on files URL, conversion to Leaflet objects

for (var i = 0; i< list_files.length; i+= 1) {
    extension = list_files[i].split('.').pop()
    
    if (extension == 'kml') {
        omnivore.kml(list_files[i], null, routesLayer).addTo(mymap)}

    else if (extension == 'gpx') {
        omnivore.gpx(list_files[i], null, routesLayer).addTo(mymap)}

    else if (extension == 'geojson') {
        omnivore.geojson(list_files[i], null, routesLayer).addTo(mymap)}
};


// Building of a title div
var title = L.control({position: 'topright'});

title.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'title'); // create a div with a class "title"
    div.innerHTML = '<h4>Tracés de mes voyages à vélo</h4>';
    return div;
};

L.control.scale().addTo(mymap);
title.addTo(mymap);
osm_layer.addTo(mymap);