import logo from './logo.svg';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import React from 'react';



//To start cmd: npm start

// Fix for default marker icon
let DefaultIcon = L.icon({
  iconUrl: 'https://example.com/path/to/default-icon.png',
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

// Add blue marker icon for investment locations
let BlueIcon = L.icon({
  iconUrl: 'https://example.com/path/to/blue-icon.png', // Replace with the actual URL for the blue icon
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


//This is at the top of the page and will be used to set filter and finance options
function FilterAndFinanceOptions() {
//This is carries the filter and finance options that will be pulled in at the top of the page
const filterAndFinanceData = {
  "filterOptions": {
    "defaultLowerPrice": 500000,
    "defaultUpperPrice": 1000000,
    "propertyType": "apartment",
    "propertyOptions": ["apartment", "house", "commercial"]
  },
  "financialOptions": {
    "defaultDownPayment": 100000,
    "defaultDownPaymentPercentage": 20,
    "defaultDownPaymentType": ["cash", "percentage"],
    "currencyOptions": ["USD", "EUR", "GBP"],
    "interestRate": {
    "defaultInterestRate": 3.5,
    "defaultBoundingBoxMiles": 1,
     }
  },
  "displayOptions": {
    "defaultSortOrder": "ascending",
    "sortOrderOptions": ["ascending", "descending"],
    "itemsPerPage": 10,
    "itemsPerPageOptions": [10, 20, 50, 100],
  }
}

const [downPayment, setDownPayment] = React.useState(filterAndFinanceData.financialOptions.defaultDownPayment);

  return (
    <div style={{ textAlign: 'left' }}>
      <text>Im looking for a property:</text>
{/*Add a text box for lower and upper price range*/}
<input 
  type="text" 
  placeholder="Lower Price" 
  style={{ margin: '5px' }} 
  value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(filterAndFinanceData.filterOptions.defaultLowerPrice)} 
/>
<input 
  type="text" 
  placeholder="Upper Price" 
  style={{ margin: '5px' }} 
  value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(filterAndFinanceData.filterOptions.defaultUpperPrice)} 
/>


{/*Add a dropdown for property type*/}
<text>Property Type: </text>
<select style={{ margin: '5px' }} value={filterAndFinanceData.filterOptions.propertyType}>
  <option value="apartment">Apartment</option>
  <option value="house">House</option>
  <option value="commercial">Commercial</option>
</select>
<br></br>
{/*Add a textbox for down payment amount.  Show the amount as currency with commas and dollar sign.   */}
<text>Down Payment Amount: </text>

<input 
  type="text" 
  placeholder="Down Payment Amount" 
  style={{ margin: '5px' }} 
  value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(downPayment)} 
  onChange={(e) => setDownPayment(parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0)} 
/>

{/*Add a textbox for interest rate*/}
<text>Interest Rate (%): </text>
<input type="text" placeholder="Interest Rate" style={{ margin: '5px' }} value={filterAndFinanceData.financialOptions.defaultInterestRate} />

{/*Add a textbox for bounding box miles*/}
<text>Bounding Box Miles: </text>
<input type="text" placeholder="Bounding Box Miles" style={{ margin: '5px' }} value={filterAndFinanceData.financialOptions.defaultBoundingBoxMiles} />
<br></br>

{/*Add a button to submit the filter and finance options*/}
<button style={{ margin: '5px' }}>Submit</button>
    </div>
  );
}

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
            <text><br></br>{selectedLocation.coordinates}</text>
          </div>
        )}
      </div>
      {rentalLister(rentalProperties)}
    </div>
  );
}

function LeafletMap({ investmentLocations = [], rentalProperties = [], onLocationSelect, boundingBoxMiles }) {
  const [boundingBox, setBoundingBox] = React.useState(null);
  const [boxUpperLeft, setBoxUpperLeft] = React.useState([37.3785, -122.0411]);
  const [boxLowerRight, setBoxLowerRight] = React.useState([37.3960, -122.0300]);



  const drawBoundingBox = (location) => {
    if (!location || !location.coordinates) {
      console.error("Invalid location or coordinates:", location);
      return;
    }
  
    const [lat, lng] = location.coordinates; // Ensure this is the correct order
  

    
    console.log("Drawing bounding box for:", lat, lng);
  
    const halfWidth = (boundingBoxMiles) / 69;
    const halfHeight = (boundingBoxMiles) / 69;
  

    setBoxUpperLeft([lat - halfHeight, lng - halfWidth]);
    setBoxLowerRight([lat + halfHeight, lng + halfWidth]);

  };

  return (
    <MapContainer 
      center={[37.3785, -122.0311]}
      zoom={12} 
      style={{ height: '700px', width: '1300px' }}
    >
      <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
      />
      {investmentLocations.map((location, index) => (
        location.coordinates ? ( // Check if coordinates exist
          <Marker 
            key={index} 
            position={location.coordinates}
            icon={L.icon({ // Use a blue icon similar to RedIcon
              iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png', // URL for blue icon
              shadowUrl: iconShadow,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34]
            })}
            eventHandlers={{
              click: () => {
                onLocationSelect(location);
                drawBoundingBox(location);
              }
            }}
          >
            <Popup>
              {location.name}
            </Popup>
          </Marker>
        ) : null // Skip rendering if coordinates are missing
      ))}
      {rentalProperties.map((property, index) => (
        <Marker key={index} position={property.coordinates} icon={RedIcon}>
          <Popup>
            {property.name}
          </Popup>
        </Marker>
      ))}
      <Rectangle 
        bounds={[
          boxUpperLeft, // Upper left corner
          boxLowerRight // Lower right corner (adjusted for visibility)
        ]}

        pathOptions={{ 
          color: 'blue', // Set the rectangle color to blue
          fillOpacity: 0 // Make the inside of the rectangle clear
        }} 
      />
    </MapContainer>
  );
}

function App() {
  const [selectedLocation, setSelectedLocation] = React.useState(null);

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: '1', margin: '10px' }}>
        <strong>Investment Property Finder</strong><br></br>
        <FilterAndFinanceOptions />
        <LeafletMap 
          investmentLocations={investmentLocations} 
          rentalProperties={rentalProperties}
          onLocationSelect={setSelectedLocation}
          boundingBoxMiles={1}
        />
      </div>
      <div style={{ width: '300px' }}>
        <SideBar selectedLocation={selectedLocation} />
      </div>
    </div>
  );
}

export default App;
