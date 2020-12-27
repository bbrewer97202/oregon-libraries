import * as React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

interface Props {
  location: string;
}

type LatLongCoordinates = [number, number];

const LibraryMap: React.FunctionComponent<Props> = ({ location }) => {
  const coordinates = getCoordinatesFromLocation(location);
  console.log('coordinates: ', coordinates);
  if (!coordinates) return null;
  return (
    <Map center={coordinates} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates}>
        <Popup>
          A pretty CSS3 popup.
          <br />
          Easily customizable.
        </Popup>
      </Marker>
    </Map>
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
