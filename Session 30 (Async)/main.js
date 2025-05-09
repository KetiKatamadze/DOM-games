const cardContainer = document.getElementById("cards-container");
const modal = document.querySelector(".modal");

const asia = document.getElementById("asia");
const africa = document.getElementById("africa");
const australia = document.getElementById("australia");
const northAmerica = document.getElementById("northAmerica");
const southAmerica = document.getElementById("southAmerica");
const europe = document.getElementById("europe");
const searchInput = document.getElementById("search-bar");

let allData = [];

function closeModal() {
  modal.style.display = "none";
  modal.innerHTML = "";
}

function createModal(countries) {
  modal.innerHTML = "";
  modal.style.display = "block";
  const modalFlag = document.createElement("img");
  modalFlag.classList.add("flag");
  modalFlag.style.filter = "none";
  modalFlag.src = countries.flags.png;

  const modalTxt = document.createElement("div");
  modalTxt.classList.add("text-content");
  modalTxt.style.filter = "none";

  const modalName = document.createElement("h2");
  modalName.classList.add("countryName");
  modalName.style.fontSize = "30px";
  modalName.innerHTML = `Common: ${countries.name.common}`;

  const modalFullName = document.createElement("h2");
  modalFullName.classList.add("countryName");
  modalFullName.style.fontSize = "30px";
  modalFullName.innerHTML = `Official: ${countries.name.official}`;

  const modalPopulation = document.createElement("span");
  modalPopulation.innerHTML = `Population: ${countries.population}`;

  const modalRegion = document.createElement("span");
  modalRegion.innerHTML = `Region: ${countries.region}`;

  const modalCapital = document.createElement("span");
  modalCapital.innerHTML = `Capital: ${countries.capital}`;

  const modalContinent = document.createElement("span");
  modalContinent.innerHTML = `Continent: ${countries.continents}`;

  modal.appendChild(modalFlag);
  modal.appendChild(modalTxt);
  modalTxt.appendChild(modalName);
  modalTxt.appendChild(modalFullName);
  modalTxt.appendChild(modalPopulation);
  modalTxt.appendChild(modalRegion);
  modalTxt.appendChild(modalCapital);
  modalTxt.appendChild(modalContinent);
}

const createCard = (countries) => {
  const cardWrapper = document.createElement("div");
  cardWrapper.classList.add("card-wrapper");

  const flag = document.createElement("img");
  flag.classList.add("flag");
  flag.src = countries.flags.png;

  const txt = document.createElement("div");
  txt.classList.add("text-content");

  const countryName = document.createElement("h2");
  countryName.classList.add("countryName");
  countryName.innerHTML = countries.name.common;

  const population = document.createElement("span");
  population.innerHTML = `Population: ${countries.population}`;

  const region = document.createElement("span");
  region.innerHTML = `Region: ${countries.region}`;

  const capital = document.createElement("span");
  capital.innerHTML = `Capital: ${countries.capital}`;

  const button = document.createElement("button");
  button.classList.add("open");
  button.textContent = "OPEN";

  cardWrapper.appendChild(flag);
  cardWrapper.appendChild(txt);
  cardWrapper.appendChild(button);

  txt.appendChild(countryName);
  txt.appendChild(population);
  txt.appendChild(region);
  txt.appendChild(capital);

  button.addEventListener("click", () => createModal(countries));
  modal.addEventListener("click", closeModal);
  return cardWrapper;
};

const cardContent = (countries) => {
  countries.map((country) => {
    const card = createCard(country);
    cardContainer.appendChild(card);
  });
};

country();

function filterCards(newCountries) {
  cardContainer.innerHTML = "";
  cardContent(newCountries);
}

function setupContinentFilter(btn, continentName) {
  btn.addEventListener("click", () => {
    const filtered = allData.filter((country) =>
      country.continents.includes(continentName)
    );
    filterCards(filtered);
  });
}

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const searchValue = searchInput.value.toLowerCase();
    const searcCountry = allData.filter((country) =>
      country.name.common.toLowerCase().includes(searchValue)
  );
  const results = searcCountry;
  cardContainer.innerHTML = "";
  cardContent(results);
  searchInput.value = ""
  searchInput.placeholder = "Search..."
  }
});

setupContinentFilter(asia, "Asia");
setupContinentFilter(africa, "Africa");
setupContinentFilter(northAmerica, "North America");
setupContinentFilter(southAmerica, "South America");
setupContinentFilter(australia, "Oceania");
setupContinentFilter(europe, "Europe");

async function country() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    allData = data;
    cardContent(allData);
  } catch (err) {
    console.log("Error:", err);
  }
}

country();

// function country() {
//   let promise = new Promise((resolve, reject) => {
//     fetch("https://restcountries.com/v3.1/all")
//       .then(response => response.json())
//       .then(data => resolve(data))
//       .catch(err => reject(err));
//   });

//   promise
//     .then(data => cardContent(data))
//     .catch(error => console.error("Error:", error));
// }

// country()
