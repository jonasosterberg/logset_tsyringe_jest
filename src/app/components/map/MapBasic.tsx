import React, { useRef, useState, useEffect, useMemo } from "react";
import * as ol from "ol";
// import ol from "ol"
// import source from "ol/source"
import { transform } from "ol/proj";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import GeoJSON from "ol/format/GeoJSON";
import { makeStyles } from "@mui/styles";
import "ol/ol.css";

const MapBasic = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  const classes = useStyles();

  const source = new VectorSource({
    url: "./geoJson.geojson",
    format: new GeoJSON(),
  });

  console.log("the socure", source);

  const vectorLayer = new VectorLayer({
    source: source,
    style: {
      "fill-color": "rgba(255, 255, 255, 0.6)",
      "stroke-width": 1,
      "stroke-color": "#319FD3",
      "circle-radius": 5,
      "circle-fill-color": "rgba(255, 255, 255, 0.6)",
      "circle-stroke-width": 1,
      "circle-stroke-color": "#319FD3",
    },
  });

  // Create latitude and longitude and convert them to default projection
  const birmingham = transform([-1.81185, 52.44314], "EPSG:4326", "EPSG:3857");

  console.log("the birmingam is ", birmingham);

  // on component mount
  useEffect(() => {
    if (mapRef.current) {
      const options = {
        target: mapRef.current,

        view: new ol.View({
          center: birmingham,
          zoom: 10,
        }),

        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
        ],
      };
      const mapObject = new ol.Map(options);
      setMap(mapObject);

      return () => mapObject.setTarget(null);
    }
  }, [mapRef]);

  return (
    <div
      ref={mapRef}
      className="map"
      style={{ width: "100%", height: "100vh" }}
    />
  );
};

const useStyles = makeStyles({
  map_root: {
    width: "100%",
    height: "60vh",
  },
  map_container: {
    height: "60vh",
    width: "100%",
  },
});
export default MapBasic;
