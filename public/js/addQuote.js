const form = document.querySelector("form");
const urlToSend = url;
function sendToEndPoint(event) {
  event.preventDefault();
  let quote = document.getElementById("quote").value;
  let quoteAuthor = document.getElementById("quoteAuthor").value;
  let insertAuthor = document.getElementById("insertAuthor").value;
  let lang = document.getElementById("lang").value;
  let object = {
    quoteAuthor: quoteAuthor,
    insertAuthor: insertAuthor,
    quote: quote,
    lang: lang
  };
  $.ajax({
    url: urlToSend,
    type: "POST",
    data: JSON.stringify(object),
    contentType: "application/json"
  });
  $("#quote").val("");
  $("#quoteAuthor").val("");
  $("#insertAuthor").val("");
  $("#lang").val("");
}

form.addEventListener("submit", sendToEndPoint);
