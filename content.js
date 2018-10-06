function makeButton(title, className, action) {
    var button = document.createElement("button");
    button.className = className;
    button.onclick = action;
    var text = document.createTextNode(title);
    button.appendChild(text);
    return button;
};

function addPopup() {
    document.body.style.visibility = "hidden";
    var popup = document.createElement("div");
    popup.className = "waiterPopup";
    popup.id = "waiterpopup";

    var content = document.createElement("div");
    content.className = "contentContainer";
    popup.appendChild(content);

    var messageContainer = document.createElement("div");
    messageContainer.className = "messageContainer";
    content.appendChild(messageContainer);

    var image = document.createElement("img");
    var imgURL = chrome.runtime.getURL("images/breathing-clipart-mindful-breathing.gif");
    image.src = imgURL;
    messageContainer.appendChild(image);

    var title = document.createElement("div");
    title.className = "titleText";
    title.innerHTML = "Wait!";
    messageContainer.appendChild(title);

    messageContainer.appendChild(document.createElement("br"));

    var subtitle = document.createElement("div");
    subtitle.className = "subtitleText";
    subtitle.innerHTML = "Are you sure you want to continue?";
    messageContainer.appendChild(subtitle);

    messageContainer.appendChild(document.createElement("br"));

    messageContainer.appendChild(makeButton("Nope", "closeTabButton",
        close_tab));
    messageContainer.appendChild(makeButton("Yes", "okTabButton", deletePopup));

    document.body.appendChild(popup);

    document.body.style.visibility = "visible";
}

function close_tab() {
    chrome.runtime.sendMessage({action: "close"});
};

function deletePopup() {
    var popup = document.getElementById("waiterpopup");
    document.body.removeChild(popup);
};

function start(callback) {
  chrome.storage.sync.get("blacklist", function(items) {
    callback(items.blacklist);
  });
}

function startIfURLMatch(blacklistUrls) {
  // Remove any occurances of http:// or https://.
  var currUrl = document.URL.replace(/^https?:\/\//, "");
  blacklistUrls.forEach((url) => {
    if (currUrl.startsWith(url)) {
      addPopup();
    };
  });
}

window.onload = () => {
  start(startIfURLMatch);
};
