const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzM1MDc4Y2RkZjAwMTU1ZDY3YTIiLCJpYXQiOjE3NTIyMjA0OTYsImV4cCI6MTc1MzQzMDA5Nn0.Lvu4km7XuEgz6ScaC2KdqPnjafvKZZ4_3-ryIXJyk0U";

console.log(location.search);
const parameters = new URLSearchParams(location.search);
const eventId = parameters.get("eventId");

fetch(endpoint + eventId, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Huston, atterraggio non riuscito..");
    }
  })
  .then((prodotto) => {
    const cardContainer = document.getElementById("card-container");
    const imageUrl = prodotto.imageUrl;
    cardContainer.innerHTML = `
      <div class="card m-small">
        <img src="${imageUrl}" alt="product photo" />
        <h3 class="my-small">${prodotto.name}</h3>
        <p class="my-small p-small">${prodotto.description}</p>
        <p class="my-small p-small">${prodotto.brand}</p>
        <p class="my-small">${prodotto.price}€</p>
        <button onclick="dismorfismo('${prodotto._id}')" class="my-small" style="width: 80px">Riforma</button>
        <button onclick="addio()" class="my-small" style="width: 80px">Stermina</button>
      </div>
    `;
  })
  .catch((err) => {
    console.log(err);
  });

const dismorfismo = function () {
  location.assign("/backoffice.html?eventId=" + eventId);
};

const addio = function () {
  fetch(endpoint + eventId, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert(`Houston, la torre conferma l'eliminazione`);
        location.assign("/index.html");
      } else {
        throw new Error("Houston, il prodotto è troppo resistente! Persiste");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
