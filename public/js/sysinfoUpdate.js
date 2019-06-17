function firstLoad(urlToFetch) {
  $.getJSON(urlToFetch, function(JSONData) {
    for (let prop in JSONData) {
      $(".content-box").append(`<div class="row" id="${prop}"></div>`);
    }
    for (let prop in JSONData) {
      $(`#${prop}`)
        .append(`<p id="${prop}-item" class="bolder">${prop}: </p>`)
        .append(`<p id="${prop}-value" class="prop">${JSONData[prop]} </p>`);
    }
  });
}

function launchUpdate(urlToFetch) {
  const timeToUpdate = document.getElementById("currentTime");

  setInterval(() => {
    $.getJSON(urlToFetch, function(JSONData) {
      console.log(JSONData);
      for (let prop in JSONData) {
        $(`#${prop}-value`).text(`${JSONData[prop]}`);
      }
    });
  }, 1000);
}

firstLoad(url);

launchUpdate(url);

console.dir(document);
console.table(["name", "lucas"]);

localStorage.setItem("name", "John");

document.cookie = "username=John Doe";
