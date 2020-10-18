import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
import { async } from "q";

//it is the API_KEY from open weather site
const API_KEY = "bea188da77ccaddf3999efee269d5738";


class App extends React.Component
{

  //We are maintaining the state for various feilds 
  state = {
    temprature : undefined,
    city : undefined,
    country : undefined,
    humidity : undefined,
    description : undefined,
    error : undefined
  }

  getWeather = async (e) => {
    e.preventDefault();
    //We are getting values from the JSON object which is came from weather website through API call
    const city  = e.target.elements.city.value;
    const country  = e.target.elements.country.value;
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);
    const data = await api_call.json();
    
    if(city && country)
    {
      console.log(data);

      this.setState({
        temprature : data.main.temp,
        city : data.name,
        country : data.sys.country,
        humidity : data.main.humidity,
        description : data.weather[0].description,
        error : ""
      })
    }
    else
    {
      console.log(data);

      this.setState({
        temprature : undefined,
        city : undefined,
        country : undefined,
        humidity : undefined,
        description : undefined,
        error : "Please Enter the Value"
      })
    }
  }
  
  //render() is used to display content to the webpage
  //render() should return only one parent element
  render(){

    return(
      <div>
        <div className = "wrapper">
          <div className = "main">
            <div className = "container">
              <div className = "row">
                <div className = "col-xs-5 title-container">
                  <Titles />
                </div>
                <div className = "col-xs-7 form-container">
                  {/* this is comment in jsx 
                    We are passing function as props to Form Component*/ }
                  <Form getWeather = {this.getWeather}/>
                  {/*We are passing props to Weather Component */}
                  <Weather 
                    temprature = {this.state.temprature}
                    city = {this.state.city}
                    country = {this.state.country}
                    humidity = {this.state.humidity}
                    description = {this.state.description}
                    error = {this.state.error}
                   />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


        



export default App;