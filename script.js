const center_x = 117.3;
const center_y = 172.8;
const scale_x = 0.02072;
const scale_y = 0.0205;

// Customize the Coordinate Reference System
CUSTOM_CRS = L.extend({}, L.CRS.Simple, {
    projection: L.Projection.LonLat,
    scale: function (zoom) {
        return Math.pow(2, zoom);
    },
    zoom: function (sc) {
        return Math.log(sc) / 0.6931471805599453;
    },
    distance: function (pos1, pos2) {
        var x_difference = pos2.lng - pos1.lng;
        var y_difference = pos2.lat - pos1.lat;
        return Math.sqrt(
            x_difference * x_difference + y_difference * y_difference
        );
    },
    transformation: new L.Transformation(
        scale_x,
        center_x,
        -scale_y,
        center_y
    ),
    infinite: true,
});

// Setup the different map layers
var SateliteStyle = L.tileLayer(
        "https://gtamap.xyz/mapStyles/styleSatelite/{z}/{x}/{y}.jpg",
        {
            minZoom: 0,
            maxZoom: 8,
            noWrap: true,
            continuousWorld: false,
            id: "SateliteStyle map",
        }
    ),
    AtlasStyle = L.tileLayer(
        "https://gtamap.xyz/mapStyles/styleAtlas/{z}/{x}/{y}.jpg",
        {
            minZoom: 0,
            maxZoom: 5,
            noWrap: true,
            continuousWorld: false,
            id: "styleAtlas map",
        }
    ),
    GridStyle = L.tileLayer(
        "https://gtamap.xyz/mapStyles/styleGrid/{z}/{x}/{y}.png",
        {
            minZoom: 0,
            maxZoom: 5,
            noWrap: true,
            continuousWorld: false,
            id: "styleGrid map",
        }
    );

    // Setup the Leaflet map object
var map = L.map("map", {
    crs: CUSTOM_CRS,
    minZoom: 1,
    maxZoom: 5,
    Zoom: 5,
    maxNativeZoom: 5,
    preferCanvas: true,
    layers: [SateliteStyle],
    center: [0, 0],
    zoom: 3,
});

var layersControl = L.control
    .layers({ Satelite: SateliteStyle, Atlas: AtlasStyle, Grid: GridStyle })
    .addTo(map);

var yx = L.latLng;

var xy = function (x, y) {
    if (L.Util.isArray(x))
        return yx(x[1], x[0]);
        
    return yx(y, x); // When doing xy(x, y);
};

// Fetch the required POI data
fetch("locations.json")
    .then((data) => data.json())
    .then((nodes) => {
        for (let index = 0; index < nodes.length; index++) {
            const poi = nodes[index];
            const xAxis = parseFloat(poi.coords[0]);
            const yAxis = parseFloat(poi.coords[1]);
            
            let label = poi.category
                ? `ID ${index} - ${poi.category} (${poi.description})`
                : `ID ${index} - ${poi.description}`;

            label += ` | Coords: ${poi.coords[0]}, ${poi.coords[1]}, ${poi.coords[2]}`;

            L.marker(xy(xAxis, yAxis)).addTo(map).bindPopup(label);
            console.log(label, xAxis, yAxis);
        }
    });

L.marker(xy(0,0)).addTo(map).bindPopup("CENTRO");

map.setView(xy(0, 0), 3);
