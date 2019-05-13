function loadData(urlToFetch) {
  $.getJSON(urlToFetch, function(JSONData) {
    // $("#box-info").append(`<div id="sys-info"></div>`);
    for (let prop in JSONData) {
      $("#sys-info").append(`<p class="bolder">${prop}: </p>`);
      $("#sys-info").append(`<p class="prop">${JSONData[prop]} </p>`);
    }
  });
}

loadData(url);

setInterval(() => {
  $(".bolder").remove();
  $(".prop").remove();
  loadData(url);
}, 60000); //Refreshing every one minute
