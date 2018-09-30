var makeButton = function(title, className, action) {
    var button = document.createElement('button');
    button.className = className;
    button.onclick = action;
    var text = document.createTextNode(title);
    button.appendChild(text);
    return button;
};

var addPopup = function() {
    var popup = document.createElement('div');
    popup.className = "waiterPopup";
    popup.id = "waiterpopup";

    var content = document.createElement('div');
    content.className = 'contentContainer';
    popup.appendChild(content);

    var messageContainer = document.createElement('div');
    messageContainer.className = 'messageContainer';
    content.appendChild(messageContainer);

    var image = document.createElement('img');
    var imgURL = chrome.runtime.getURL("images/breathing-clipart-mindful-breathing.gif");
    image.src = imgURL;
    messageContainer.appendChild(image);

    var title = document.createElement('div');
    title.className = 'titleText';
    title.innerHTML = 'Wait!';
    messageContainer.appendChild(title);

    messageContainer.appendChild(document.createElement('br'));

    var subtitle = document.createElement('div');
    subtitle.className = 'subtitleText';
    subtitle.innerHTML = 'Are you sure you want to continue?';
    messageContainer.appendChild(subtitle);

    messageContainer.appendChild(document.createElement('br'));

    messageContainer.appendChild(makeButton("Nope", "closeTabButton",
        close_tab));
    messageContainer.appendChild(makeButton("Yes", "okTabButton", deletePopup));

    document.body.appendChild(popup);
    // The stylesheet hides the original page by default to avoid the page
    // showing up before the popup is generated.
    document.body.style.visibility = "visible";
}

var close_tab = function() {
    chrome.runtime.sendMessage({action: "close"});
};

var deletePopup = function() {
    var popup = document.getElementById("waiterpopup");
    document.body.removeChild(popup);
};

window.onload = addPopup;
