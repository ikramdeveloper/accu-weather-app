class Forecast {
  constructor() {
    this.key = "add your key";
    this.weatherURI =
      "http://dataservice.accuweather.com/currentconditions/v1/";
    this.cityURI =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
  }

  async updateCity(city) {
    const cityDets = await this.getCity(city);
    const weather = await this.getWeather(cityDets.Key);

    return { cityDetails: cityDets, weather };
  }

  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;

    const data = await (await fetch(this.weatherURI + query)).json();

    return data[0];
  }

  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;

    const data = await (await fetch(this.cityURI + query)).json();

    return data[0];
  }
}
