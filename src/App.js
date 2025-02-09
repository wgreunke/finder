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
    coordinates: [37.3785, -122.0311],
    type: 'house'
  },
  {
    name: 'Sunnyvale Public Library',
    coordinates: [37.3686, -122.0365],
    type: 'apartment'
  },

  {
    name: 'Sunnyvale Heritage Park Museum',
    coordinates: [37.3842, -122.0184],
    type: 'house'
  },


  {
    name: 'Sunnyvale Community Center',
    coordinates: [37.3681, -122.0382],
    type: 'house'
  },

  {
    name: 'Apple Park',
    coordinates: [37.3349, -122.0090],
    type: 'apartment'
  },

  {
    name: 'Las Palmas Park',
    coordinates: [37.3642, -122.0280],
    type: 'house'
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
      <h1>Investment Filter</h1>
{/* Add a container div for the input fields */}
<div style={{ display: 'flex', alignItems: 'center' }}>
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
  {/* Add a dropdown for property type */}
  <p style={{ margin: '5px' }}>Property Type: </p>
  <select 
    style={{ margin: '5px' }} 
    value={propertyType} 
    onChange={(e) => setPropertyType(e.target.value)}
  >
    <option value="apartment">Apartment</option>
    <option value="house">House</option>
    <option value="commercial">Commercial</option>
  </select>
</div>


{/* Add a container div for the finance options */}
<h1>Finance Options</h1>
<div style={{ display: 'flex', alignItems: 'center' }}>
  <p style={{ margin: '5px' }}>Down Payment Amount: </p>
  <input 

    type="text" 
    placeholder="Down Payment Amount" 
    style={{ margin: '5px' }} 
    value={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(downPayment)} 
    onChange={(e) => setDownPayment(parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0)} 
  />
  
  {/* Add a textbox for interest rate */}
  <p style={{ margin: '5px' }}>Interest Rate (%): </p>
  <input 
    type="text" 
    placeholder="Interest Rate" 
    style={{ margin: '5px' }} 
    value={filterAndFinanceData.financialOptions.defaultInterestRate} 
    onChange={(e) => {/* Handle change here if needed */}}
  />

  {/* Add a textbox for bounding box miles */}
  <p style={{ margin: '5px' }}>Bounding Box Miles: </p>
  <input 
    type="text" 
    placeholder="Bounding Box Miles" 
    style={{ margin: '5px' }} 
    value={filterAndFinanceData.financialOptions.defaultBoundingBoxMiles} 
    onChange={(e) => {/* Handle change here if needed */}}
  />
</div>



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
      <h2>Rental Comps</h2>
      <p>The following rental properties are used to calucate the value of the target investment property.</p>
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
        <h2>Target Investment </h2>
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



function LeafletMap({ investmentLocations = [], rentalProperties = [], onLocationSelect, handlePropertyClick, latNorth, latSouth, lonWest, lonEast}) {



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
          [latSouth, lonWest], // Upper left corner
          [latNorth, lonEast] // Lower right corner (adjusted for visibility)
        ]}





        pathOptions={{ 
          color: 'blue', // Set the rectangle color to blue
          fillOpacity: 0 // Make the inside of the rectangle clear
        }} 
      />
    </MapContainer>
  );
}

function InvestmentComparsion({ tempa, tempb }) {
  // This function calculates the investment comparison between two properties.
  // It takes two objects as arguments, each representing a property.
  // The function returns an object containing the calculated values.
  
  tempa = Number(tempa);
  tempb = Number(tempb);

  return (
      <div>
          <h1>Debug for investment comparison</h1>
          <p>Sum of tempa and tempb: {tempa + tempb}</p>
      </div>
  );
}

//************************ Main App Component  ***********************************

function App() {
  const mapCenter = [37.3785, -122.0311];  //This is the center of the map on startup
  const [selectedLocation, setSelectedLocation] = React.useState(null);
  const [boundingBoxMiles, setBoundingBoxMiles] = React.useState(1); 
  //Start with all the rental properties as default
  const [filteredRentalProperties, setFilteredRentalProperties] = React.useState(rentalProperties);
  const [latNorth, setLatNorth] = React.useState(mapCenter[0] + (boundingBoxMiles / 69));
  const [latSouth, setLatSouth] = React.useState(mapCenter[0] - (boundingBoxMiles / 69));
  const [lonWest, setLonWest] = React.useState(mapCenter[1] - (boundingBoxMiles / 53.0));
  const [lonEast, setLonEast] = React.useState(mapCenter[1] + (boundingBoxMiles / 53.0));


  //When given a location, make abounding box.
  //Caution, There be dragons here.  I was clicking on the map and it was not updating the bounding box.
  //Just because you set LatNorth and other values, does not mean they were availible for use right away.
  //Using temp values to make sure the filter works.
  function handlePropertyClick(selectedLocation) {
    const newLatNorth = selectedLocation.coordinates[0] + (boundingBoxMiles / 69);
    const newLatSouth = selectedLocation.coordinates[0] - (boundingBoxMiles / 69);
    const newLonWest = selectedLocation.coordinates[1] - (boundingBoxMiles / 53.0);
    const newLonEast = selectedLocation.coordinates[1] + (boundingBoxMiles / 53.0);

    // Now filter the rental properties that are within the bounding box.
    console.log("latNorth:", newLatNorth, "latSouth:", newLatSouth, "lonWest:", newLonWest, "lonEast:", newLonEast);

    setLatNorth(newLatNorth);
    setLatSouth(newLatSouth);
    setLonWest(newLonWest);
    setLonEast(newLonEast);

    setFilteredRentalProperties(rentalProperties.filter(property => {
      const propertyLat = property.coordinates[0];
      const propertyLon = property.coordinates[1];
      return propertyLat >= newLatSouth && propertyLat <= newLatNorth && propertyLon >= newLonWest && propertyLon <= newLonEast;
    }));

    console.log("filteredProperties: from handleLocationSelect", rentalProperties);
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
          latNorth={latNorth}
          latSouth={latSouth}
          lonWest={lonWest}
          lonEast={lonEast}
        />
<InvestmentComparsion tempa={1} tempb={2} />


<h2>Debugging</h2>
      <h3>latNorth: {latNorth}</h3>
      <h3>latSouth: {latSouth}</h3>
      <h3>lonWest: {lonWest}</h3>
      <h3>lonEast: {lonEast}</h3>


      {filteredRentalProperties.map((property, index) => (
        <p key={index}>{property.name} {property.coordinates}</p>
      ))}

      </div>
      
      <div style={{ width: '300px' }}>

        <SideBar selectedLocation={selectedLocation} filteredRentalProperties={filteredRentalProperties}/>

      </div>


    </div>
  );
}

export default App;
