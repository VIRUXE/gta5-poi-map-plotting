# O Padrinho Roleplay - Points of Interest
This repository contains a web application that displays an interactive map with points of interest (POIs) for the "O Padrinho Roleplay" project. The map is built using the Leaflet.js library and supports multiple map styles (Satellite, Atlas, and Grid). It fetches POI data from a locations.json file and displays them as markers with pop-up descriptions.
Repository Structure

## Features

Custom CRS: A tailored coordinate system for the map, defined with specific scaling and transformation parameters.
Multiple Map Layers:
Satellite Style: High-resolution imagery sourced from gtamap.xyz (max zoom: 8).
Atlas Style: A stylized map view (max zoom: 5).
Grid Style: A grid-based map view (max zoom: 5).

POI Markers: Dynamically loaded from locations.json, with pop-ups showing category, description, and coordinates.
Interactive Map: Users can switch between layers and zoom in/out (min zoom: 1, max zoom: 5).

## Prerequisites

A modern web browser (e.g., Chrome, Firefox, Edge).
Internet access to load Leaflet.js from CDN and map tiles from gtamap.xyz.
A locations.json file with POI data in the following format:[
  {
    "category": "Category Name",
    "description": "Description of POI",
    "coords": [x, y, z]
  },
  ...
]

## Preview

This can be previewed at https://www.opadrinhoroleplay.pt/poi


## Notes

The map is centered at coordinates [0, 0] with an initial zoom level of 3.
A marker labeled "CENTRO" is placed at the map's center.
Ensure locations.json is properly formatted, as the application relies on it for POI data.
The map does not support wrapping or continuous world rendering (noWrap: true, continuousWorld: false).
