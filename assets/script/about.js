const btn = document.querySelector("button");
btn.addEventListener("click", () => followTheWhiteRabbit());

const followTheWhiteRabbit = () => {
  const rabbit = {
    contact: "annie.disaster",
    other: "10111111000001101100111110101011",
  };
  localStorage.setItem("WithLove", JSON.stringify(rabbit));
};
