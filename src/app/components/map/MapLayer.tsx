import React, { useState } from "react";
import Map from "../../map/Map";
import Layers from "../../layers/Layers";
import TileLayer from "../../layers/TileLayers";
import VectorLayer from "../../layers/VectorLayer";

import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { fromLonLat, get, transform } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import Controls from "../../controls/Controls";
import FullScreenControl from "../../controls/FullScreenControl";
import vector from "../../source/vector";
import osm from "../../source/osm";
import { geoJsonData } from "../../geoJsonData/geoJson";
import { Circle } from "ol/geom";

const styles = {
  MultiPolygon: new Style({
    stroke: new Stroke({
      color: "blue",
      width: 1,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
  }),
  Point: new Style({
    image: new CircleStyle({
      radius: 1,
      stroke: new Stroke({
        color: "rgba(17,158,76,0.8)", //#F3C35D
        width: 12,
      }),
      fill: new Fill({
        color: "rgba(255,0,0,0.2)",
      }),
    }),
  }),
};

const geojsonObject = geoJsonData;

const MapLayer = () => {
  const [center, setCenter] = useState([24.8772, 60.80594]);
  const [zoom, setZoom] = useState(12);
  const [showLayer1, setShowLayer1] = useState(true);

  return (
    <div>
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          {showLayer1 && (
            <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(geojsonObject, {
                  featureProjection: get("EPSG:3857"),
                }),
              })}
              style={[styles.MultiPolygon, styles.Point]}
            />
          )}
        </Layers>
        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>
    </div>
  );
};
export default MapLayer;
