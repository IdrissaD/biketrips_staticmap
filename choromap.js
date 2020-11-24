var osm_layer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {

	attribution: '<a href = "https://areskidrissa.cc" target = "_blank">areskidrissa.cc</a> Map data &copy; <a href="https://www.openstreetmap.org/" target = "_blank">OpenStreetMap</a> contributors, ' +

	'<a href="https://creativecommons.org/licenses/by-sa/2.0/" target = "_blank">CC-BY-SA</a>'
});

var choromap = L.map('choroid').setView([45.757523270000576, 4.831581115722656], 6);



function style_dpts(feature) {
            if (feature.properties['tot_dist'] == 0) {
                return {
                opacity: 0,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 0,
                fillColor: 'rgba(255,255,255,1.0)',
                interactive: true,
            }
            }
            if (feature.properties['tot_dist'] >= 0.000000 && feature.properties['tot_dist'] <= 50.000000 ) {
                return {
                opacity: 0,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 0.65,
                fillColor: 'rgba(247,252,245,1.0)',
                interactive: true,
            }
            }
            if (feature.properties['tot_dist'] >= 50.000000 && feature.properties['tot_dist'] <= 100.000000 ) {
                return {
                opacity: 0,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 0.65,
                fillColor: 'rgba(213,239,207,1.0)',
                interactive: true,
            }
            }
            if (feature.properties['tot_dist'] >= 100.000000 && feature.properties['tot_dist'] <= 150.000000 ) {
                return {
                opacity: 0,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 0.65,
                fillColor: 'rgba(158,216,152,1.0)',
                interactive: true,
            }
            }
            if (feature.properties['tot_dist'] >= 150.000000 && feature.properties['tot_dist'] <= 200.000000 ) {
                return {
                opacity: 0,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 0.65,
                fillColor: 'rgba(84,181,103,1.0)',
                interactive: true,
            }
            }
            if (feature.properties['tot_dist'] >= 200.000000 && feature.properties['tot_dist'] <= 250.000000 ) {
                return {
                opacity: 0,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 0.65,
                fillColor: 'rgba(29,134,65,1.0)',
                interactive: true,
            }
            }
            if (feature.properties['tot_dist'] >= 250.000000) {
                return {
                opacity: 0,
                color: 'rgba(35,35,35,1.0)',
                dashArray: '',
                lineCap: 'butt',
                lineJoin: 'miter',
                weight: 1.0, 
                fill: true,
                fillOpacity: 0.65,
                fillColor: 'rgba(0,68,27,1.0)',
                interactive: true,
            }
            }
};

function getColor(d) {
    return d > 250  ? 'rgba(0,68,27,1.0)' :
           d > 200  ? 'rgba(29,134,65,1.0)' :
           d > 150  ? 'rgba(84,181,103,1.0)' :
           d > 100   ? 'rgba(158,216,152,1.0)' :
           d > 50   ? 'rgba(213,239,207,1.0)' :
           d > 0   ? 'rgba(247,252,245,1.0)' :
           'rgba(255,255,255,1.0)';
}

var dpts_layer = L.geoJson(dpts, {
        onEachFeature(feature, layer)
        {layer.bindPopup('<p><b>' + feature.properties.nom + '</b></p><p>' + parseFloat(feature.properties.tot_dist).toFixed(0) + ' km</p><p>Nombre de voyages : ' + feature.properties.nb_trips)},
        style: style_dpts
    });



var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 50, 100, 150, 200, 250],
        labels = [];

    div.innerHTML = '<p><b>Nombre de kilomètres<br>parcourus dans<br> le département</b></p>'

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

dpts_layer.addTo(choromap);
legend.addTo(choromap);
osm_layer.addTo(choromap);