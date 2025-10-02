import React from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import MapImage from '../assets/Map.jpeg';
import BoothIconImg from '../assets/Booth.png';

export default function Map() {
  const bounds = [
    [0, 0],
    [1000, 1400], 
  ];
const BoothIcon = L.icon({
  iconUrl: BoothIconImg,
    //reminder, PLEASE FOR THE LOVE OF GOD GET THE MAP
    iconSize:     [66, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

  return (
    <div>
                      <div className="flex-container">
    <div className="row">
        
    <MapContainer
      crs={L.CRS.Simple}
      bounds={bounds}
      style={{ width: '800px', height: '600px' }}
    >
      <ImageOverlay url={MapImage} bounds={bounds} />
                  <Marker position={[500, 700]} icon={BoothIcon}>
              <Popup>
                Booth Location <br /> Click for details
              </Popup>
            </Marker>
    </MapContainer> 
                 
        </div>
        </div>
              
</div>

  );
}
