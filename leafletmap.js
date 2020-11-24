var osm_layer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {

	attribution: '<a href = "https://areskidrissa.cc" target = "_blank">areskidrissa.cc</a> Map data &copy; <a href="https://www.openstreetmap.org/" target = "_blank">OpenStreetMap</a> contributors, ' +

	'<a href="https://creativecommons.org/licenses/by-sa/2.0/" target = "_blank">CC-BY-SA</a>'

	});


var mymap = L.map('mapid').setView([49.49544809215964, 4.9706268310546875], 5);


var routesLayer = L.geoJson(null, {
        onEachFeature(feature, layer)
        {layer.bindPopup('<p><b>' + feature.properties.name + '</b></p><p>'+ parseFloat(turf.length(feature.geometry, {units: 'kilometers'})).toFixed(0) + ' km</p>')}
    })

// All the geo are green
var style = function(geo) {
    return {color: "green"}
};

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
        omnivore.kml(list_files[i], null, routesLayer, style).addTo(mymap)}

    else if (extension == 'gpx') {
        omnivore.gpx(list_files[i], null, routesLayer, style).addTo(mymap)}

    else if (extension == 'geojson') {
        omnivore.geojson(list_files[i], null, routesLayer, style).addTo(mymap)}
};


// Building of a title div
var title = L.control({position: 'topright'});

title.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'title'); // create a div with a class "info"
    div.innerHTML = '<h4>Tracés de mes voyages à vélo</h4>';
    return div;
};

title.addTo(mymap);
osm_layer.addTo(mymap);
