import { useContext, useEffect } from "react";
import MapContext from "../map/MapContext";
import OLVectorLayer from "ol/layer/Vector";

const VectorLayer = ({ source, style, zIndex = 0 }) => {
  const { map } = useContext(MapContext);

  console.log("the mapppp is ", map);

  useEffect(() => {
    if (!map) return;
    const vectorLayer = new OLVectorLayer({
      source,
      style,
    });
    map.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);
    return () => {
      if (map) {
        map.removeLayer(vectorLayer);
      }
    };
  }, [map]);
  return null;
};
export default VectorLayer;
