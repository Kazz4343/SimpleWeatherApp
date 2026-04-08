import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { MdWaterDrop } from "react-icons/md";
import { TiWeatherWindyCloudy } from "react-icons/ti";

function App() {
  const [ city, setCity ] = useState("");
  const [ cityData, setCityData ] = useState("");
  const API_KEY = '' //put Key from OpenWeather here
  const LINK = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

  const handleFetch = async (e) => {
    e.preventDefault()

    const res = await fetch(LINK);
    const data = await res.json()
    console.log(data)
    setCityData(data)
    setCity("")

  };

  const dynamicIcons = () => {
    const weather = cityData?.weather?.[0]?.main;
    console.log(weather)
    
    switch (weather) {
      case 'Clear':
        return <img src="/src/sun.png" alt="Sun" width={200} className="mt-15"/>;
      case 'Snow':
        return <img src="/src/snow.png" alt="Snow" width={200} className="mt-15"/>;
      case 'Rain':
        return <img src="/src/rainy-day.png" alt="Rain" width={200} className="mt-15"/>;
      case 'Thunderstorm':
        return <img src="/src/thunderstrom.png" alt="ThunderStorm" width={200} className="mt-15"/>;
      case 'Clouds':
        return <img src="/src/clouds.png" alt="Clouds" width={200} className="mt-15"/>;
      default:
        return <img src="/src/sun.png" alt="Sun" width={200} className="mt-15"/>;
    }
  }

  return (
    <div className="bg-linear-to-b from-cyan-500 to-cyan-800 p-10 rounded-2xl flex items-center flex-col w-[90%] m-auto">
      <form className="flex gap-2.5 w-full items-center" onSubmit={handleFetch}>
        <input 
          type='text' 
          placeholder="City" 
          className="bg-mist-300 text-black p-2.5 border-0 rounded-lg grow"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button 
          className="bg-white p-1 w-10 h-10 rounded-lg border-0 flex justify-center items-center font-medium cursor-pointer"
          type="submit"
        >
          <IoMdSearch />
        </button>
      </form>
      {dynamicIcons()}
      <p className="text-white text-[8rem]">{cityData?.main?.temp}°C</p>
      <p className="text-white text-[3rem]">{cityData?.name}</p>
      <div className="flex justify-between text-white w-full mt-20">
        <div className="flex gap-2.5 items-center">
          <MdWaterDrop className=" text-[2rem]"/>
          <div>
            <p className="font-bold">{cityData?.main?.humidity}</p>
            <p>Humidity</p>
          </div>
        </div>
         <div className="flex gap-2.5 items-center">
          <TiWeatherWindyCloudy className=" text-[2rem]" />
          <div>
            <p className="font-bold">{cityData?.wind?.speed}</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;