import React, { useRef, useState, useEffect, useMemo } from "react";
import "./Map.css";
import * as ol from "ol";
import MapContext from "./MapContext";

// Map component that is responsible to display map on the screen
const Map = ({ children, zoom, center }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  // on component mount
  useEffect(() => {
    const options = {
      view: new ol.View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: [],
    };
    const mapObject = new ol.Map(options);
    setMap(mapObject);

    mapObject.setTarget(mapRef.current);
    return () => mapObject.setTarget(undefined);
  }, []);

  // zoom change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [zoom]);

  // center change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center);
  }, [center]);

  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  );
};
export default Map;
