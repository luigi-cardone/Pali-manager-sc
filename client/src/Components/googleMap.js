import { useRef, useEffect } from "react";
export default function GoogleMap({
    center,
    zoom,
  }) {
    const ref = useRef();
    useEffect(() => {
      new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
    });
  
    return <div className="mt-2 shadow-sm rounded-1" style={{height: "450px", width: "100%"}} ref={ref} id="map" />;
  }