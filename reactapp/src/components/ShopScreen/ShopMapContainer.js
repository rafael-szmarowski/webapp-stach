import React, { useRef } from "react";

import { MapContainer, TileLayer, Marker } from "react-leaflet";

import "react-datepicker/dist/react-datepicker.css";

export default function ShopMapContainer({ shopDetails }) {
  const mapRef = useRef();
  let shopPosition = [shopDetails.latitude, shopDetails.longitude];

  return (
    <div>
      <MapContainer
        ref={mapRef}
        center={shopPosition}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={shopPosition}
        ></Marker>
      </MapContainer>
    </div>
  );
}
