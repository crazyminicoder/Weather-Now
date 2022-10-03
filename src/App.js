
import { useEffect, useState } from 'react';
import { Dna } from 'react-loader-spinner';
import './App.css';
import { getData } from './weatherServices';

function App() {

const[data, setData]=useState([]);
const[error, setError]=useState(null);
const[loadin,setLoading]=useState(true);
const[city,setCity]=useState("London");
const[units, setUnits]=useState("Standard");
const[icon,setIcon]=useState("K")
const[tempIcon, setTempIcon]=useState('./images/Rainy.png');
const[weatherDes,setWeatherDes]=useState("");



useEffect(()=>{
  async function init(){
    try{
      const response =await getData({city,units});
      setData(response);
      console.log(response);
      setLoading(false);
    }
    catch (e){
      setError(e);
    }

  }
  init();
  checkForIcon();
},[city,units])

const checkForIcon =() =>{
  if(units === "Standard"){
    setIcon("K")
  }
  else if(units === "Metric"){
    setIcon("c")
  }
  else {
    setIcon("F")
  }
}





const{base}=data;
const{main}=data;
const {weather}=data
const{name}=data;
const{wind}=data;
const{clouds}=data;
const{rain}=data;
const{main:{temp} = {}}=data || {};
console.log(temp);
const{coord:{lat}={}}=data || {};
console.log(lat);

  return (
    <div className="App">
{loadin ? <Dna/> :(
  <div>
     <div className='header'>
  <div className='header_left'>
  <img src='./images/Logo.png'></img>
  </div>
  <div className='header_right'>
    <a href='https://github.com/crazyminicoder'><h2>Github</h2></a>
  </div>
 </div>

 <div className='main_body'>
  <div className='search_bar'>
    <input type="text" placeholder='Search city'  onChange={(e)=>setCity(e.target.value) && setLoading(true)} ></input>
  </div>
  <div className='units'>
    <select onChange={(e)=>{
      const value=e.target.value;
      setUnits(value);
    }}>
      <option value="Standard">Kelvin</option>
      <option value="Metric">Celsius</option>
      <option value="Imperial">Fahrenheit</option>
    </select>
  </div>
  <div className='temp'>
      <div className='temp_left'>
          <h1>{main.temp} {icon}</h1>
      </div>

    
  </div>
  <div className='temp_info'>
    <h2 id='two'>{name}</h2>
    <h3>Real Feels</h3>
    <h2>{main.feels_like} {icon}</h2>
    <h3 id='one'>{weather[0].description}</h3>
  </div>
  <div className='other_info'>
    <div className='temp_min'>
      <div className='tm_left'><img src='./images/temp_min.png'></img></div>
      <div className='tm_middle'><h3>Temp Min</h3></div>
      <div className='tm_right'>{main.temp_min} {icon}</div>
      
      
    </div>
    <div className='pressure'>
    <div className='tm_left'><img src='./images/pressure.png'></img></div>
      <div className='tm_middle'><h3>Pressure</h3></div>
      <div className='tm_right'>{main.pressure} Mills</div>
      
    </div>
    <div className='wind_speed'>
    <div className='tm_left'> <img src='./images/wind_speed.png'></img></div>
      <div className='tm_middle'><h3>Wind Speed</h3></div>
      <div className='tm_right'>{wind.speed} m/s</div>
     
    </div>
    <div className='temp_max'>
    <div className='tm_left'><img src='./images/temp_max.png'></img></div>
      <div className='tm_middle'><h3>Temp Max</h3></div>
      <div className='tm_right'>{main.temp_max} {icon}</div>
      
    </div>
    <div className='humidity'>
    <div className='tm_left'><img src='./images/humidity.png'></img></div>
      <div className='tm_middle'><h3>Humidity</h3></div>
      <div className='tm_right'>{main.humidity} g.kg-1</div>
      
    </div>
    <div className='clouds'>
    <div className='tm_left'> <img src='./images/clouds_oi.png'></img></div>
      <div className='tm_middle'><h3>Clouds</h3></div>
      <div className='tm_right'>{clouds.all}%</div>
     
    </div>
    <div className='rain_time'>
    <div className='tm_left'><img src='./images/rain_time.png'></img></div>
      <div className='tm_middle'><h3>Rain Time</h3></div>
      <div className='tm_right'>22</div>
      
    </div>
    <div className='volume'>
    <div className='tm_left'><img src='./images/volume.png'></img></div>
      <div className='tm_middle'><h3>Volume</h3></div>
      <div className='tm_right'>NAN</div>
      
    </div>
  </div>

 </div>
  </div>
)}
 
 
     
    </div>
    
  );
}

export default App;
