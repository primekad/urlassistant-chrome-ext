const baseURL = "https://url-assistant-bakend.herokuapp.com/api/";

//listen for messages from content.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.buttonAction === "saveUrl") {
    let _payload = {
      encodedURL: request.encodedURL,
    };
    console.log(JSON.stringify(_payload));
    fetch(baseURL + "saveurl", {
      method: "POST",
      body: JSON.stringify(_payload),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((json) => {
        sendResponse(json);
        console.log(json);
      })
      .catch((err) => console.log(err));
  }
  if (request.buttonAction === "getSaveCount") {
    fetch(baseURL + "pageurlcount/" + request.encodedURL, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        sendResponse(json);
        console.log(json);
      })
      .catch((err) => console.log(err));
  }
  return true;
});
