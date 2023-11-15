function loadWebsite() {
  pullHeader();
  pullArtists();
  descriptionPopUp();
}

function pullHeader() {
  let navigation = document.getElementById("navigation");
  let string = "";
  for (let item of hoofdNav) {
    if (item.type !== "external") {
      string += `<a href="${item.link}">${item.name}</a>`;
    } else {
      string += `<a href="${item.link}" target="_blank">${item.name}</a>`;
    }
  }
  navigation.innerHTML = string;
}

function pullArtists() {
  let artistsContainer = document.getElementById("artists");
  let htmlString = "";

  for (let item of lineup) {
    function from(timestamp) {
      const date = new Date(timestamp);

      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);

      return `${day}/${month} ${hours}.${minutes}`;
    }

    const timeFrom = item.from;
    const formattedFrom = to(timeFrom);

    function to(timestamp) {
      const date = new Date(timestamp);

      const day = ("0" + date.getDate()).slice(-2);
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);

      return `${day}/${month} ${hours}.${minutes}`;
    }

    const timeTo = item.to;
    const formattedTo = to(timeTo);
    htmlString += `
    <article><img src="${item.artist.image}" alt="${item.artist.name}">
   
    <h2>${item.artist.name}</h2>
    <p> ${item.stage} | ${formattedFrom} - ${formattedTo} </p></article>
    `;
  }

  artistsContainer.innerHTML = htmlString;
}

function updateClock() {
  const clock = document.getElementById("clock");
  const endTime = 1720087200000;
  const now = new Date().getTime();
  const countdown = endTime - now;

  const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

  clock.innerHTML = `<h1>${days}days ${hours}h ${minutes}m ${seconds}s</h1>`;
}

console.log(updateClock());

const intervalId = setInterval(updateClock, 1000);

function descriptionPopUp() {
  for (const item of lineup) {
    const descriptionArtist = document.getElementById(item.artist.image);
    descriptionArtist.addEventListener("click", function () {
      document.getElementById("description");
      htmlString += `<img src="${item.artist.image}" alt="${item.artist.name}">`;
      descriptionArtist.innerHTML = htmlString;
    });
  }
}

loadWebsite();
