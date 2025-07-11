const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYzM1MDc4Y2RkZjAwMTU1ZDY3YTIiLCJpYXQiOjE3NTIyMjA0OTYsImV4cCI6MTc1MzQzMDA5Nn0.Lvu4km7XuEgz6ScaC2KdqPnjafvKZZ4_3-ryIXJyk0U";

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

  fetch(endpoint, {
    method: "POST",
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
        throw new Error("Houston, abbiamo un problema!", response.status);
      }
    })
    .catch((err) => {
      alert("Ops!");
      console.log("Ops!", err);
    });
});
