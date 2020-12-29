import * as React from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import styles from './Map.module.css';

interface Props {
  name: string;
  location: string;
}

type LatLongCoordinates = [number, number];

const LibraryMap: React.FunctionComponent<Props> = ({ name, location }) => {
  const coordinates = getCoordinatesFromLocation(location);
  if (!coordinates) return null;
  return (
    <MapContainer center={coordinates} zoom={13} className={styles.container}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates} />
    </MapContainer>
  );
};

export default LibraryMap;

function getCoordinatesFromLocation(location = ''): LatLongCoordinates | null {
  const matches = location.match(/POINT \((.*?) (.*?)\)/);
  if (matches && matches[1] && matches[2]) {
    return [parseFloat(matches[2]), parseFloat(matches[1])];
  }
  return null;
}
