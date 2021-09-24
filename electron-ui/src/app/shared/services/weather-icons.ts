import {
  faSun,
  faMoon,
  faCloudSun,
  faCloudMoon,
  faCloud,
  faCloudRain,
  faCloudShowersHeavy,
  faBolt,
  faWind,
  faQuestion
} from "@fortawesome/free-solid-svg-icons";

import {
  faSnowflake
} from "@fortawesome/free-regular-svg-icons";

export const WeatherIcons = {
  "01d": faSun,
  "01n": faMoon,
  "02d": faCloudSun,
  "02n": faCloudMoon,
  "03d": faCloudSun,
  "03n": faCloudMoon,
  "04d": faCloud,
  "04n": faCloud,
  "09d": faCloudRain,
  "09n": faCloudRain,
  "10d": faCloudShowersHeavy,
  "10n": faCloudShowersHeavy,
  "11d": faBolt,
  "11n": faBolt,
  "13d": faSnowflake,
  "13n": faSnowflake,
  "50d": faWind,
  "50n": faWind,
  "unknown": faQuestion
}
