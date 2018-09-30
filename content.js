/*
TODO:
* Hide Facebook in the CSS, so you don't see it before the extension loads.
    Find its root and change its visibility.
* Add a background script to we can call to delete the tab. Use an event
    listener in the background and sendMessage in the content script.
* Let users change the list of pages to block.
* Improve the style.
*/
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

    var title = document.createElement('div');
    title.className = 'titleText';
    title.innerHTML = 'Wait! Are you sure you want to continue?';
    popup.appendChild(title);

    popup.appendChild(document.createElement('br'));

    popup.appendChild(makeButton("Nope", "closeTabButton",
        close_tab));
    popup.appendChild(makeButton("Yes", "okTabButton", deletePopup));
    document.body.appendChild(popup);
}

var close_tab = function() {
    chrome.runtime.sendMessage({action: "close"});
};

var deletePopup = function() {
    console.log("Delete popup.")
};

window.onload = addPopup;
