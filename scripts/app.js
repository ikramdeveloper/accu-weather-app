const cityForm = document.querySelector(".change-location");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const timeImg = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = async ({ cityDetails, weatherDetails }) => {
  details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
          <div class="my-3">${weatherDetails.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weatherDetails.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
          </div>
    `;

  const iconSrc = `img/icons/${weatherDetails.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = weatherDetails.IsDayTime ? "img/day.svg" : "img/night.svg";
  timeImg.setAttribute("src", timeSrc);

  card.classList.remove("d-none");
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weatherDetails = await getWeather(cityDetails.Key);

  return { cityDetails, weatherDetails };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  localStorage.setItem("city", city);
});

if (localStorage.city) {
  updateCity(localStorage.city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
