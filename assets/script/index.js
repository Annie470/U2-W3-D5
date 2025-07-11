const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzM1MDc4Y2RkZjAwMTU1ZDY3YTIiLCJpYXQiOjE3NTIyMjA0OTYsImV4cCI6MTc1MzQzMDA5Nn0.Lvu4km7XuEgz6ScaC2KdqPnjafvKZZ4_3-ryIXJyk0U";

const caricaCard = function () {
  fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          `Houston abbiamo un problema! Codice: ${response.status}`
        );
      }
    })
    .then((array) => {
      const spinner = document.getElementById("spinnerino");
      spinner.style.display = "none";

      const cardContainer = document.getElementById("card-container");
      if (array.length === 0) {
        cardContainer.innerHTML = `
         <h1>Nessun ZillaCats disponibile sul mercato...</h1>
        `;
      } else {
        array.forEach((prodotto) => {
          cardContainer.innerHTML += `
          <div class="card m-small">
          <img onclick="allArrembaggio('${prodotto._id}')" src="${prodotto.imageUrl}" alt="product photo" />
          <h3 class="my-small">${prodotto.name}</h3>
          <p class="my-small p-small">${prodotto.description}</p>
          <p class="my-small">${prodotto.brand}</p>
          <p class="my-small">${prodotto.price}€</p>
          <button onclick="allArrembaggio('${prodotto._id}')" class="my-small" style="width: 80px">Dettagli</button>
        <button onclick="dismorfismo('${prodotto._id}')" class="my-small" style="width: 80px">Riforma</button>
          </div>`;
        });
      }
    })
    .catch((err) => {
      alert(err.message);
    });
};
const allArrembaggio = function (Id) {
  window.location.href = `./detail.html?eventId=${Id}`;
};
caricaCard();

const dismorfismo = function (Id) {
  location.assign(`./backoffice.html?eventId=${Id}`);
};

const span = document.getElementById("anno");
span.innerText = new Date().getFullYear();
