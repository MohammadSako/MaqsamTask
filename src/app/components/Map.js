"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const Map = ({ latitude, longitude, onLocationSelect }) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!latitude || !longitude || !mapContainer.current) return;

    mapInstance.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: 1,
    });

    mapInstance.current.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      onLocationSelect(lng, lat);
    });

    return () => mapInstance.current.remove();
  }, [latitude, longitude, onLocationSelect]);

  return (
    <div>
      <div ref={mapContainer} className="w-full h-[400px] shadow-lg my-4" />
    </div>
  );
};

export default Map;
