import './App.css';
import React, { useEffect, useState } from "react";
import Weather from './components/weather';
import { Dimmer, Loader } from 'semantic-ui-react';
export default function App() {

  //creation of a state for the latitude
  const [lat, setLat] = useState([]);
  //creation of a state for the longitude
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  //the useEffect function is to load the functions when the web page is loaded and reloaded
  useEffect(() => {
    const fetchData = async () => {
      //we get our longitude and latitude using navigator.geolocation
      navigator.geolocation.getCurrentPosition(function (position) {
        //We use setLat and setLong to get our latitude and longitude
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      //In this function, we are using a fetch call to get the data from the API.Look at ".env"
      await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          //we use setData to store our result into the data object
          setData(result)
          //Displays the result in the console of your web browser
          console.log(result);
        });
    }
    fetchData();
  }, [lat, long])
// Before this step, we need to create a weather component, Look in the components folder.
  return (
    <div className="App">
      {(typeof data.main != 'undefined') ? (
        <Weather weatherData={data} />
      ) : (
        <div>
          <Dimmer active>
            <Loader>Loading.. Besong's WeatherApp wait</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
}
