var osm_layer = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {

	attribution: '<a href = "https://github.com/IdrissaD" target = "_blank">Idrissa Djepa</a> | Map data: Djepa and <a href="https://www.openstreetmap.org/" target = "_blank">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/" target = "_blank">CC-BY-SA</a>'
});

var choromap = L.map('choroid').setView([45.757523270000576, 4.831581115722656], 6);

// Style the dpts, and hide those that have a tot_dist = 0
function style_dpts(feature) {
    if (feature.properties.tot_dist == 0) {
        return {
            opacity: 0,
            fillOpacity: 0    
        }
    } else {
        return {
            opacity: 0,
            fillOpacity: 0.65
        }
    }    
};

// Define what to do with each feature:
// bind a different popup content if tot_dist = 0 or not
// referr to mouse interactions functions
function onEachFeature(feature, layer) {
    if (feature.properties.tot_dist){
        layer.bindPopup('<p><b>' + feature.properties.nom + '</b></p><p>' + parseFloat(feature.properties.tot_dist).toFixed(0) + ' km</p><p>Nombre de voyages : ' + feature.properties.nb_trips)
        } else {
            layer.bindPopup('<p><b>' + feature.properties.nom + '</b></p><p>Pas de voyage')
        };
        layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
};

// Define the style changements when hovering a dpt
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 2.5,
        color: 'green',
        opacity: 1
    });

    // Necessary for other browsers than Firefox, which don't support bringToFront
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
};

// Reset the style when hovering is finished
function resetHighlight(e) {
    dpts_layer.resetStyle(e.target);
};

// Build the choropleth map with choropleth plugin
var dpts_layer = L.choropleth(dpts, {
    valueProperty: 'tot_dist',
    scale: ['white', 'green'],
    steps: 6,
    mode: 'e',
    style: style_dpts,
    onEachFeature: onEachFeature
});

// Build the legend
var legend = L.control({ position: 'bottomright' })
  legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend')
    var limits = dpts_layer.options.limits
    var colors = dpts_layer.options.colors
    var labels = []

    // Add min & max
    div.innerHTML = '<div class="text"><p><b>Nombre de kilomètres parcourus<br>dans le département</b></p></div><div class="labels"><div class="min">' + limits[0] + '</div> \
            <div class="max">' + parseFloat(limits[limits.length - 1]).toFixed(0) + '</div></div>'

    limits.forEach(function (limit, index) {
      labels.push('<li style="background-color: ' + colors[index] + '"></li>')
    })

    div.innerHTML += '<ul>' + labels.join('') + '</ul>'
    return div
};

// Add the layers and legend to the map
dpts_layer.addTo(choromap);
legend.addTo(choromap);
osm_layer.addTo(choromap);