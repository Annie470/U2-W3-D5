const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzM1MDc4Y2RkZjAwMTU1ZDY3YTIiLCJpYXQiOjE3NTIyMjA0OTYsImV4cCI6MTc1MzQzMDA5Nn0.Lvu4km7XuEgz6ScaC2KdqPnjafvKZZ4_3-ryIXJyk0U";
const parameters = new URLSearchParams(location.search);
const eventId = parameters.get("eventId");

if (eventId) {
  fetch(endpoint + "/" + eventId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Houston, la torre non riesce a gestire l'elemento`);
      }
    })
    .then((data) => {
      document.getElementById("imageUrl").value = data.imageUrl;
      document.getElementById("name").value = data.name;
      document.getElementById("description").value = data.description;
      document.getElementById("brand").value = data.brand;
      document.getElementById("price").value = data.price;
    })
    .catch((err) => {
      console.log(err);
    });
}

// prodottttoo
class Prodotto {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInp = document.getElementById("name");
  const descriptionInp = document.getElementById("description");
  const brandInp = document.getElementById("brand");
  const imageUrlInp = document.getElementById("imageUrl");
  const priceInp = document.getElementById("price");

  const salvataggio = new Prodotto(
    nameInp.value,
    descriptionInp.value,
    brandInp.value,
    imageUrlInp.value,
    priceInp.value
  );

  let putORpost;
  if (eventId) {
    putORpost = "PUT";
  } else {
    putORpost = "POST";
  }

  //SUPER OPERATORE TERNARIO IN AZIONE !!!
  fetch(eventId ? endpoint + "/" + eventId : endpoint, {
    method: putORpost,
    body: JSON.stringify(salvataggio),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Houston, dalla torre confermiamo sia tutto OK!");
        form.reset();
      } else {
        throw new Error(
          `Houston, abbiamo un problema! Status: ${response.status}`
        );
      }
    })
    .catch((err) => {
      alert("Ops!");
      console.log("Ops!", err);
    });
});
