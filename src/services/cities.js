import { ajax } from "../tools/ajax";

export const getCities = async countryCode => {
  const optionsRequest = {
    method: "GET",
    url: 'https://spott.p.rapidapi.com/places',
    headers: {
        'X-RapidAPI-Key': '7c1570ebfemsh5f0128d68acf952p19ebedjsnd4e53b8f5239',
        'X-RapidAPI-Host': 'spott.p.rapidapi.com'
    },
    params: {
      limit: '15',
      type: "CITY",
      country: countryCode ?? "SP",
    },
  };
  return await ajax(optionsRequest);
}
