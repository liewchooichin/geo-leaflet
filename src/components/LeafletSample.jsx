import myStyles from "./myStyles.module.css";
import { useState, useEffect } from "react";
import { MapContainer , TileLayer, useMap, Marker, Popup, GeoJSON } 
  from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { circleMarker } from 'leaflet';

export function LeafletSample(){
  
  const [coordinates, setCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [geoData, setGeoData] = useState(null);
  // sample
  
  // handle marker in the map
  function handleEachFeature(feature, layer){
    if(feature.properties && feature.properties.Name){
      // format the popup content
      const popupContent = (
        <>
          <p>Name: {feature.properties.Name}</p>
          {/* {feature.properties.Description} */}
        </>
      )
      layer.bindPopup(feature.properties.Description);
    }
  }
  function handlePointToLayer(feature, latlng){
    return L.circleMarker(latlng, geojsonMarkerOptions);
  }
  const geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };

  async function getMapCoordinate(){
    try{
      const filename = "/tanjongpagar.json";
      setIsLoading(true);
      const response = await fetch(filename);
      const data = await response.json();
      console.log("Data ", data["DD"].lat, data["DD"].lng);
      setCoordinates(data["DD"]);
    } 
    catch(error){
      console.error(error);
    } 
    finally{
      setIsLoading(false);
      console.log("Get data");
    }
  }
  async function getGeoJsonData(){
    try{
      const filename = "/StreetandPlaces.geojson";
      setIsLoading(true);
      const response = await fetch(filename);
      const data = await response.json();
      console.log("Data len ", data["features"].length);
      setGeoData(data);
    } 
    catch(error){
      console.error(error);
    } 
    finally{
      setIsLoading(false);
      console.log("Get data");
    }
  }
  // Fetch coordinates
  useEffect(()=>{
    let ignore = false;
    // setup
    if(!ignore){
      getMapCoordinate();
    }
    // clean up
    return(()=>{ignore=true; console.log("clean up")})
  }, [])

    // Fetch coordinates
    useEffect(()=>{
      let ignore = false;
      // setup
      if(!ignore){
        getGeoJsonData();
      }
      // clean up
      return(()=>{ignore=true; console.log("clean up")})
    }, [])
  

  return(
    <>
    {
      (isLoading && (<p>Loading</p>))
    }
    {
      ((coordinates!=null && geoData && !isLoading) && (
        <div /* id={myStyles.map} */>
        <p>Lat {coordinates.lat}, Lng {coordinates.lng}</p>

        <MapContainer 
          center={coordinates} zoom={13} 
          scrollWheelZoom={true} 
          style={{width:"100vh", height:"100vh"}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates}>
        <Popup>
          Tanjong Pagar<br /> Center of the map
        </Popup>
        </Marker>
        <GeoJSON 
          key={JSON.stringify(geoData.features)}
          data={geoData}
          onEachFeature={handleEachFeature}
          pointToLayer={handlePointToLayer}
        ></GeoJSON>
        </MapContainer>
        </div>
      ))
    }
    </>
  )
}