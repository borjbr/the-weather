import { ajax } from "../tools/ajax";

export const getCityWeather = async city => {
  const optionsRequest = {
    method: "GET",
    url: 'https://api.openweathermap.org/data/2.5/weather?&appid=3c3d64ef7eec4a7b8dd86cf8637f6d57',
    params: {
      q: city,
      appid: "3c3d64ef7eec4a7b8dd86cf8637f6d57",
      units: "metric"
    },
  };
  return await ajax(optionsRequest);
}
