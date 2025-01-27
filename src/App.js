import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import React from 'react';

// Fix for default marker icon
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// Add red marker icon for rental properties
let RedIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
});

L.Marker.prototype.options.icon = DefaultIcon;

//Make a json content that has coordinates of locations in santa clara

const rentalProperties = [
  {
    name: '456 S Murphy Ave',
    coordinates: [37.3785, -122.0311],
    monthly_rent: '$1,500'
  },
  {
    name: '789 Fair Oaks Ave',
    coordinates: [37.3898, -122.0156],
    monthly_rent: '$1,200'
  },
  {
    name: '123 Reed Ave',
    coordinates: [37.3836, -122.0109],
    monthly_rent: '$1,000'
  },
  {
    name: '567 W Washington Ave',
    coordinates: [37.3708, -122.0415],
    monthly_rent: '$1,000'
  },
  {
    name: '890 E Fremont Ave',
    coordinates: [37.3905, -122.0212],
    monthly_rent: '$1,000'
  },
  {
    name: '234 Maude Ave',
    coordinates: [37.4015, -122.0362],
    monthly_rent: '$1,000'
  },
  {
    name: '678 S Mathilda Ave',
    coordinates: [37.3786, -122.0304],
    monthly_rent: '$3,500'
  },
  {
    name: '901 W El Camino Real',
    coordinates: [37.3717, -122.0372],
    monthly_rent: '$2,800'
  },
  {
    name: '345 Sunnyvale Saratoga Rd',
    coordinates: [37.3638, -122.0355],
    monthly_rent: '$2,500'
  },
  {
    name: '789 Hollenbeck Ave',
    coordinates: [37.3472, -122.0573],
    monthly_rent: '$3,200'
  },
  {
    name: '123 S Frances St',
    coordinates: [37.3781, -122.0305],
    monthly_rent: '$4,500'
  },
  {
    name: '456 Lawrence Expressway',
    coordinates: [37.3700, -121.9966],
    monthly_rent: '$3,800'
  },
  {
    name: '890 E Evelyn Ave',
    coordinates: [37.3943, -122.0246],
    monthly_rent: '$2,900'
  },
  {
    name: '234 Innovation Way',
    coordinates: [37.3957, -122.0323],
    monthly_rent: '$4,800'
  },
  {
    name: '567 N Mary Ave',
    coordinates: [37.3986, -122.0315],
    monthly_rent: '$4,200'
  },
  {
    name: '789 Persian Dr',
    coordinates: [37.3709, -121.9639],
    monthly_rent: '$3,900'
  }
];

const investmentLocations = [
  {
    name: 'Downtown Sunnyvale (Murphy Avenue)',
    coordinates: [37.3785, -122.0311]
  },
  {
    name: 'Sunnyvale Public Library',
    coordinates: [37.3686, -122.0365]
  },
  {
    name: 'Sunnyvale Heritage Park Museum',
    coordinates: [37.3842, -122.0184]
  },
  {
    name: 'Sunnyvale Community Center',
    coordinates: [37.3681, -122.0382]
  },
  {
    name: 'Apple Park',
    coordinates: [37.3349, -122.0090]
  },
  {
    name: 'Las Palmas Park',
    coordinates: [37.3642, -122.0280]
  },
  {
    name: 'Baylands Park',
    coordinates: [37.4237, -122.0338]
  },
  {
    name: 'Ortega Park',
    coordinates: [37.3515, -122.0501]
  },
  {
    name: 'Sunnyvale Caltrain Station',
    coordinates: [37.3781, -122.0319]
  },
  {
    name: 'Twin Creeks Sports Complex',
    coordinates: [37.4106, -121.9967]
  }
];

function rentalLister(rentalProperties) {
  return (
    <div style={{ 
      overflowY: 'auto',
      maxHeight: '45vh',
      padding: '10px'
    }}>
      <h2>Rental Properties</h2>
      <p>Find the best rental properties in Sunnyvale</p>
      {rentalProperties.map((property, index) => (
        <div key={index}>
          <strong>{property.name}:</strong> <text><br></br>{property.monthly_rent}</text>
        </div>
      ))}
    </div>
  );
}

function SideBar({ selectedLocation }) {
  return (
    <div className="sidebar" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ 
        overflowY: 'auto',
        maxHeight: '45vh',
        padding: '10px'
      }}>
        <h2>Investment Locations</h2>
        <p>Find the best investment opportunities in Sunnyvale</p>
        {selectedLocation && (
          <div>
            <h3>Selected Location</h3>
            <strong>{selectedLocation.name}</strong>
          </div>
        )}
      </div>
      {rentalLister(rentalProperties)}
    </div>
  );
}

function LeafletMap({ investmentLocations, rentalProperties, onLocationSelect }) {
  return (
    <MapContainer 
      center={[37.3785, -122.0311]}
      zoom={12} 
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
      />
      {investmentLocations.map((location, index) => (
        <Marker 
          key={index} 
          position={location.coordinates}
          eventHandlers={{
            click: () => onLocationSelect(location)
          }}
        >
          <Popup>
            {location.name}
          </Popup>
        </Marker>
      ))}
      {rentalProperties.map((property, index) => (
        <Marker key={index} position={property.coordinates} icon={RedIcon}>
          <Popup>
            {property.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

function App() {
  const [selectedLocation, setSelectedLocation] = React.useState(null);

  return (
    <div className="App" style={{ display: 'flex' }}>
      <div style={{ flex: '1' }}>
        <LeafletMap 
          investmentLocations={investmentLocations} 
          rentalProperties={rentalProperties}
          onLocationSelect={setSelectedLocation}
        />
      </div>
      <div style={{ width: '300px' }}>
        <SideBar selectedLocation={selectedLocation} />
      </div>
    </div>
  );
}

export default App;
