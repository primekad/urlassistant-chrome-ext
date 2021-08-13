let pageUrl = window.location.href.split("?")[0]; //ignore query parameters
let b64EncodedUrl = btoa(pageUrl); //convert to base64 to use as page id

function getSaveCount() {
  let count = 0;
  chrome.runtime.sendMessage(
    //send message to background.js to handle api calls
    { buttonAction: "getSaveCount", encodedURL: b64EncodedUrl },
    function (response) {
      console.log(response);
      count = response.saveCount;
      document.getElementById("btn-url-assist").innerHTML =
        "Save Current Page URL " +
        '<span class="url-assist-badge">' +
        response.saveCount +
        "</span>";
    }
  );
}

function setupButton() {
  let btnElement = document.createElement("button");
  btnElement.id = "btn-url-assist";
  btnElement.innerText = "Save Current Page URL";
  btnElement.addEventListener("click", () => {
    //send message to background.js to handle api calls
    chrome.runtime.sendMessage(
      { buttonAction: "saveUrl", encodedURL: b64EncodedUrl },
      function (response) {
        document.getElementById("btn-url-assist").innerHTML =
          "Save Current Page URL " +
          '<span class="url-assist-badge">' +
          response.saveCount +
          "</span>";
        console.log(response);
      }
    );
  });

  document.body.appendChild(btnElement);
}

//setup the button on the page
setupButton();

//update the save count on page load
getSaveCount();
