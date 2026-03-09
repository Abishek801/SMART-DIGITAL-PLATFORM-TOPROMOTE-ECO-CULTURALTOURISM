import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const ecoLocations = [
  { name: "Ooty", lat: 11.4064, lng: 76.6932 },
  { name: "Munnar", lat: 10.0889, lng: 77.0595 },
  { name: "Coorg", lat: 12.3375, lng: 75.8069 },
];

function EcoMap() {

  const center = ecoLocations[0];

  return (
    <LoadScript googleMapsApiKey="AIzaSyD7f8sd7f87sd8f7sd8f7sd87f">

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={6}
      >

        {ecoLocations.map((place, index) => (

          <Marker
            key={index}
            position={{ lat: place.lat, lng: place.lng }}
          />

        ))}

      </GoogleMap>

    </LoadScript>
  );
}

export default EcoMap;