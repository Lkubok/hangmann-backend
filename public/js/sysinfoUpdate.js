function loadData(urlToFetch) {
  $.getJSON(urlToFetch, function(JSONData) {
    for (let prop in JSONData) {
      $(".content-box").append(`<div class="row" id="${prop}"></div>`);
    }
    for (let prop in JSONData) {
      $(`#${prop}`)
        .append(`<p class="bolder">${prop}: </p>`)
        .append(`<p class="prop">${JSONData[prop]} </p>`);
    }
  });
}

loadData(url);

setInterval(() => {
  $(".bolder").remove();
  $(".prop").remove();
  $(".row").remove();
  loadData(url);
}, 60000); //Refreshing every one minute
