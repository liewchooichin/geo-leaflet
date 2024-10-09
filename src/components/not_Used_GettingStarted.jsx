import myStyles from "./myStyles.module.css";
import { useState, useEffect } from "react";
import {ComposableMap, Geographies, Geography} from "react-simple-maps";


export function GettingStarted(){

  const [geoData, setGeoData] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // sample
  
  async function getMapCoordinate(){
    try{
      const filename = "/tanjongPagar.json";
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
  async function getGeoJson(){
    try{
      const filename = "/LTARoadCamera.geojson";
      setIsLoading(true);
      const response = await fetch(filename);
      const data = await response.json();
      setGeoData(data);
    } 
    catch(error){
      console.error(error);
    } 
    finally{
      setIsLoading(false);
      console.log("Get geo json data");
    }
  }
  // Fetch coordinates
  useEffect(()=>{
    let ignore = false;
    // setup
    if(!ignore){
      getMapCoordinate();
      getGeoJson();
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
      (((coordinates!=null) && (geoData!=null) && !isLoading) && (
        <>
        <p>Lat {coordinates.lat}, Lng {coordinates.lng}</p>

        <ComposableMap>
          <Geographies geography={geoData}>
          {
            (
              {geographies})=>(
                geographies.map((geo)=>(
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            )
          }
          </Geographies>
        </ComposableMap>

        </>
      ))
    }
    </>
  )
}