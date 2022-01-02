import * as React from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import styles from './Map.module.css';

interface Props {
  location: string | null;
}

const getFormattedCoordinates = (location: string | null): [number, number] => {
  let lat = 0;
  let lng = 0;
  if (typeof location === 'string') {
    const parts = location.split(',', 2);
    lat = parts[0] ? parseFloat(parts[0]) : lat;
    lng = parts[1] ? parseFloat(parts[1]) : lng;
  }
  return [lat, lng];
};

const LibraryMap: React.FunctionComponent<Props> = ({ location }) => {
  const coordinates = getFormattedCoordinates(location);

  return (
    <div>
      <MapContainer center={coordinates} zoom={13} className={styles.container}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={coordinates} />
      </MapContainer>
    </div>
  );
};

export default LibraryMap;
