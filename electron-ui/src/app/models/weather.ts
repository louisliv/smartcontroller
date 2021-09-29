interface Weather {
  main: string;
  description: string;
  icon: string;
}

interface WeatherInfo {
  dt: number;
  weather: Weather[];
  pop?: number;
}

interface HourlyWeather extends WeatherInfo {
  temp: number;
}

interface DailyWeather extends WeatherInfo {
  temp: {
    min: number;
    max: number
  };
}

export default interface CurrentWeather {
  lat: number;
  lon: number;
  current: HourlyWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}

