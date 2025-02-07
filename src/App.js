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
const [propertyType, setPropertyType] = React.useState(filterAndFinanceData.filterOptions.propertyType);

  return (
    <div style={{ textAlign: 'left' }}>
      <p>Im looking for a property:</p>
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
<p>Property Type: </p>
<select 
  style={{ margin: '5px' }} 
  value={propertyType} 
  onChange={(e) => setPropertyType(e.target.value)}
>
  <option value="apartment">Apartment</option>
  <option value="house">House</option>
  <option value="commercial">Commercial</option>
</select>
<br></br>
{/*Add a textbox for down payment amount.  Show the amount as currency with commas and dollar sign.   */}
<p>Down Payment Amount: </p>


<input 
  type="text" 
  placeholder="Down Payment Amount" 
  style={{ margin: '5px' }} 
  value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(downPayment)} 
  onChange={(e) => setDownPayment(parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0)} 
/>

{/*Add a textbox for interest rate*/}
<p>Interest Rate (%): </p>
<input 
  type="text" 
  placeholder="Interest Rate" 
  style={{ margin: '5px' }} 
  value={filterAndFinanceData.financialOptions.defaultInterestRate} 
  onChange={(e) => {/* Handle change here if needed */}}
/>



{/*Add a textbox for bounding box miles*/}
<p>Bounding Box Miles: </p>
<input 
  type="text" 
  placeholder="Bounding Box Miles" 
  style={{ margin: '5px' }} 
  value={filterAndFinanceData.financialOptions.defaultBoundingBoxMiles} 
  onChange={(e) => {/* Handle change here if needed */}}
/>
<br></br>



{/*Add a button to submit the filter and finance options*/}
<button style={{ margin: '5px' }}>Submit</button>
    </div>
  );
}

function RentalLister({ filteredRentalProperties }) {
  return (
    <div style={{ 
      overflowY: 'auto',
      maxHeight: '45vh',
      padding: '10px'
    }}>
      <h2>Rental Properties</h2>
      <p>Find the best rental properties in Sunnyvale</p>
      {filteredRentalProperties.map((property, index) => (
        <div key={index}>
          <strong>{property.name}:</strong> <p><br></br>{property.monthly_rent}</p>
        </div>
      ))}
    </div>

  );
}

function SideBar({ selectedLocation, filteredRentalProperties = [] }) {
  // Break out the location into the bounding box so it can be used in a filter.

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
            <p><br></br>{selectedLocation.coordinates.join(', ')}</p> {/* Display coordinates */}
          </div>
        )}
      </div>
    
      <RentalLister filteredRentalProperties={filteredRentalProperties} />

    </div>

  );
}

function SideBar2({ selectedLocation, filteredRentalProperties }) {
  return (
    <div className="sidebar" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ overflowY: 'auto', maxHeight: '45vh', padding: '10px' }}>
        <h2>Investment Locations</h2>
        <p>Find the best investment opportunities in Sunnyvale</p>
        {selectedLocation && (
          <div>
            <h3>Selected Location</h3>
            <strong>{selectedLocation.name}</strong>
            <p><br />{selectedLocation.coordinates.join(', ')}</p>
          </div>
        )}
      </div>
      <RentalLister filteredRentalProperties={filteredRentalProperties} />
    </div>
  );
}




function LeafletMap({ investmentLocations = [], rentalProperties = [], onLocationSelect, handlePropertyClick, latHigh, latLow, lonLeft, lonRight}) {


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
        location.coordinates ? (
          <Marker 
            key={index} 
            position={location.coordinates}
            icon={L.icon({
              iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
              shadowUrl: iconShadow,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34]
            })}
            eventHandlers={{
              click: () => {
                onLocationSelect(location);
                handlePropertyClick(location);
              }
            }}
          >
            <Popup>
              {location.name}
            </Popup>
          </Marker>
        ) : null
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
          [latLow, lonLeft], // Upper left corner
          [latHigh, lonRight] // Lower right corner (adjusted for visibility)
        ]}




        pathOptions={{ 
          color: 'blue', // Set the rectangle color to blue
          fillOpacity: 0 // Make the inside of the rectangle clear
        }} 
      />
    </MapContainer>
  );
}

//************************ Main App Component  ***************************************************

function App() {
  const mapCenter = [37.3785, -122.0311];  //This is the center of the map on startup
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [boundingBoxMiles, setBoundingBoxMiles] = React.useState(1); 
  //Start with all the rental properties as default
  const [filteredRentalProperties, setFilteredRentalProperties] = React.useState(rentalProperties);
  const [latHigh, setLatHigh] = React.useState(mapCenter[0] + (boundingBoxMiles / 69));
  const [latLow, setLatLow] = React.useState(mapCenter[0] - (boundingBoxMiles / 69));
  const [lonLeft, setLonLeft] = React.useState(mapCenter[1] + (boundingBoxMiles / 53.0));
  const [lonRight, setLonRight] = React.useState(mapCenter[1] - (boundingBoxMiles / 53.0));



  //When given a location, make abounding box.
  function handlePropertyClick(selectedLocation) {
    setLatHigh(selectedLocation.coordinates[0] + (boundingBoxMiles / 69));
    setLatLow(selectedLocation.coordinates[0] - (boundingBoxMiles / 69));

    setLonLeft(selectedLocation.coordinates[1] + (boundingBoxMiles / 53.0));
    setLonRight(selectedLocation.coordinates[1] - (boundingBoxMiles / 53.0));
    //Now filter the rental properties that are within the bounding box.

   console.log("latLow:", latLow, "latHigh:", latHigh, "lonLeft:", lonLeft, "lonRight:", lonRight);


    setFilteredRentalProperties(rentalProperties.filter(property => {
      const propertyLat = property.coordinates[0];
      const propertyLon = property.coordinates[1];
      return propertyLat >= latLow && propertyLat <= latHigh && propertyLon >= lonLeft && propertyLon <= lonRight;
    }));
    console.log("filteredProperties: from handleLocationSelect", filteredRentalProperties);
  };


  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: '1', margin: '10px' }}>
        <strong>Investment Property Finder</strong><br></br>
        <FilterAndFinanceOptions />
        <LeafletMap 
          investmentLocations={investmentLocations} 
          rentalProperties={rentalProperties}
          onLocationSelect={handleLocationSelect}
          handlePropertyClick={handlePropertyClick}
          latHigh={latHigh}
          latLow={latLow}
          lonLeft={lonLeft}
          lonRight={lonRight}
        />
      </div>
      <div style={{ width: '300px' }}>

        <SideBar selectedLocation={selectedLocation} filteredRentalProperties={filteredRentalProperties}/>

      </div>
    </div>
  );
}

export default App;
