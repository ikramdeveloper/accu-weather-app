const key = "add your key";

const getWeather = async (id) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;

  const resp = await fetch(base + query);
  const data = await resp.json();
  return data[0];
};

const getCity = async (city) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const resp = await fetch(base + query);
  const data = await resp.json();
  return data[0];
};
